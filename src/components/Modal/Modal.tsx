import React, { CSSProperties, FC, ReactNode } from 'react';
import { Modal as AntModal } from 'antd';
import Portal from '../Portal';

interface ModalProps {
  openModal: boolean;
  title?: string | ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  footer?: ReactNode[];
  width?: CSSProperties['width'];
}

const Modal: FC<ModalProps> = ({
  title,
  onOk,
  onCancel,
  openModal,
  children,
  footer,
  width = 400,
}) => {
  return (
    <Portal>
      <AntModal open={openModal} {...{ title, onOk, onCancel, footer, width }}>
        {children}
      </AntModal>
    </Portal>
  );
};

export default Modal;
