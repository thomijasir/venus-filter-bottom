/* eslint-disable */
import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.comp';
import { AppContext } from '../../store/AppProvider';
import './PhoneFrame.scss';

export interface IProps {}

const PhoneFrame: FC<IProps> = () => {
  const [view, setView] = useState<string>('front');
  const navigate = useNavigate();
  useEffect(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  const checkScreen = () => {
    if (window.innerWidth <= 480) {
      navigate('/app');
    }
  };

  const handleView = (view: string) => () => {
    setView(view);
  };

  return (
    <div className="phone-frame-page">
      <div className={`phone-wrapper ${view}`}>
        <div className="phone">
          <iframe src="http://localhost:8888/app"></iframe>
        </div>
        <div className="phone-control">
          <div className="col">
            <Button
              classStyle="full outline uppercase bold"
              onClick={handleView('front')}
            >
              Front View
            </Button>
          </div>
          <div className="col">
            <Button
              classStyle="primary full uppercase bold"
              onClick={handleView('laydown')}
            >
              Laydown View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
