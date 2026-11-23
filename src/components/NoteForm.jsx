import React, { useState, useEffect } from 'react';
import { sanitizeText } from '../utils/sanitize';

export default function NoteForm({ onSave, editingNote, onCancel }) {
  const [theme, setTheme] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTheme(editingNote.theme);
      setText(editingNote.text);
    } else {
      setTheme('');
      setText('');
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!theme.trim() || !text.trim()) return;

    const safeTheme = sanitizeText(theme);
    const safeText = sanitizeText(text);

    onSave({ theme: safeTheme, text: safeText });
    
    if (!editingNote) {
      setTheme('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#1e1e1e', padding: '20px', borderRadius: '10px', border: '1px solid #333', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
      <h3 style={{ marginTop: 0, textAlign: 'center', color: '#e0e0e0' }}>
        {editingNote ? 'Редактировать заметку' : 'Новая заметка'}
      </h3>
      
      <input
        type="text" placeholder="Тема заметки" value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '15px', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: '#fff', fontSize: '16px' }}
      />
      
      <textarea
        placeholder="Текст заметки..." value={text}
        onChange={(e) => setText(e.target.value)} rows="4"
        style={{ display: 'block', width: '100%', marginBottom: '15px', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2c2c2c', color: '#fff', fontSize: '16px', resize: 'vertical' }}
      />
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={{ padding: '12px 20px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', flex: 1, fontSize: '16px', fontWeight: 'bold' }}>
          {editingNote ? 'Сохранить изменения' : 'Добавить'}
        </button>
        {editingNote && (
          <button type="button" onClick={onCancel} style={{ padding: '12px 20px', background: '#d9534f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}