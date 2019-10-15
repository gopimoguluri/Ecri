const selectBriefsAction = selectedBriefs => ({
    type: 'SELECT_BRIEFS',
    payload: {
      selectedBriefs: selectedBriefs,
    },
  });
  
  const selectAllBriefsAction = {
    type: 'SELECT_ALL_BRIEFS',
  };
  
  const excludeBriefsAction = selectedBriefs => ({
    type: 'EXCLUDE_BRIEFS',
    payload: {
      excludedBriefs: selectedBriefs,
    },
  });
  
  const clearBriefSelectionAction = {
    type: 'CLEAR_BRIEF_SELECTIONS',
  };
  
  const actionCreators = {
    selectBriefs: selectBriefs => dispatch => {
      dispatch(selectBriefsAction(selectBriefs));
    },
  
    selectAllBriefs: () => dispatch => {
      dispatch(selectAllBriefsAction);
    },
  
    excludeBriefs: selectedBriefs => dispatch => {
      dispatch(excludeBriefsAction(selectedBriefs));
    },
  
    clearBriefSelections: () => dispatch => {
      dispatch(clearBriefSelectionAction);
    },
  };
  
  export default actionCreators;
  