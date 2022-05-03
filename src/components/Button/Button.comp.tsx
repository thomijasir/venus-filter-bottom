import React, { FC, ReactNode } from 'react';
import { stringMatch } from '../../utils/Helper';
import './Button.scss';

export interface IProps {
  children: ReactNode;
  classStyle: string;
  onClick?: () => void;
  id?: string;
}

const Button: FC<IProps> = (props) => {
  const { children, classStyle, onClick, id } = props;
  const mainAction = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  const isDisable = stringMatch(classStyle, 'inactive') !== null;

  return (
    <button
      id={id}
      type="button"
      onClick={mainAction}
      className={`button ${classStyle}`}
      disabled={isDisable}
    >
      {children}
    </button>
  );
};

export default Button;
