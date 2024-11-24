import React, { useEffect, useState } from 'react';
import useNotesStore from '../store/useNotesStore';
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill';

const NotesPage: React.FC = () => {
    const { notes, addNote, updateNote, connectSocket } = useNotesStore();
    const { token } = useAuth();
    const [tokenData, setTokenData] = useState('');
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        console.log('asdasdasd');
        if (token) {
            setTokenData(token);
            connectSocket(token);
        }
    }, [token, connectSocket]);

    const handleAddNote = () => {
        if (newNote.trim()) {
            const decoded:any = jwtDecode(tokenData);
            addNote(newNote, decoded?.username || 'Unknown');
            setNewNote('');
        }
    };

    const handleUpdateNote = (id: string, content: string) => {
        updateNote(id, content);
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <ul>
                    {notes.map((note) => (
                    <li key={note.id} style={{ marginBottom: '20px' }}>
                        <ReactQuill
                            theme="snow"
                            value={note.content}
                            onChange={(val) => {handleUpdateNote(note.id, val)}}
                        />
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <ReactQuill
                    theme="snow"
                    value={newNote}
                    onChange={setNewNote}
                />
                <Button onClick={handleAddNote} variant="contained">
                    Add Note
                </Button>
            </div>
        </div>
    );
};

export default NotesPage;