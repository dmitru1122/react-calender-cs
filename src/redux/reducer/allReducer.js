import actionTypes from '../actions/actionTypes';

const initialState = {
  error: null,
  lastUpdate: 0,
  requestData: { headerData: null, rowData: null },
  deleteRequestStatus: 'waiting',
  fullRequestInfo: {},
  placeholderData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ requestData: action.data },
        ...{ lastUpdate: state.lastUpdate + 1 },
      };

    case actionTypes.LOAD_ONE_REQUEST_SUCCESS:
      return {
        ...state,
        fullRequestInfo: { ...state.fullRequestInfo, [action.id]: action.data },
      };
    // case actionTypes.ADD_ONE_REQUEST_SUCCESS:
    //   return {
    //     ...state,
    //     // ...{ deleteRequestStatus: 'resolve' },
    //     requestData: {
    //       ...state.requestData,

    //       rowData: [...state.requestData.rowData.push(action.data)],
    //     },
    //   };
    case actionTypes.DELETE_ONE_REQUEST_SUCCESS:
      return {
        ...state,
        ...{ deleteRequestStatus: 'resolve' },
        // requestData: {
        //   ...state.requestData,

        //   rowData: [...state.requestData.rowData.filter((item) => (+item.id !== +action.id ? item : null))],
        // },
      };
    case actionTypes.DELETE_ONE_REQUEST_FAIL:
      return {
        ...state,
        ...{ deleteRequestStatus: 'reject' },
      };
    case actionTypes.DELETE_ONE_REQUEST_RESET:
      return {
        ...state,
        ...{ deleteRequestStatus: 'waiting' },
      };
    // case actionTypes.EDIT_ONE_REQUEST_SUCCESS: {
    //   return {
    //     ...state,
    //     // ...{ requestData: action.data },
    //     requestData: {
    //       ...state.requestData,
    //       rowData: action.data,
    //       // rowData: [...state.requestData.rowData.map((item) => (+item.id !== +action.id ? action.data : item))],
    //     },
    //   };
    // }

    default:
      return state;
  }
};

export default reducer;
