import {
    searchBriefs,
    refineSearchBriefs,
    fetchRecentUpdates,
    refineRecentUpdateSearch,
  } from '../api';
  import { runFilterUpdate } from '../utils/searchhelpers';
  import briefSelectionActions from '../actions/briefSelectionActions';
  const newSearchStarted = phrase => ({
    type: 'SEARCH_NEW_STARTED',
    phrase,
  });
  
  const newRecentContentSearchStarted = () => ({
    type: 'SEARCH_NEW_RECENT_CONTENT_STARTED',
  });
  
  const searchCompleted = data => ({
    type: 'SEARCH_RESULTS_RECIEVED',
    data,
  });
  
  const pagingStarted = pageNumber => ({
    type: 'SEARCH_FETCH_PAGE_STARTED',
    pageNumber,
  });
  
  const fetchPageCompleted = data => ({
    type: 'SEARCH_PAGE_FETCHED',
    data,
  });
  
  const searchSortChangeStarted = sortBy => ({
    type: 'SEARCH_SORT_STARTED',
    sortBy,
  });
  
  const searchSortCompleted = data => ({
    type: 'SEARCH_SORT_COMPLETED',
    data,
  });
  
  const searchRefinementChangeStarted = newFilters => ({
    type: 'SEARCH_FILTER_CHANGE_STARTED',
    newFilters,
  });
  
  const searchRefinementCompleted = (data, area) => ({
    type: 'SEARCH_FILTER_CHANGE_COMPLETED',
    data,
    area,
  });
  
  const actionCreators = {
    startNewSearch: (user, phrase, sortBy) => dispatch => {
      dispatch(newSearchStarted(phrase));
  
      searchBriefs(phrase, user.access_token, sortBy).then(resp => {
        dispatch(searchCompleted(resp.data));
      });
    },
  
    startNewRecentContentSearch: user => dispatch => {
      dispatch(newRecentContentSearchStarted());
  
      fetchRecentUpdates(user.access_token, 0, 9).then(resp => {
        dispatch(searchCompleted(resp.data));
      });
    },
  
    fetchPage: pageData => (dispatch, getState) => {
      const { oidc, search } = getState();
      const { searchPhrase, filters, isRecentContentSearch, sortBy } = search;
      dispatch(pagingStarted(pageData.currentPage));
      let apiPromise;
  
      if (isRecentContentSearch) {
        apiPromise = refineRecentUpdateSearch(
          filters,
          oidc.user.access_token,
          pageData.startIndex,
          pageData.endIndex
        );
      } else {
        apiPromise = refineSearchBriefs(
          searchPhrase,
          filters,
          oidc.user.access_token,
          sortBy,
          pageData.startIndex,
          pageData.endIndex
        );
      }
  
      apiPromise.then(resp => {
        dispatch(fetchPageCompleted(resp.data));
      });
    },
  
    changeSortDirection: sortBy => (dispatch, getState) => {
      const { oidc, search } = getState();
      const { searchPhrase, filters } = search;
      dispatch(searchSortChangeStarted(sortBy));
  
      refineSearchBriefs(
        searchPhrase,
        filters,
        oidc.user.access_token,
        sortBy
      ).then(resp => {
        dispatch(searchSortCompleted(resp.data));
      });
    },
  
    updateRefiners: filterUpdate => (dispatch, getState) => {
      const { oidc, search } = getState();
      const { area, id, newValue } = filterUpdate;
      const updatedFilter = runFilterUpdate(area, id, newValue, search.filters);
      dispatch(searchRefinementChangeStarted(updatedFilter));
  
      const { searchPhrase, sortBy, isRecentContentSearch } = search;
      let apiPromise;
      if (isRecentContentSearch) {
        apiPromise = refineRecentUpdateSearch(
          updatedFilter,
          oidc.user.access_token
        );
      } else {
        apiPromise = refineSearchBriefs(
          searchPhrase,
          updatedFilter,
          oidc.user.access_token,
          sortBy
        );
      }
      apiPromise.then(resp =>
        dispatch(searchRefinementCompleted(resp.data, area))
      );
    },
  };
  
  export default actionCreators;
  