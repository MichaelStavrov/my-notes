import { db } from '../db';
import { Note } from '@/types';

const service = {
  async createNote(props: Note) {
    try {
      const id = await db.notes.add(props);

      return id;
    } catch (error) {
      console.log('error ', error);
    }
  },

  async fetchNotes(ownerId: number) {
    try {
      const notes = await db.notes.where({ ownerId }).toArray();

      return notes;
    } catch (error) {
      console.log('error ', error);
    }
  },

  async fetchOneNote(ownerId: number, noteId: number) {
    try {
      const note = await db.notes.where({ ownerId, id: noteId }).toArray();

      return note ? note[0] : null;
    } catch (error) {
      console.log('error ', error);
    }
  },

  async deleteNote(id: number) {
    try {
      await db.notes.delete(id);
    } catch (error) {
      console.log('error ', error);
    }
  },

  async deleteAllNotes(userId: number) {
    try {
      await db.notes.where({ ownerId: userId }).delete();
    } catch (error) {
      console.log('error ', error);
    }
  },

  async patchNote(id: number, newNote: Note) {
    try {
      await db.notes.update(id, newNote);
    } catch (error) {
      console.log('error ', error);
    }
  },
};

export default service;
