import { Note } from '@/interface/Notes';
import React from 'react';

type Props = {
  notes: Note[];
  updateNote: (note: Note) => Promise<void>; 
  deleteNote: (id: string) => Promise<void>;
};

const NotesList = ({ notes, updateNote, deleteNote }: Props) => {
  
  


  return (
    <div className='bg-primary px-4 py-2 md:px-8 md:py-5 w-full'>
      {notes.length === 0 ? (
        <p>No hay notas disponibles</p>
      ) : (
        <table className='justify-center items-center m-4 w-full'>
          <thead className='text-center items-center'>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Detalles</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className='text-center items-center font-sans'>
            {notes.map((note, index) => (
              <tr key={note.id}>
                <td className='text-textprimary'>{index + 1}</td>
                <td className='p-3'>{note.title}</td>
                <td className='p-3'>{note.content}</td>
                <td className='p-3'>{new Date(note.createdAt).toLocaleDateString()}</td>
                <td className='flex gap-4 justify-center text-center'>
                  <button 
                  className='bg-slate-600 text-white rounded-xl px-4 py-2  hover:bg-slate-500'
                  onClick={() => deleteNote(note.id)}>Eliminar</button>
                  <button 
                  className='bg-slate-600 text-white rounded-xl px-4 py-2  hover:bg-slate-500'
                  onClick={() => updateNote(note)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NotesList;
