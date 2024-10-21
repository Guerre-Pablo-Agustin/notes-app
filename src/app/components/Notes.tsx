"use client";
import { useNoteStore } from "@/store/NoteStore";
import NotesList from "./NotesList";
import { useEffect, useState } from "react";
import { newNote, Note } from "@/interface/Notes";
import Swal from "sweetalert2";

const Notes = () => {
  const { notes, getNotes, updateNote, deleteNote, addNote, isLoading } =
    useNoteStore();

  const [dataNote, setdataNote] = useState<newNote>({
    title: "",
    content: "",
  });

  const [editingNote, setEditingNote] = useState<Note | null>(null); // Estado para la nota que se está editando

  // useEffect para cargar las notas
  useEffect(() => {
    const loadNotes = async () => {
      try {
        await getNotes();
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    };

    loadNotes();
  }, [getNotes]);

  const handlerAddNote = async () => {
    if (dataNote.title && dataNote.content) {
      try {
        await addNote(dataNote);
        Swal.fire({
          icon: "success",
          title: "Nota agregada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setdataNote({ title: "", content: "" });
      } catch (error) {
        console.error("Error al agregar nota", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      Swal.fire({
        icon: "success",
        title: "Nota eliminada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error eliminando la nota", error);
    }
  };

  const handlerEdit = async (noteToEdit: Note): Promise<void> => {
    if (noteToEdit.title && noteToEdit.content) {
      try {
        console.log("noteToEdit", noteToEdit);
        await updateNote(noteToEdit);
        Swal.fire({
          icon: "success",
          title: "Nota actualizada correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
        setEditingNote(null); 
        setdataNote({ title: "", content: "" }); 
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar la nota", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la nota",
          text: "Por favor, intenta nuevamente.",
        });
      }
    }
  };
  
  const handleEditClick = (note: Note): Promise<void> => {
    setEditingNote(note);
    setdataNote({ title: note.title, content: note.content }); // Cargar los datos de la nota en el formulario
    return Promise.resolve(); // Devuelve una Promise<void> si no haces ninguna operación asíncrona
  };

  const handleSubmit = () => {
    if (editingNote) {
      handlerEdit({ ...editingNote, ...dataNote }); // Si estamos editando, llama a handlerEdit
    } else {
      handlerAddNote(); // Si no, llama a handlerAddNote
    }
  };

  return (
    <section className="flex flex-col gap-4 px-8">
      <div>
        <h1>Notes</h1>
      </div>
      <div className="px-8 py-5 rounded-xl bg-primary">
        <div className="flex flex-row gap-4">
          <label htmlFor="">Titulo : </label>
          <input
            type="text"
            name="title"
            id="title"
            value={dataNote.title}
            className="text-black"
            onChange={(e) =>
              setdataNote({ ...dataNote, title: e.target.value })
            }
          />
        </div>
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="">Contenido : </label>
          <textarea
            name="contenido"
            id="contenido"
            value={dataNote.content}
            className="text-black"
            onChange={(e) =>
              setdataNote({ ...dataNote, content: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleSubmit} // Cambiar a handleSubmit
          className="bg-slate-600 text-white rounded-xl px-4 py-2 mt-4 hover:bg-slate-500"
        >
          {editingNote ? "Actualizar" : "Guardar"} {/* Cambiar el texto del botón */}
        </button>
      </div>

      <div className="px-8 py-5 rounded-xl bg-primary">
        {isLoading ? (
          <p>Cargando ... </p>
        ) : (
          <NotesList
            notes={notes}
            updateNote={handleEditClick} 
            deleteNote={handleDelete}
          />
        )}
      </div>
    </section>
  );
};

export default Notes;
