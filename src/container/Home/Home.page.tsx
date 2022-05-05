import React, { FC, useState, useEffect, useContext, useCallback } from 'react';
import lUniqueId from 'lodash/uniqueId';
import lGet from 'lodash/get';
import lOrderBy from 'lodash/orderBy';
import lIsEqual from 'lodash/isEqual';
import { ArrayStringSearch } from '../../utils/Helper';
import { AppContext } from '../../store/AppProvider';
import useClientRestCountry from '../../hooks/useClientRestCountry';
import ListView, {
  ListViewData as IListViewData,
} from '../../components/ListView/ListView.comp';
import SearchInput from '../../components/SearchInput/SearchInput.comp';
import BottomSheetFilter, {
  IFormBottomSheet,
} from '../../components/BottomSheetFilter/BottomSheetFilter.comp';
import Button from '../../components/Button/Button.comp';
import useStateCallback from '../../hooks/useStateCallback';
import ModalComp from '../../components/Modal/Modal.comp';
import { ICountry } from '../../interfaces/General';
import './Home.scss';

export interface IProps {}

const Home: FC<IProps> = () => {
  const context = useContext(AppContext);
  const clientCountry = useClientRestCountry();
  const [listData, setListData] = useState<ICountry[]>([]);
  const [listDataFilter, setListDataFilter] = useState<IListViewData[]>([]);
  const [filterApply, setFilterApply] = useStateCallback([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    context.setLoading(true, 'fetching country..');
    clientCountry
      .getAllCountry()
      .then((result: ICountry[]) => {
        setListData(result);
        const countryList = mapCountryToListView(result);
        setListDataFilter(countryList);
      })
      .catch(() => {
        context.setError(
          true,
          'Failure, fetch',
          'Something wrong with api connection',
        );
      })
      .finally(() => {
        context.setLoading(false, 'fetching country..');
      });
  }, []);

  const mapCountryToListView = useCallback((data: ICountry[]) => {
    const remapData = data.map(
      (item: ICountry) =>
        ({
          id: lGet(item, 'alpha2Code', lUniqueId()),
          icon: item.flags.svg,
          text: lGet(item, 'name', '-'),
        } as IListViewData),
    );
    return remapData;
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setListDataFilter(
        ArrayStringSearch(
          'text',
          e.target.value,
          mapCountryToListView(listData),
        ),
      );
    },
    [setListDataFilter, listData],
  );

  const handleOnClearSearch = useCallback(() => {
    setListDataFilter(mapCountryToListView(listData));
  }, [listData]);

  const handleOrderBy = (filter: IFormBottomSheet) => {
    setListDataFilter(lOrderBy(listDataFilter, 'text', filter.alphabetShort));
  };

  const handleOnTapListItem = useCallback(
    (item: IListViewData) => {
      const countryDetail = listData.find(
        (data: ICountry) => item.id === data.alpha2Code,
      );
      setSelectedCountry(countryDetail);
      setShowModal(true);
    },
    [listData, selectedCountry],
  );

  const handleListCountryByRegion =
    (regions: string[], filterData: 'asc' | 'desc') => () => {
      const promiseList: Promise<ICountry>[] = [];
      if (regions.length) {
        // Make Promise List
        regions.forEach((data: string) => {
          promiseList.push(clientCountry.getCountryByRegional(data));
        });
      } else {
        promiseList.push(clientCountry.getAllCountry());
      }
      Promise.all(promiseList)
        .then((res: ICountry[]) => {
          const result = res.flat();
          setListData(result);
          setListDataFilter(
            lOrderBy(mapCountryToListView(result), 'text', filterData),
          );
        })
        .catch(() => {
          context.setError(
            true,
            'Filtering country',
            'Something wrong when filter country by region',
          );
        });
    };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, [showModal, setShowModal]);

  const handleFilterChange = useCallback(
    (e: IFormBottomSheet) => {
      const getFilter = Object.entries(e.region)
        .filter((data: any) => data[1])
        .map((data: any) => {
          return data[0];
        });
      // IF ITS EQUAL DONT CALL API FILTER
      if (lIsEqual(getFilter, filterApply)) {
        handleOrderBy(e);
      } else {
        setFilterApply(
          getFilter,
          handleListCountryByRegion(getFilter, e.alphabetShort),
        );
      }
    },
    [filterApply, listDataFilter, setFilterApply],
  );

  const renderModal = React.useMemo(
    () => (
      <ModalComp show={showModal}>
        <div className="modal-content">
          <div className="country-info">
            <div className="country-flag">
              <img
                src={selectedCountry?.flags.svg}
                alt={selectedCountry?.name}
              />
            </div>
            The name of this country is <b>{selectedCountry?.name}</b> the
            capital city is <b>{selectedCountry?.capital || 'Unknown'}</b>, this
            country have international code that is{' '}
            <b>{selectedCountry?.alpha2Code}</b>.
          </div>
          <Button
            classStyle="primary full uppercase bold"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </div>
      </ModalComp>
    ),
    [selectedCountry, showModal],
  );

  if (context.loadingState.isLoading) {
    return null;
  }
  return (
    <div className="home-page safe-area">
      <div className="app-area">
        <div className="indicator-device">
          <div className="top"></div>
          <div className="middle">Country App</div>
        </div>
        <div className="search-country">
          <SearchInput
            onClose={handleOnClearSearch}
            onChange={handleSearchChange}
            placeholder="Search your country here.."
          />
        </div>
        <div className="list-view-country">
          <ListView
            list={listDataFilter}
            onTapItem={handleOnTapListItem}
            loading={clientCountry.loading}
          />
        </div>
      </div>
      <BottomSheetFilter onFilterChange={handleFilterChange} />
      {renderModal}
    </div>
  );
};

export default Home;
