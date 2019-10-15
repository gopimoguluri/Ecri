import {
    augumentFilters,
    calculateSearchPaginingIndices,
    recalculateFilters,
    SEARCH_PAGE_SIZE,
  } from '../utils/searchhelpers';
  
  const initialState = {
    briefData: [],
    searchInProgess: false,
    pagingInProgress: false,
    pageSize: SEARCH_PAGE_SIZE,
    totalHits: 0,
    maxScore: 0,
    currentPage: 1,
    startIndex: 0,
    endIndex: 0,
    sortBy: 'relevance',
    filters: {},
    searchPhrase: '',
    isRecentContentSearch: false,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_NEW_STARTED': {
        return {
          ...initialState,
          sortBy: state.sortBy,
          searchInProgess: true,
          isRecentContentSearch: false,
          searchPhrase: action.phrase,
        };
      }
      case 'SEARCH_NEW_RECENT_CONTENT_STARTED': {
        return {
          ...initialState,
          searchInProgess: true,
          isRecentContentSearch: true,
        };
      }
      case 'SEARCH_RESULTS_RECIEVED': {
        return {
          ...state,
          searchInProgess: false,
          briefData: action.data.hits,
          maxScore: action.data.maxScore,
          totalHits: action.data.totalHits,
          filters: augumentFilters(action.data),
          ...calculateSearchPaginingIndices(state.currentPage),
        };
      }
      case 'SEARCH_PAGE_FETCHED': {
        return {
          ...state,
          searchInProgess: false,
          pagingInProgress: false,
          briefData: action.data.hits,
          ...calculateSearchPaginingIndices(state.currentPage),
        };
      }
      case 'SEARCH_SORT_STARTED': {
        return {
          ...initialState,
          searchInProgess: true,
          sortBy: action.sortBy,
          totalHits: state.totalHits,
          maxScore: state.maxScore,
          searchPhrase: state.searchPhrase,
          filters: state.filters,
          isRecentContentSearch: state.isRecentContentSearch,
        };
      }
      case 'SEARCH_SORT_COMPLETED': {
        return {
          ...state,
          searchInProgess: false,
          pagingInProgress: false,
          briefData: action.data.hits,
          ...calculateSearchPaginingIndices(state.currentPage),
        };
      }
      case 'SEARCH_FETCH_PAGE_STARTED': {
        return {
          ...state,
          searchInProgess: true,
          pagingInProgress: true,
          currentPage: action.pageNumber,
        };
      }
      case 'SEARCH_FILTER_CHANGE_STARTED': {
        return {
          ...initialState,
          searchInProgess: true,
          sortBy: state.sortBy,
          searchPhrase: state.searchPhrase,
          filters: action.newFilters,
          isRecentContentSearch: state.isRecentContentSearch,
        };
      }
      case 'SEARCH_FILTER_CHANGE_COMPLETED': {
        return {
          ...state,
          searchInProgess: false,
          briefData: action.data.hits,
          maxScore: action.data.maxScore,
          totalHits: action.data.totalHits,
          filters: recalculateFilters(state.filters, augumentFilters(action.data), action.area),
          ...calculateSearchPaginingIndices(state.currentPage),
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  