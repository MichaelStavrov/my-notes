export interface Note {
  id?: number;
  name: string;
  content: string;
  ownerId: number;
}

export interface User {
  id?: number;
  login: string;
  password: string;
}
