import React, { FC, useState } from 'react';
import { Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import { useNotes } from '@/context/NotesProvider';
import Modal from '../Modal';
import styles from './Header.module.scss';

interface HeaderProps {
  onEdit: () => void;
  closeEdit: () => void;
}

const Header: FC<HeaderProps> = ({ onEdit, closeEdit }) => {
  const { addNote, removeNote, activeNote } = useNotes();
  const [openConfirmRemoveModal, setOpenConfirmRemoveModal] = useState(false);

  const handleAddNoteClick = () => {
    addNote({
      name: '',
      content: '',
    });
    onEdit();
  };

  const handleRemoveNoteClick = () => {
    if (activeNote?.id) {
      setOpenConfirmRemoveModal(true);
    }
  };

  const onOkRemoveNote = () => {
    if (activeNote?.id) {
      removeNote(activeNote.id);
      closeEdit();
    }
    setOpenConfirmRemoveModal(false);
  };

  return (
    <div className={styles.header}>
      <h1>Мои Заметки</h1>
      <div className={styles.toolbar}>
        <FileAddOutlined
          className={styles.icon}
          onClick={handleAddNoteClick}
          title='Создать'
        />
        <DeleteOutlined
          className={styles.icon}
          onClick={handleRemoveNoteClick}
          title='Удалить'
        />
        <EditOutlined
          className={styles.icon}
          onClick={onEdit}
          title='Редактировать'
        />
      </div>
      <Modal
        openModal={openConfirmRemoveModal}
        title={
          <span className={styles.modalTitle}>
            Вы хотите удалить выбранную заметку?
          </span>
        }
        footer={[
          <div className={styles.modalFooter} key='footer'>
            <Button danger onClick={onOkRemoveNote}>
              Удалить
            </Button>
            <Button
              type='primary'
              onClick={() => setOpenConfirmRemoveModal(false)}
            >
              Отменить
            </Button>
          </div>,
        ]}
      />
    </div>
  );
};

export default Header;
