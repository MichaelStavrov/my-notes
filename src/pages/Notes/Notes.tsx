import React, { FC } from 'react';
import styles from './Notes.module.scss';

const Notes: FC = () => {
  return (
    <section className={styles.notes}>
      <div className={styles.header}>header</div>
      <div className={styles.sidebar}>sidebar</div>
      <div className={styles.workspace}>workspace</div>
    </section>
  );
};

export default Notes;
