/**
 * AI Service for NexusHUD
 * Handles communication with NVIDIA API endpoints for AI chat
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIConfig {
  apiKey: string;
  model: string;
  systemPrompt?: string;
}

export const AI_MODELS = {
  KIMI: 'moonshotai/kimi-k2.5',
  DEEPSEEK: 'deepseek-ai/deepseek-v3.2',
} as const;

export const DEFAULT_SYSTEM_PROMPT = 
  "You are NEXUS, an advanced AI assistant. You speak concisely and helpfully. You have a slightly futuristic personality.";

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MAX_HISTORY_LENGTH = 20;

export class AIServiceError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'AIServiceError';
  }
}

/**
 * Manages message history, keeping only the last N messages
 */
export class MessageHistory {
  private messages: ChatMessage[] = [];
  private systemPrompt: string;

  constructor(systemPrompt: string = DEFAULT_SYSTEM_PROMPT) {
    this.systemPrompt = systemPrompt;
  }

  addMessage(role: 'user' | 'assistant', content: string): void {
    this.messages.push({ role, content });
    this.trimHistory();
  }

  getMessages(): ChatMessage[] {
    return [
      { role: 'system', content: this.systemPrompt },
      ...this.messages,
    ];
  }

  clear(): void {
    this.messages = [];
  }

  setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt;
  }

  private trimHistory(): void {
    // Keep only the last MAX_HISTORY_LENGTH messages (excluding system prompt)
    if (this.messages.length > MAX_HISTORY_LENGTH) {
      this.messages = this.messages.slice(-MAX_HISTORY_LENGTH);
    }
  }
}

/**
 * Sends a message to the AI and streams the response
 * @param messages - Array of chat messages including system prompt
 * @param model - Model identifier (KIMI or DEEPSEEK)
 * @param apiKey - NVIDIA API key
 * @yields Streaming text chunks from the AI response
 */
export async function* sendMessage(
  messages: ChatMessage[],
  model: string,
  apiKey: string
): AsyncGenerator<string, void, unknown> {
  // Validate inputs
  if (!apiKey || apiKey.trim() === '') {
    throw new AIServiceError('API key is required. Please set it in settings.', 'NO_API_KEY');
  }

  if (!messages || messages.length === 0) {
    throw new AIServiceError('No messages to send.', 'NO_MESSAGES');
  }

  try {
    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      // Handle HTTP errors
      let errorMessage = `Request failed with status ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorData.message || errorMessage;
      } catch {
        // If we can't parse error JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      // Provide user-friendly error messages
      if (response.status === 401) {
        throw new AIServiceError('Invalid API key. Please check your settings.', 'INVALID_API_KEY');
      } else if (response.status === 429) {
        throw new AIServiceError('Rate limit exceeded. Please try again in a moment.', 'RATE_LIMIT');
      } else if (response.status >= 500) {
        throw new AIServiceError('AI service is temporarily unavailable. Please try again later.', 'SERVICE_ERROR');
      } else {
        throw new AIServiceError(errorMessage, 'API_ERROR');
      }
    }

    if (!response.body) {
      throw new AIServiceError('No response body received.', 'NO_RESPONSE');
    }

    // Read the SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE events
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          // SSE events start with "data: "
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            
            // OpenAI-style streams end with [DONE]
            if (data === '[DONE]') {
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              
              if (content) {
                yield content;
              }
            } catch (parseError) {
              // Skip malformed JSON chunks
              console.warn('Failed to parse SSE chunk:', parseError);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

  } catch (error) {
    // Handle network and other errors
    if (error instanceof AIServiceError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new AIServiceError(
        'Network error. Please check your internet connection.',
        'NETWORK_ERROR'
      );
    }

    throw new AIServiceError(
      'An unexpected error occurred. Please try again.',
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Tests the API connection with a simple request
 */
export async function testConnection(apiKey: string, model: string): Promise<boolean> {
  try {
    const testMessages: ChatMessage[] = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hi' },
    ];

    // Try to get at least one token from the stream
    const stream = sendMessage(testMessages, model, apiKey);
    const firstChunk = await stream.next();
    
    return !firstChunk.done;
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }
    throw new AIServiceError('Connection test failed.', 'TEST_FAILED');
  }
}

/**
 * Get API key from localStorage
 */
export function getStoredApiKey(): string | null {
  return localStorage.getItem('nexus_ai_api_key');
}

/**
 * Store API key in localStorage
 */
export function storeApiKey(apiKey: string): void {
  localStorage.setItem('nexus_ai_api_key', apiKey);
}

/**
 * Get default model from localStorage
 */
export function getStoredModel(): string {
  return localStorage.getItem('nexus_ai_model') || AI_MODELS.KIMI;
}

/**
 * Store default model in localStorage
 */
export function storeModel(model: string): void {
  localStorage.setItem('nexus_ai_model', model);
}

/**
 * Get system prompt from localStorage
 */
export function getStoredSystemPrompt(): string {
  return localStorage.getItem('nexus_ai_system_prompt') || DEFAULT_SYSTEM_PROMPT;
}

/**
 * Store system prompt in localStorage
 */
export function storeSystemPrompt(prompt: string): void {
  localStorage.setItem('nexus_ai_system_prompt', prompt);
}
