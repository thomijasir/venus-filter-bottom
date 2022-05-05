import React, { FC, useState, useRef } from 'react';
import SEARCH_ICON from '../../assets/icons/search-icon.svg';
import CLOSE_ICON from '../../assets/icons/close-icon.svg';
import './SearchInput.scss';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClose: () => void;
  onChange(arg: React.ChangeEvent<HTMLInputElement>): void;
}

const SearchInput: FC<IProps> = (props) => {
  const [value, setValue] = useState<String>('');
  const inputElement = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange(e);
  };
  const handleClear = (): void => {
    setValue('');
    props.onClose();
  };

  return (
    <div className="search-input">
      <div className="icon">
        <img src={SEARCH_ICON} alt="Search Icon" />
      </div>
      <input
        {...props}
        ref={inputElement}
        type="text"
        onChange={handleChange}
        value={`${value}`}
      ></input>
      <div className={`close ${value ? 'active' : ''}`} onClick={handleClear}>
        <img src={CLOSE_ICON} alt="Seach Icon" />
      </div>
    </div>
  );
};

export default SearchInput;
