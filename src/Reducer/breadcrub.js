import { Stack } from 'immutable';

const maxCrumbs = 10;

const initialState = {
  crumbs: Stack(),
  isNavigating: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BREADCRUMB_CLICKED': {
      return {
        crumbs: state.crumbs.pop(),
        isNavigating: true,
      };
    }
    case 'BREADCRUMB_USED': {
      return {
        ...state,
        isNavigating: false,
      };
    }
    case 'BREADCRUMB_ADDED': {
      if (state.crumbs.size === maxCrumbs) {
        return {
          crumbs: state.crumbs.shift().push(action.crumb),
          isNavigating: false,
        };
      }
      return {
        crumbs: state.crumbs.push(action.crumb),
        isNavigating: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
