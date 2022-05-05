import React, { FC, useState, ChangeEvent, useMemo } from 'react';
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
    region: {
      eu: false,
      efta: false,
      caricom: false,
      pa: false,
      au: false,
      asean: false,
    },
  });

  const handleOnChangeShortAlphabet = (e: ChangeEvent<HTMLInputElement>) => {
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
      region: {
        eu: false,
        efta: false,
        caricom: false,
        pa: false,
        au: false,
        asean: false,
      },
    }));
  };

  const handleOnChangeFilterRegion = (e: ChangeEvent<HTMLInputElement>) => {
    const getRegion = e.target.value;
    setFormValue((prevState: any) => ({
      ...prevState,
      region: {
        ...prevState.region,
        [getRegion]: !prevState.region[getRegion],
      },
    }));
  };

  const handleShowButton = () => {
    onFilterChange(formValue);
    setShowFilterType(null);
  };

  const handleBackgroundLayerClicked = () => {
    setShowFilterType(null);
  };

  const shortAlphabet = useMemo(() => {
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
  }, [formValue.alphabetShort]);

  const filterRegionArea = useMemo(
    () => (
      <div className="bottom-sheet-filter-content">
        <div className="head-b-sheet">Filter By Regional Block Area</div>
        <div className="center-b-sheet">
          <div className="check-box-list">
            <label className="check-box-group">
              EU (European Union)
              <input
                type="checkbox"
                value="eu"
                checked={formValue.region.eu}
                onChange={handleOnChangeFilterRegion}
              />
              <span className="checkmark"></span>
            </label>
            <label className="check-box-group">
              EFTA (European Free Trade Association)
              <input
                type="checkbox"
                value="efta"
                checked={formValue.region.efta}
                onChange={handleOnChangeFilterRegion}
              />
              <span className="checkmark"></span>
            </label>
            <label className="check-box-group">
              CARICOM (Caribbean Community)
              <input
                type="checkbox"
                value="caricom"
                checked={formValue.region.caricom}
                onChange={handleOnChangeFilterRegion}
              />
              <span className="checkmark"></span>
            </label>
            <label className="check-box-group">
              PA (Pacific Alliance)
              <input
                type="checkbox"
                value="pa"
                checked={formValue.region.pa}
                onChange={handleOnChangeFilterRegion}
              />
              <span className="checkmark"></span>
            </label>
            <label className="check-box-group">
              AU (African Union)
              <input
                type="checkbox"
                value="au"
                checked={formValue.region.au}
                onChange={handleOnChangeFilterRegion}
              />
              <span className="checkmark"></span>
            </label>
            <label className="check-box-group">
              ASEAN (Association of Southeast Asian Nations)
              <input
                type="checkbox"
                value="asean"
                checked={formValue.region.asean}
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
            <ButtonComp
              classStyle="primary full bold uppercase"
              onClick={handleShowButton}
            >
              SHOW
            </ButtonComp>
          </div>
        </div>
      </div>
    ),
    [formValue.region],
  );

  const showFilter = useMemo(() => {
    switch (showFilterType) {
      case 'SHORT':
        return shortAlphabet;
      case 'FILTER':
        return filterRegionArea;
      default:
        return null;
    }
  }, [showFilterType, formValue]);

  return (
    <div className="bottom-sheet-filter">
      <div
        className={`bottom-sheet-layer-background ${
          showFilter !== null ? 'on' : ''
        }`}
        onClick={handleBackgroundLayerClicked}
      ></div>
      {showFilter}
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
export default React.memo(BottomSheetFilter);
