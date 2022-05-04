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
import BottomSheetFilter from '../../components/BottomSheetFilter/BottomSheetFilter.comp';
import useStateCallback from '../../hooks/useStateCallback';
import './Home.scss';

export interface IProps {}

const Home: FC<IProps> = () => {
  const context = useContext(AppContext);
  const clientCountry = useClientRestCountry();
  const [listData, setListData] = useState<IListViewData[]>([]);
  const [listDataFilter, setListDataFilter] =
    useState<IListViewData[]>(listData);
  const [filterApply, setFilterApply] = useStateCallback([]);

  useEffect(() => {
    context.setLoading(true, 'fetching country..');
    document.body.style.backgroundColor = 'white';
    clientCountry
      .getAllCountry()
      .then((result: any) => {
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

  const handleOrderBy = (filter: any) => {
    setListDataFilter(lOrderBy(listDataFilter, 'text', filter.alphabetShort));
  };

  const handleOnTapListItem = useCallback((item: IListViewData) => {
    console.log('ON TAP OBJECT: ', item);
  }, []);

  const handleListCountryByRegion =
    (regions: string[], filterData: 'asc' | 'desc') => () => {
      const promiseList: any = [];
      if (regions.length) {
        // Make Promise List
        regions.forEach((data: string) => {
          promiseList.push(clientCountry.getCountryByRegional(data));
        });
      } else {
        promiseList.push(clientCountry.getAllCountry());
      }
      Promise.all(promiseList)
        .then((res: any) => {
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

  const handleFilterChange = useCallback(
    (e: any) => {
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
        <BottomSheetFilter onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default Home;
