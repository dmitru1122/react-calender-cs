import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../redux/actions/actionTypes';

export function useGetRequestData() {
  const requestsData = useSelector((state) => state.requestData);
  const lastUpdate = useSelector((state) => state.lastUpdate);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (requestsData?.headerData) {
      setData(requestsData);
    } else {
      dispatch({ type: actionTypes.LOAD_DATA });
    }
  }, [lastUpdate, requestsData]);

  return data;
}

export const tti = 'sdfsd';
