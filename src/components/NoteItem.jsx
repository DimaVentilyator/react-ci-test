import React, { useState, memo } from 'react';

const NoteItem = memo(({ note, onEdit, onDelete }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div style={{ 
      border: '1px solid #444', padding: '20px', marginBottom: '15px', 
      borderRadius: '10px', backgroundColor: '#1e1e1e', boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{ marginTop: 0, color: '#64b5f6' }}>{note.theme}</h3>
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5', color: '#f0f0f0' }}>{note.text}</p>
      
      <div style={{ fontSize: '13px', color: '#999', marginBottom: '15px' }}>
        <div>Создано: {note.createdAt}</div>
        {note.updatedAt !== note.createdAt && <div>Изменено: {note.updatedAt}</div>}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => onEdit(note)} style={{ padding: '6px 12px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #555', background: '#333', color: '#e0e0e0' }}>
          ✏️ Редактировать
        </button>
        <button onClick={() => onDelete(note.id)} style={{ padding: '6px 12px', cursor: 'pointer', color: '#ff6b6b', borderRadius: '4px', border: '1px solid #663333', background: '#331a1a' }}>
          🗑️ Удалить
        </button>
        
        {note.history && note.history.length > 0 && (
          <button onClick={() => setShowHistory(!showHistory)} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#332b1a', border: '1px solid #665522', borderRadius: '4px', color: '#ffb74d' }}>
            {showHistory ? 'Скрыть историю' : '🕒 История версий'}
          </button>
        )}
      </div>

      {showHistory && note.history && (
        <div style={{ marginTop: '15px', padding: '15px', background: '#121212', borderLeft: '4px solid #ffb74d', borderRadius: '0 5px 5px 0' }}>
          <h4 style={{ marginTop: 0, color: '#ffb74d' }}>Прошлые версии:</h4>
          {note.history.map((oldVer, index) => (
            <div key={index} style={{ borderBottom: '1px dashed #444', paddingBottom: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Дата: {oldVer.updatedAt}</div>
              <strong style={{ display: 'block', marginBottom: '5px', color: '#e0e0e0' }}>{oldVer.theme}</strong>
              <div style={{ whiteSpace: 'pre-wrap', color: '#ccc' }}>{oldVer.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default NoteItem;