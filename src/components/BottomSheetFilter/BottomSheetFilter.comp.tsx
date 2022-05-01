import React, {
  FC,
  useState,
  useMemo,
  ChangeEvent,
  useEffect,
  useCallback,
} from 'react';
import FILTER_ICON from '../../assets/icons/filter-select-icon.svg';
import SORTING_ICON from '../../assets/icons/sorting-icon.svg';
import ButtonComp from '../Button/Button.comp';
import './BottomSheetFilter.scss';

export interface IBottomSheetFilterProps {
  onFilterChange: (e: any) => void;
}

export const BottomSheetFilterDefaultProps = {};

export const BottomSheetFilterNamespace = 'BottomSheetFilter';

const BottomSheetFilter: FC<IBottomSheetFilterProps> = ({ onFilterChange }) => {
  const [showFilterType, setShowFilterType] = useState<string | null>(null);
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
  const handleOnResetShortAlphabet = () => {
    setFormValue((prevState) => ({
      ...prevState,
      alphabetShort: 'asc',
    }));
  };
  const handleOnResetFilterRegion = () => {
    setFormValue((prevState) => ({
      ...prevState,
      continent: {
        asia: false,
        africa: false,
        europe: false,
        northAmerica: false,
        southAmerica: false,
        australia: false,
        antarctica: false,
      },
    }));
  };
  const handleOnChangeFilterRegion = (e: ChangeEvent<HTMLInputElement>) => {
    const getContinent = e.target.value;
    setFormValue((prevState: any) => ({
      ...prevState,
      continent: {
        ...prevState.continent,
        [getContinent]: !prevState.continent[getContinent],
      },
    }));
  };

  const handleShowButton = () => {
    onFilterChange(formValue);
    // setShowFilterType(null);
  };

  const handleBackgroundLayerClicked = () => {
    setShowFilterType(null);
  };

  const shortAlphabet = () => {
    return (
      <div className="bottom-sheet-filter-content">
        <div className="head-b-sheet">Sort Alphabet</div>
        <div className="center-b-sheet">
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
        </div>
        <div className="bottom-b-sheet">
          <div className="column">
            <ButtonComp
              classStyle="outline full bold uppercase"
              onClick={handleOnResetShortAlphabet}
            >
              RESET
            </ButtonComp>
          </div>
          <div className="column">
            <ButtonComp
              classStyle="primary full bold uppercase"
              onClick={handleShowButton}
            >
              SHOW
            </ButtonComp>
          </div>
        </div>
      </div>
    );
  };

  const filterRegionArea = () => (
    <div className="bottom-sheet-filter-content">
      <div className="head-b-sheet">Filter By Continent</div>
      <div className="center-b-sheet">
        <div className="check-box-list">
          <label className="check-box-group">
            Asia
            <input
              type="checkbox"
              value="asia"
              checked={formValue.continent.asia}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
          <label className="check-box-group">
            Africa
            <input
              type="checkbox"
              value="africa"
              checked={formValue.continent.africa}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
          <label className="check-box-group">
            Europe
            <input
              type="checkbox"
              value="europe"
              checked={formValue.continent.europe}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
          <label className="check-box-group">
            North America
            <input
              type="checkbox"
              value="northAmerica"
              checked={formValue.continent.northAmerica}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
          <label className="check-box-group">
            South America
            <input
              type="checkbox"
              value="southAmerica"
              checked={formValue.continent.southAmerica}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
          <label className="check-box-group">
            Australia/Oceania
            <input
              type="checkbox"
              value="australia"
              checked={formValue.continent.australia}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
          <label className="check-box-group">
            Antarctica
            <input
              type="checkbox"
              value="antarctica"
              checked={formValue.continent.antarctica}
              onChange={handleOnChangeFilterRegion}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="bottom-b-sheet">
        <div className="column">
          <ButtonComp
            classStyle="outline full bold uppercase"
            onClick={handleOnResetFilterRegion}
          >
            RESET
          </ButtonComp>
        </div>
        <div className="column">
          <ButtonComp classStyle="primary full bold uppercase">SHOW</ButtonComp>
        </div>
      </div>
    </div>
  );

  const showFilter = () => {
    switch (showFilterType) {
      case 'SHORT':
        return shortAlphabet();
      case 'FILTER':
        return filterRegionArea();
      default:
        return null;
    }
  };

  return (
    <div className="bottom-sheet-filter">
      <div
        className={`bottom-sheet-layer-background ${
          showFilter() !== null ? 'on' : ''
        }`}
        onClick={handleBackgroundLayerClicked}
      ></div>
      {shortAlphabet()}
      <div className="button-filter">
        <div className="left-filter" onClick={() => setShowFilterType('SHORT')}>
          <div className="icon-left">
            <img src={SORTING_ICON} alt="SHORT ICON" />
          </div>
          <div className="text-left">SHORT</div>
        </div>
        <div
          className="right-filter"
          onClick={() => setShowFilterType('FILTER')}
        >
          <div className="icon-right">
            <img src={FILTER_ICON} alt="FILTER ICON" />
          </div>
          <div className="text-right">FILTER</div>
        </div>
      </div>
    </div>
  );
};

BottomSheetFilter.displayName = BottomSheetFilterNamespace;
BottomSheetFilter.defaultProps = BottomSheetFilterDefaultProps;
export default BottomSheetFilter;
