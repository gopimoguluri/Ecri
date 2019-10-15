const initialState = {
    selectedBriefs: [],
    selectAllEnabled: false,
    excludedBriefs: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_BRIEFS': {
        return {
          ...state,
          selectedBriefs: action.payload.selectedBriefs,
        };
      }
      case 'SELECT_ALL_BRIEFS': {
        return {
          ...state,
          selectAllEnabled: !state.selectAllEnabled,
          selectedBriefs: [],
          excludedBriefs: [],
        };
      }
      case 'EXCLUDE_BRIEFS': {
        return {
          ...state,
          excludedBriefs: action.payload.excludedBriefs,
          selectedBriefs: [],
        };
      }
      case 'CLEAR_BRIEF_SELECTIONS': {
        return {
          ...state,
          excludedBriefs: [],
          selectedBriefs: [],
          selectAllEnabled: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  