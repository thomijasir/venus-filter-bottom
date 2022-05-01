import React, { FC, useState } from 'react';

export interface IPersonProps {
  onHandleMessage: (e: any) => void;
}

export const PersonDefaultProps = {};

export const PersonNamespace = 'Person';

const Person: FC<IPersonProps> = ({ onHandleMessage }) => {
  const [name, setName] = useState({ name: 'thomi', age: 20 });
  const [formValue, setFormValue] = useState({
    alphabetShort: 'asc',
    continent: {
      asia: false,
      africa: false,
      europe: false,
      northAmerica: false,
      southAmerica: false,
      australia: false,
      antarctica: false,
    },
  });

  const handleOnChangeShortAlphabet = (e: any) => {
    setFormValue((prevState) => ({
      ...prevState,
      alphabetShort: e.target.value,
    }));
  };

  const handleSendMessage = () => {
    onHandleMessage(formValue);
  };

  const handleChangeName = (e: any) => {
    console.log('GET E: ', e.target.value);
    setName((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const renderRadio = () => (
    <div className="custom-radio-group">
      <div className="radio-item-group">
        <input
          type="radio"
          id="asc"
          value="asc"
          name="radio-group"
          checked={formValue.alphabetShort === 'asc'}
          onChange={handleOnChangeShortAlphabet}
        />
        <label htmlFor="asc">Ascending</label>
      </div>
      <div className="radio-item-group">
        <input
          type="radio"
          id="dsc"
          value="desc"
          name="radio-group"
          checked={formValue.alphabetShort === 'desc'}
          onChange={handleOnChangeShortAlphabet}
        />
        <label htmlFor="dsc">Descending</label>
      </div>
    </div>
  );

  return (
    <div className="wrapper-component">
      <p>Children</p>
      <input type="text" name="name" onChange={handleChangeName} />
      {renderRadio()}
      <button type="button" onClick={handleSendMessage}>
        Send Message To Parrent
      </button>
    </div>
  );
};

Person.displayName = PersonNamespace;
Person.defaultProps = PersonDefaultProps;

export default Person;
