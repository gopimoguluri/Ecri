import * as actionTypes from '../actions/exportActionTypes';

const initialState = {
  selectedBriefs: [],
  excludedBriefs: [],
  searchPhrase: '',
  filters: '',
  sort: '',
  exportType: '',
  exportInProgress: false,
  user: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXPORT_BRIEF_REQUESTED: {
      return {
        ...state,
        ...action.payload,
        exportInProgress: true,
      };
    }
    case actionTypes.EXPORT_BRIEFS_SUCCESS: {
      return {
        ...initialState,
        exportInProgress: false,
      };
    }
    case actionTypes.EXPORT_BRIEF_FAILURE: {
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
