import React, { useState, useEffect } from 'react';
import { HudLoadingRing } from '../hud/HudLoadingRing';
import {
  getStoredApiKey,
  storeApiKey,
  getStoredModel,
  storeModel,
  getStoredSystemPrompt,
  storeSystemPrompt,
  testConnection,
  AI_MODELS,
  AIServiceError,
  DEFAULT_SYSTEM_PROMPT,
} from '../../services/aiService';
import styles from './AiSettings.module.css';

const MODEL_NAMES: Record<string, string> = {
  [AI_MODELS.KIMI]: 'Kimi K2.5',
  [AI_MODELS.DEEPSEEK]: 'DeepSeek V3.2',
};

export const AiSettings: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [model, setModel] = useState<string>(getStoredModel());
  const [systemPrompt, setSystemPrompt] = useState<string>(getStoredSystemPrompt());
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const storedKey = getStoredApiKey();
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  // Track changes
  useEffect(() => {
    const storedKey = getStoredApiKey() || '';
    const storedModel = getStoredModel();
    const storedPrompt = getStoredSystemPrompt();

    const changed =
      apiKey !== storedKey ||
      model !== storedModel ||
      systemPrompt !== storedPrompt;

    setHasChanges(changed);
  }, [apiKey, model, systemPrompt]);

  const handleSave = () => {
    storeApiKey(apiKey);
    storeModel(model);
    storeSystemPrompt(systemPrompt);
    setHasChanges(false);
    setTestResult({
      success: true,
      message: 'Settings saved successfully!',
    });

    // Clear success message after 3 seconds
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setTestResult({
        success: false,
        message: 'Please enter an API key first.',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      await testConnection(apiKey, model);
      setTestResult({
        success: true,
        message: 'Connection successful! ✓',
      });
    } catch (error) {
      let message = 'Connection failed. Please check your API key and try again.';
      
      if (error instanceof AIServiceError) {
        message = error.message;
      }

      setTestResult({
        success: false,
        message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleReset = () => {
    if (confirm('Reset to default settings?')) {
      setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
      setModel(AI_MODELS.KIMI);
      setHasChanges(true);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>AI Settings</h2>
        <div className={styles.subtitle}>
          Configure your NEXUS AI assistant
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          <span className={styles.labelText}>API Key</span>
          <span className={styles.labelHint}>
            (Get your key from{' '}
            <a
              href="https://build.nvidia.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              NVIDIA API Catalog
            </a>
            )
          </span>
        </label>
        <div className={styles.inputGroup}>
          <input
            type={showApiKey ? 'text' : 'password'}
            className={styles.input}
            placeholder="nvapi-xxxxxxxxxxxxxxxxxxxxx"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button
            className={styles.toggleButton}
            onClick={() => setShowApiKey(!showApiKey)}
            title={showApiKey ? 'Hide API key' : 'Show API key'}
          >
            {showApiKey ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          <span className={styles.labelText}>Default Model</span>
        </label>
        <select
          className={styles.select}
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {Object.entries(MODEL_NAMES).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>
          <span className={styles.labelText}>System Prompt</span>
          <span className={styles.labelHint}>
            (Defines AI personality and behavior)
          </span>
        </label>
        <textarea
          className={styles.textarea}
          placeholder="System prompt..."
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={4}
        />
        <button className={styles.resetButton} onClick={handleReset}>
          Reset to Default
        </button>
      </div>

      {/* Test Result */}
      {testResult && (
        <div
          className={`${styles.testResult} ${
            testResult.success ? styles.testSuccess : styles.testError
          }`}
        >
          {testResult.message}
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          className={styles.testButton}
          onClick={handleTest}
          disabled={isTesting || !apiKey.trim()}
        >
          {isTesting ? (
            <>
              <HudLoadingRing size={18} />
              <span>Testing...</span>
            </>
          ) : (
            'Test Connection'
          )}
        </button>

        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save Settings
        </button>
      </div>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>ℹ️ About NVIDIA API</div>
        <div className={styles.infoText}>
          The NVIDIA API Catalog provides access to state-of-the-art AI models.
          Create a free account at{' '}
          <a
            href="https://build.nvidia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            build.nvidia.com
          </a>{' '}
          to get your API key.
        </div>
      </div>
    </div>
  );
};
