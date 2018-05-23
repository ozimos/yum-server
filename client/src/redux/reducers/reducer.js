const initialState = {
  data: {},
  err: null
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PHOTOS':
      return state;
    case 'GET_PHOTOS_SUCCESSFUL':
      return { ...state,
        data: action.payload,
        err: null
      };
    case 'FAILED':
      return { ...state,
        data: null,
        err: action.payload
      };
    default:
      return state;
  }
};
export default appReducer;