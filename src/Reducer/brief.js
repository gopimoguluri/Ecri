const initialState = {
    recent: [],
    current: null,
    isLoadingRecent: false,
    isLoadingCurrent: false,
    lastBriefLoadError: '',
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_RECENT_UPDATES_STARTED': {
        return {
          ...state,
          isLoadingRecent: true,
        };
      }
      case 'FETCH_RECENT_UPDATES_SUCCEEDED': {
        return {
          ...state,
          isLoadingRecent: false,
          recent: action.recent,
        };
      }
      case 'FETCH_RECENT_UPDATES_FAILED': {
        return {
          ...state,
          isLoadingRecent: false,
        };
      }
      case 'FETCH_BRIEF_STARTED': {
        return {
          ...state,
          isLoadingCurrent: true,
        };
      }
      case 'FETCH_BRIEF_SUCCEEDED': {
        return {
          ...state,
          current: action.current,
          isLoadingCurrent: false,
        };
      }
  
      case 'FETCH_BRIEF_FAILED': {
        return {
          ...state,
          current: null,
          isLoadingCurrent: false,
          lastBriefLoadError: action.lastBriefLoadError,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  