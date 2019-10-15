const initialState = {
    isPreviewUser: false,
    isEnabled: false,
  };
  
  const reducer = (state = initialState, action) => {
    if (action.type === 'PREVIEW_MODE_CHECK_ACCESS') {
      return initialState;
    }
  
    if (action.type === 'PREVIEW_MODE_ACCESS_GRANTED') {
      return {
        isPreviewUser: true,
        isEnabled: true,
      };
    }
  
    if (action.type === 'PREVIEW_MODE_ACCESS_DENIED') {
      return {
        isPreviewUser: false,
        isEnabled: false,
      };
    }
  
    if (action.type === 'PREVIEW_MODE_TOGGLE') {
      if (state.isPreviewUser) {
        return {
          ...state,
          isEnabled: action.isEnabled,
        };
      }
  
      return initialState;
    }
  
    return state;
  };
  
  export default reducer;
  