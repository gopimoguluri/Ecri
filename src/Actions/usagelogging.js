export const routeChanged = 'ROUTE_CHANGED';
export const userSearch = 'SEARCH_PERFORMED';
export const briefPrinted = 'BRIEF_PRINTED';

const actionCreators = {
  viewPage: (user, location, title) => ({
    type: routeChanged,
    user,
    location,
    title,
  }),

  ranSearch: (user, searchPhrase) => ({
    type: userSearch,
    user,
    searchPhrase,
  }),

  printedBrief: (user, url) => ({
    type: briefPrinted,
    user,
    url,
  }),
};

const queuePageView = (user, location, title) => (dispatch) => {
  setTimeout(() => {
    dispatch(actionCreators.viewPage(user, location, title));
  }, 0);
  // this is pretty bad, but trying to pull the right title
  // after react helmet does its thing
  // https://github.com/nfl/react-helmet/issues/189
};

export { actionCreators, queuePageView };
