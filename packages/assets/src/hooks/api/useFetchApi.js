import {useEffect, useState} from 'react';
import {api} from '../../helpers';
import queryString from 'query-string';

/**
 * useFetchApi hook for fetch data from api with url
 *
 * @param url
 * @param defaultData
 * @param initLoad
 * @param presentData
 * @returns {{pageInfo: {}, data, setData, count, setCount, fetchApi, loading, fetched}}
 */
export default function useFetchApi(url, defaultData = [], initLoad = true, presentData = null) {
  const [loading, setLoading] = useState(initLoad);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState(defaultData);
  const [pageInfo, setPageInfo] = useState({});
  const [count, setCount] = useState(0);

  async function fetchApi(apiUrl, params = null) {
    try {
      setLoading(true);
      const path = apiUrl || url;
      const separateChar = path.includes('?') ? '&' : '?';
      const query = params ? separateChar + queryString.stringify(params) : '';
      const resp = await api(path + query);
      if (resp.hasOwnProperty('data')) {
        const newData = presentData ? presentData(resp.data) : resp.data;
        setData(Array.isArray(newData) ? newData : {...defaultData, ...newData});
      }
      if (resp.hasOwnProperty('pageInfo')) setPageInfo(resp.pageInfo);
      if (resp.hasOwnProperty('count')) setCount(resp.count);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  useEffect(() => {
    if (initLoad && !fetched) {
      fetchApi().then(() => {});
    }
  }, []);

  return {
    fetchApi,
    data,
    setData,
    pageInfo,
    count,
    setCount,
    loading,
    fetched,
    setFetched
  };
}
