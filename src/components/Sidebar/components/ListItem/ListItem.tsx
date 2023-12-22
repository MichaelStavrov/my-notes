import React, { FC, useEffect } from 'react';
import MarkedParse from '@/components/MarkedParse';
import styles from './ListItem.module.scss';
import { Note } from '@/types';

interface ListItemProps {
  note: Note;
  isActive: boolean;
  onItemClick: (note: Note) => void;
  onRemoveNote: (id: number) => void;
}

const ListItem: FC<ListItemProps> = ({
  note,
  onItemClick,
  isActive,
  onRemoveNote,
}) => {
  const { name, creationDate, content, id } = note;

  useEffect(() => {
    if (!isActive && !name && !content && id) {
      onRemoveNote(id);
    }
  }, [content, id, isActive, name, onRemoveNote]);

  return (
    <li
      style={{ backgroundColor: isActive ? 'var(--light-gray)' : undefined }}
      className={styles.item}
      onClick={() => onItemClick(note)}
    >
      <MarkedParse value={name} maxEllipsis={140} />
      <div className={styles.description}>
        <span>{creationDate}</span>
        <span className={styles.content}>
          <MarkedParse value={content} maxEllipsis={70} />
        </span>
      </div>
    </li>
  );
};

export default ListItem;
