const initialState = {
    lastLoginDate: '',
    previousLoginDate: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_LAST_LOGIN_DATE_REQUESTED': {
        return {
          ...state,
        };
      }
      case 'UPDATE_LAST_LOGIN_DATE_SUCCESS': {
        return {
          ...state,
          lastLoginDate: action.payload.lastLoginDate,
          previousLoginDate: action.payload.previousLoginDate,
        };
      }
      case 'UPDATE_LAST_LOGIN_DATE_FAILURE': {
        return {
          ...initialState,
          error: action.payload.error,
        };
      }
  
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  