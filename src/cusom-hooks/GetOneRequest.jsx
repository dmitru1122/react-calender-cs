import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actionTypes from '../redux/actions/actionTypes';

export function useGetOneRequest(id) {
  const requestsData = useSelector((state) => state.fullRequestInfo);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (requestsData[id]) {
      setData(requestsData[id]);
    } else {
      dispatch({ type: actionTypes.LOAD_ONE_REQUEST, id });
    }
  }, [requestsData]);

  return data;
}

export const test = 'dfsf';
