import React, { useEffect, useState } from 'react';
import useNotesStore from '../store/useNotesStore';
import { Button, Grid, Grid2 } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import ReactQuill from 'react-quill';
import { useSnackbar } from '../contexts/SnackbarContext';

const NotesPage: React.FC = () => {
    const { disconnected, notes, addNote, updateNote, connectSocket } = useNotesStore();
    const { token, logout } = useAuth();
    const { openSnackbar } = useSnackbar();
    const [tokenData, setTokenData] = useState('');
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        if (disconnected) {
            openSnackbar('Disconnected', 'error')
            logout();
        }
    }, [disconnected]);    

    useEffect(() => {
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
            <h2 className='mb-2'>Notes</h2>
            <div>
                <Grid2 container spacing={2} sx={{ padding: 2 }} className=''>
                    {notes.map((note) => (
                        <Grid2 size={{ sm: 12}}key={note.id} className='p-4 max-w-sm mx-auto bg-stone-200'>
                            <div className='size-full'>
                                <p className='mb-2'>Author: {note.author}</p>
                                <ReactQuill
                                    theme="snow"
                                    value={note.content}
                                    onChange={(val) => {handleUpdateNote(note.id, val)}}
                                />
                            </div>
                        </Grid2>
                    ))}
                </Grid2>
            </div>
            <hr className='size-full h-4'/>
            <div>
                <ReactQuill
                    className='mb-2'
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