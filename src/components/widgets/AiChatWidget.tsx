import React, { useState, useRef, useEffect } from 'react';
import { HudLoadingRing } from '../hud/HudLoadingRing';
import {
  sendMessage,
  MessageHistory,
  AIServiceError,
  getStoredApiKey,
  getStoredModel,
  getStoredSystemPrompt,
  AI_MODELS,
  storeModel,
} from '../../services/aiService';
import styles from './AiChatWidget.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

const MODEL_NAMES: Record<string, string> = {
  [AI_MODELS.KIMI]: 'Kimi K2.5',
  [AI_MODELS.DEEPSEEK]: 'DeepSeek V3.2',
};

export const AiChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m NEXUS, your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(getStoredModel());
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageHistoryRef = useRef<MessageHistory>(
    new MessageHistory(getStoredSystemPrompt())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const apiKey = getStoredApiKey();
    if (!apiKey) {
      setError('Please set your API key in settings first.');
      return;
    }

    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsThinking(true);

    // Add to message history
    messageHistoryRef.current.addMessage('user', userInput);

    // Create a placeholder AI message for streaming
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      isStreaming: true,
    };
    
    setMessages((prev) => [...prev, aiMessage]);

    try {
      // Stream the AI response
      const stream = sendMessage(
        messageHistoryRef.current.getMessages(),
        selectedModel,
        apiKey
      );

      let fullResponse = '';

      for await (const chunk of stream) {
        fullResponse += chunk;
        
        // Update the streaming message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, text: fullResponse }
              : msg
          )
        );
      }

      // Mark streaming as complete
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, isStreaming: false }
            : msg
        )
      );

      // Add to message history
      messageHistoryRef.current.addMessage('assistant', fullResponse);

    } catch (err) {
      // Remove the placeholder message
      setMessages((prev) => prev.filter((msg) => msg.id !== aiMessageId));

      // Show user-friendly error
      let errorMessage = 'An error occurred. Please try again.';
      
      if (err instanceof AIServiceError) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      
      // Auto-clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear all messages?')) {
      setMessages([
        {
          id: Date.now().toString(),
          text: 'Chat cleared. How can I help you?',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
      messageHistoryRef.current.clear();
      setError(null);
    }
  };

  const handleModelChange = (newModel: string) => {
    setSelectedModel(newModel);
    storeModel(newModel);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.chatWidget}>
      {/* Header with controls */}
      <div className={styles.header}>
        <select
          className={styles.modelSelector}
          value={selectedModel}
          onChange={(e) => handleModelChange(e.target.value)}
          disabled={isThinking}
        >
          {Object.entries(MODEL_NAMES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        
        <button
          className={styles.clearButton}
          onClick={handleClearChat}
          disabled={isThinking}
          title="Clear chat"
        >
          Clear
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className={styles.errorBanner}>
          <span className={styles.errorIcon}>⚠</span>
          {error}
        </div>
      )}

      {/* Messages */}
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.sender === 'user' ? styles.userMessage : styles.aiMessage
            }`}
          >
            <div className={styles.messageContent}>
              <div className={styles.messageText}>
                {message.text}
                {message.isStreaming && (
                  <span className={styles.cursor}>▊</span>
                )}
              </div>
              <div className={styles.messageTime}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {/* Thinking indicator */}
        {isThinking && messages[messages.length - 1]?.text === '' && (
          <div className={styles.thinkingContainer}>
            <HudLoadingRing size={40} />
            <span className={styles.thinkingText}>NEXUS is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder={isThinking ? 'Waiting for response...' : 'Type your message...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isThinking}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={isThinking || !input.trim()}
        >
          {isThinking ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};
