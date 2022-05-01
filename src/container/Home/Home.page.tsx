import React, { FC, useState, useEffect, useContext, useCallback } from 'react';
import lUniqueId from 'lodash/uniqueId';
import lGet from 'lodash/get';
import { ArrayStringSearch } from '../../utils/Helper';
import { AppContext } from '../../store/AppProvider';
import useClientRestCountry from '../../hooks/useClientRestCountry';
import ListView, {
  ListViewData as IListViewData,
} from '../../components/ListView/ListView.comp';
import SearchInput from '../../components/SearchInput/SearchInput.comp';
import BottomSheetFilter from '../../components/BottomSheetFilter/BottomSheetFilter.comp';
import './Home.scss';
import Person from './Person';

export interface IProps {}

const Home: FC<IProps> = () => {
  const context = useContext(AppContext);
  const clientCountry = useClientRestCountry();
  const [listData, setListData] = useState<IListViewData[]>([]);
  const [listDataFilter, setListDataFilter] =
    useState<IListViewData[]>(listData);

  // useEffect(() => {
  //   context.setLoading(true, 'fetching country..');
  //   clientCountry
  //     .getAllCountry()
  //     .then((result: any) => {
  //       const countryList = mapCountryToListView(result);
  //       setListData(countryList);
  //       setListDataFilter(countryList);
  //     })
  //     .catch(() => {
  //       context.setError(
  //         true,
  //         'Failure, fetch',
  //         'Something wrong with api connection',
  //       );
  //     })
  //     .finally(() => {
  //       context.setLoading(false, 'fetching country..');
  //     });
  // }, []);

  const mapCountryToListView = useCallback((data: any[]) => {
    const remapData = data.map(
      (item: any) =>
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
      setListDataFilter(ArrayStringSearch('text', e.target.value, listData));
    },
    [setListDataFilter, listData],
  );

  const handleOnClearSearch = useCallback(() => {
    setListDataFilter(listData);
  }, [listData]);

  const handleOnTapListItem = useCallback((item: IListViewData) => {
    console.log('ON TAP OBJECT: ', item);
  }, []);

  const handleFilterChange = (e: any) => {
    console.log('GET RETURN: ', e);
  };

  return (
    <div className="home-page safe-area">
      <div className="app-area">
        <div className="search-country">
          <SearchInput
            onClose={handleOnClearSearch}
            onChange={handleSearchChange}
            placeholder="Search your country here.."
          />
        </div>
        {!context.loadingState.isLoading && (
          <div className="list-view-country">
            <ListView list={listDataFilter} onTapItem={handleOnTapListItem} />
          </div>
        )}
        <BottomSheetFilter onFilterChange={handleFilterChange} />
        {/* <Person onHandleMessage={handleFilterChange} /> */}
      </div>
    </div>
  );
};

export default Home;
