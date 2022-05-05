import React, { FC } from 'react';
import './Modal.scss';

export type IModalProps = {
  children: React.ReactNode;
  show: boolean;
};

export const ModalDefaultProps = {};

export const ModalNamespace = 'Modal';

const Modal: FC<IModalProps> = ({ children, show }) => {
  if (!show) {
    return null;
  }
  return (
    <div key={`${show}`} className="modal-comp fadeInModal">
      <div className="layer-modal">
        <div className="modal-wrapper">{children}</div>
      </div>
    </div>
  );
};

Modal.displayName = ModalNamespace;
Modal.defaultProps = ModalDefaultProps;
export default React.memo(Modal);
