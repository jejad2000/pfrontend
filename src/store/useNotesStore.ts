import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Note {
  id: string;
  content: string;
  user: string;
};

interface NotesState {
  notes: Note[];
  socket: Socket | null;
  addNote: (content: string, user: string) => void;
  updateNote: (id: string, content: string) => void;
  setNotes: (notes: Note[]) => void;
  connectSocket: (token: string) => void;
};

const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  socket: null,
  addNote: (content, user) => {
    const socket = useNotesStore.getState().socket;
    if (socket) {
      socket.emit('create_note', content);
    }
  },
  updateNote: (id, content) => {
    const socket = useNotesStore.getState().socket;
    if (socket) {
      socket.emit('update_note', { id, content });
    }
  },
  setNotes: (notes) => set({ notes }),
  connectSocket: (token) => {
    const socket = io('http://localhost:3005', {
      auth: { token }, 
    });

    // Listen to events
    socket.on('notes', (notes: Note[]) => {
      set({ notes });
    });

    socket.on('note_created', (note: Note) => {
      set((state) => ({ notes: [...state.notes, note] }));
    });

    socket.on('note_updated', (updatedNote: Note) => {
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        ),
      }));
    });

    socket.on('error', (error: { message: string }) => {
      console.error('Socket error:', error.message);
      alert(`Error: ${error.message}`);
    });

    set({ socket });
  },
}));

export default useNotesStore;