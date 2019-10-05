import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BriefSearchResultItem from '../BriefSearchResultItem';
import SearchFilters from '../Search/SearchFilters';
import Pagination from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import ResultCount from '../Search/ResultCount';
import { actionCreators as loggingActions } from '../../actions/usagelogging';
import searchActions from '../../actions/search';
import styles from '../Search/search.module.scss';

const NewContent = ({
  searchData, user, startNewRecentContentSearch, fetchPage,
}) => {
  const {
    searchInProgess,
    pagingInProgress,
    filters,
    totalHits,
    startIndex,
    endIndex,
    currentPage,
    maxScore,
    briefData,
    pageSize,
  } = searchData;

  const newSearch = !searchData.isRecentContentSearch;
  if (newSearch) {
    startNewRecentContentSearch(user);
  }
  console.log("Brief List created!");
  
  return (
    <section className="page-content">
      <div className="container">
        <div className="row">
          <article className="col-xs-24">
            <h1>{`${newSearch ? 'Loading' : 'Viewing'} New Content (Last 30 Days)`}</h1>
            <div className="row">
              <div className="col-xs-12 col-md-3">
                {searchInProgess && filters.length ? <LoadingSpinner /> : <SearchFilters />}
              </div>
              <div className="col-xs-12 col-md-9">
                {searchInProgess || newSearch ? (
                  <LoadingSpinner />
                ) : (
                  <div className={styles.searchResultListHead}>
                    <ResultCount
                      startIndex={startIndex}
                      endIndex={endIndex}
                      totalHits={totalHits}
                    />
                  </div>
                )}
                {!searchInProgess && briefData.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalItems={totalHits}
                    onChangePage={(p) => {
                      fetchPage(p);
                    }}
                  />
                )}
                <div className="results-list">
                  {!searchInProgess
                    && briefData.length > 0
                    && briefData.map(brief => (
                      <BriefSearchResultItem
                        key={brief.uniqueId}
                        brief={brief}
                        maxScore={maxScore}
                      />
                    ))}
                  {!newSearch && !searchInProgess && briefData.length === 0 && (
                    <div>No results found</div>
                  )}
                </div>
                {!searchInProgess && briefData.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalItems={totalHits}
                    onChangePage={(p) => {
                      fetchPage(p);
                    }}
                  />
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({ ...loggingActions, ...searchActions }, dispatch);

const mapStateToProps = state => ({
  user: state.oidc.user,
  searchData: state.search,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewContent);
