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

  async deleteNote(id: number) {
    try {
      await db.notes.delete(id);
    } catch (error) {
      console.log('error ', error);
    }
  },
};

export default service;
