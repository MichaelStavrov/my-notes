import Dexie, { Table } from 'dexie';
import { Note, User } from '@/types';

export class MyNotesDB extends Dexie {
  notes!: Table<Note>;
  users!: Table<User>;

  constructor() {
    super('MyNotesDB');
    this.version(4).stores({
      notes: '++id, name, content, ownerId, creationDate',
      users: '++id, login, password',
    });
  }
}

export const db = new MyNotesDB();
