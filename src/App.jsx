import React, { useState, useMemo, useCallback } from 'react';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  
  const [notes, setNotes] = useLocalStorage('my-notes', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  const handleSave = useCallback((data) => {
    const now = new Date().toLocaleString();

    if (editingNote) {
      const oldVersion = {
        theme: editingNote.theme,
        text: editingNote.text,
        updatedAt: editingNote.updatedAt
      };

      setNotes(prevNotes => prevNotes.map(note => {
        if (note.id === editingNote.id) {
          return {
            ...note,
            theme: data.theme,
            text: data.text,
            updatedAt: now,
            history: [...(note.history || []), oldVersion]
          };
        }
        return note;
      }));
      
      setEditingNote(null);
    } else {
      const newNote = {
        id: Date.now().toString(),
        theme: data.theme,
        text: data.text,
        createdAt: now,
        updatedAt: now,
        history: []
      };
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }
  }, [editingNote, setNotes]);

  const handleDelete = useCallback((id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    setEditingNote(prev => (prev && prev.id === id ? null : prev));
  }, [setNotes]);

  const handleCancel = useCallback(() => {
    setEditingNote(null);
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => 
      note.theme.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  return (
    <div style={{ minHeight: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#e0e0e0' }}>Анонимные заметки</h1>

        <NoteForm 
          onSave={handleSave} 
          editingNote={editingNote} 
          onCancel={handleCancel} 
        />

        <hr style={{ margin: '30px 0', border: '1px solid #333' }} />

        <input
          type="text" placeholder="Поиск по заметкам..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', boxSizing: 'border-box', borderRadius: '8px', border: '1px solid #444', fontSize: '16px', outline: 'none', backgroundColor: '#2c2c2c', color: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
        />

        <div>
          {filteredNotes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', fontSize: '18px', marginTop: '30px' }}>
              Заметки не найдены
            </p>
          ) : (
            filteredNotes.map(note => (
              <NoteItem 
                key={note.id} 
                note={note} 
                onEdit={setEditingNote} 
                onDelete={handleDelete} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
