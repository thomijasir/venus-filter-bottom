import React, { FC } from 'react';
import CURIOUS_FINDING from '../../assets/images/not_found.png';
import ARROW_ICON from '../../assets/icons/arrow-icon.svg';
import './ListView.scss';

export interface ListViewData {
  id: string | number;
  icon?: string;
  text: string;
}

export interface IProps {
  list: ListViewData[];
  onTapItem: (id: ListViewData) => void;
}

const ListView: FC<IProps> = (props) => {
  const { list, onTapItem } = props;

  const handleTapItem = (id: ListViewData) => () => {
    onTapItem(id);
  };

  if (list.length <= 0) {
    return (
      <div className="list-view">
        <div className="list-empty">
          <img src={CURIOUS_FINDING} alt="empty" />
          <h2>Nothing..</h2>
          <p>Hemm, seemingly what you looking for is not available.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="list-view">
      {list.map((item: ListViewData) => (
        <div className="list-item" key={item.id} onClick={handleTapItem(item)}>
          <div className="icon">
            {item.icon && <img src={item.icon} alt="List View Icon" />}
          </div>
          <div className="text">{item.text}</div>
          <div className="navigation">
            <img src={ARROW_ICON} alt="Arrow Icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
