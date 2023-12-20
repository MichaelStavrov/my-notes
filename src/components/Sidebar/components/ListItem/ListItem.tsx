import React, { FC } from 'react';
import styles from './ListItem.module.scss';
import { Note } from '@/types';

interface ListItemProps {
  note: Note;
  isActive: boolean;
  onItemClick: (note: Note) => void;
}

const ListItem: FC<ListItemProps> = ({ note, onItemClick, isActive }) => {
  const { name, creationDate, content } = note;

  return (
    <li
      style={{ backgroundColor: isActive ? 'var(--light-gray)' : undefined }}
      className={styles.item}
      onClick={() => onItemClick(note)}
    >
      <span className={styles.title}>{name}</span>
      <div className={styles.description}>
        <span>{creationDate}</span>
        <span className={styles.content}>{content}</span>
      </div>
    </li>
  );
};

export default ListItem;
