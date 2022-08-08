import {useState} from 'react';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import queryString from 'query-string';

/**
 * @param {string} url
 * @param defaultData
 * @param {boolean} initLoad
 * @param {boolean} keepPreviousData
 * @param presentData
 * @param defaultLimit
 * @param defaultSort
 * @param searchKey
 * @param initQueries
 * @returns {{pageInfo: {hasPre, hasNext}, data, setData, count, setCount, fetchApi, loading, fetched, prevPage, nextPage, onQueryChange}}
 */
export default function usePaginate({
  url,
  defaultData = [],
  initLoad = true,
  keepPreviousData = false,
  presentData = null,
  defaultLimit = 20,
  defaultSort = 'createdAt:asc',
  searchKey = 'searchKey',
  initQueries = {}
}) {
  const [queries, setQueries] = useState({
    page: 1,
    sort: defaultSort,
    limit: defaultLimit,
    [searchKey]: '',
    ...initQueries
  });

  const fetchApiHook = useFetchApi({
    url,
    defaultData,
    initLoad,
    presentData,
    initQueries: queries,
    keepPreviousData
  });
  const {data, fetchApi} = fetchApiHook;

  const handleFetchApi = async (params = null) => {
    await fetchApi(prepareUrl(url, {...queries, ...params}));
  };

  const onQueryChange = (key, value, isFetch = false) => {
    setQueries(prev => ({...prev, [key]: value}));
    if (isFetch) {
      handleFetchApi({[key]: value}).then();
    }
  };

  const onPaginate = async (paginate = '') => {
    const [before, after, page] = (() => {
      switch (paginate) {
        case 'prev':
          return [data[0].id, '', queries.page - 1];
        case 'next':
          return ['', data[data.length - 1].id, queries.page + 1];
        default:
          return ['', '', 1];
      }
    })();
    await handleFetchApi({page, before, after});
    setQueries(prev => ({...prev, page}));
  };

  return {
    prevPage: () => onPaginate('prev'),
    nextPage: () => onPaginate('next'),
    onQueryChange,
    ...fetchApiHook
  };
}

function prepareUrl(url, params) {
  const formatParams = Object.keys(params).reduce((prev, current) => {
    const value = params[current];
    return {...prev, [current]: Array.isArray(value) ? value.join(',') : value};
  }, {});
  return `${url}?${queryString.stringify(formatParams)}`;
}
