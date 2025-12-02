import express from 'express';
import { getNotes,getNotesById,createNote, updateNote,deleteNote } from '../controllers/notesController.js';

const routes=express.Router();

routes.get('/',getNotes);
routes.get('/:id',getNotesById); 
routes.post('/',createNote);
routes.put('/:id', updateNote);
routes.delete('/:id', deleteNote);
export default routes;

 