import { create } from "zustand";
import axios from "axios";
import { Note } from "../interface/Notes";


interface NoteStore {
    notes: Note[];
    getNotes: () => Promise<void>;
    getNoteById: (id: string) => Promise<void>;
    addNote: (note: Note) => Promise<void>;
    updateNote: (note: Note) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
    isLoading: boolean;
}

export const useNoteStore = create<NoteStore>((set) => ({
    notes: [],
    isLoading: false,
    getNotes: async () => {
        set({ isLoading: true }); // Indica que se está cargando
        try {
          const { data } = await axios.get("http://localhost:3000/api/notes");
          set({ notes: data.notes, isLoading: false }); // Establece las notas
        } catch (error) {
          console.error("Error al obtener notas:", error);
          set({ isLoading: false }); // Asegúrate de restablecer el estado de carga
        }
      },
    getNoteById: async (id: string) => {
        const { data } = await axios.get(`http://localhost:3000/api/notes/${id}`);
        set({ notes: [data] });
      },
    addNote: async (note: Note) => {
        const { data } = await axios.post("http://localhost:3000/api/notes", note);
        set((state) => ({ notes: [...state.notes, data.note] })); 
    },
    updateNote: async (note: Note) => {
        const { data } = await axios.put(`http://localhost:3000/api/notes/${note.id}`, note);
        console.log("Data", data);
        set({ notes: data.notes });
    },
    deleteNote: async (id: string) => {
        const { data } = await axios.delete(`http://localhost:3000/api/notes/${id}`);
        set({ notes: data.notes });
    },
}))


