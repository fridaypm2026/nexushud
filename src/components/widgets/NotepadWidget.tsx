import React, { useState, useEffect } from 'react';
import styles from './NotepadWidget.module.css';

const STORAGE_KEY = 'nexushud-notepad-content';

export const NotepadWidget: React.FC = () => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Load content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setContent(saved);
    }
  }, []);

  // Update counts and save to localStorage
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const chars = content.length;
    
    setWordCount(words);
    setCharCount(chars);
    
    localStorage.setItem(STORAGE_KEY, content);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleClear = () => {
    if (confirm('Clear all notes? This cannot be undone.')) {
      setContent('');
    }
  };

  return (
    <div className={styles.notepadWidget}>
      <div className={styles.toolbar}>
        <div className={styles.stats}>
          <span className={styles.stat}>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.stat}>
            {charCount} {charCount === 1 ? 'char' : 'chars'}
          </span>
        </div>
        <button className={styles.clearButton} onClick={handleClear}>
          Clear
        </button>
      </div>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={handleChange}
        placeholder="Start typing your notes..."
        spellCheck={false}
      />
    </div>
  );
};
