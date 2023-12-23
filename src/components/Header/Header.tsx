import { FC, useState } from 'react';
import { Button } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNotes } from '@/context/NotesProvider';
import Modal from '../Modal';
import styles from './Header.module.scss';
import SearchField from '../SearchField';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { RoutesMap } from '@/routes/routesMap';

interface HeaderProps {
  isOpenEditor: boolean;
  onEdit: () => void;
  closeEdit: () => void;
}

const Header: FC<HeaderProps> = ({ onEdit, closeEdit, isOpenEditor }) => {
  const { signOut } = useAuth();
  const {
    addNote,
    removeNote,
    activeNote,
    filterNotes,
    setActiveNote,
    resetNotes,
  } = useNotes();
  const navigate = useNavigate();
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

  const handleSearchInputChange = (value: string) => {
    filterNotes(value);
    if (isOpenEditor) closeEdit();
  };

  const onLogout = () => {
    signOut(() => {
      resetNotes();
      setActiveNote(null);
      navigate(RoutesMap.auth);
    });
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
      <div className={styles.block}>
        <div className={styles.searchField}>
          <SearchField onChange={handleSearchInputChange} />
        </div>
        <LogoutOutlined
          className={styles.icon}
          onClick={onLogout}
          title='Выйти из профиля'
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
