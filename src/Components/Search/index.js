import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BriefSearchResultItem from '../BriefSearchResultItem';
import SearchFilters from './SearchFilters';
import Pagination from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import ResultCount from './ResultCount';
import { actionCreators as loggingActions } from '../../actions/usagelogging';
import searchActions from '../../actions/search';

import briefSelectionActions from '../../actions/briefSelectionActions';

import SortFilter from './SortFilter';
import { extractSearchString } from '../../utils/searchhelpers';
import '../../App/scss/checkbox.scss';

import styles from './search.module.scss';
import isEqual from 'react-fast-compare';
/* Material-UI components */
import ExportModal from './ExportModal';

import ExportDialog from './ExportDialog';
import snackbarNotify from '../../utils/snackbarnotifier';
import StatusBar from '../StatusBar';
import exportActions from '../../actions/exportActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      exportFormat: '',
      dialogIsOpen: false,
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.getCheckboxStatus = this.getCheckboxStatus.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleExportSelectChange = this.handleExportSelectChange.bind(this);
    this.handleExport = this.handleExport.bind(this);
  }

  openDialog(e) {
    if (
      this.props.selectAllEnabled ||
      this.props.selectedBriefs.length > 0 ||
      this.props.excludeBriefs.length > 0
    )
      this.setState({
        dialogIsOpen: true,
      });
  }

  closeDialog() {
    this.setState({
      dialogIsOpen: false,
    });
  }

  handleExportSelectChange = event => {
    this.setState({
      exportFormat: event.target.value,
    });
  };

  handleExport = () => {
    this.props.exportBriefs(
      this.props.user,
      this.props.selectedBriefs,
      this.props.excludedBriefs,
      this.props.searchData.searchPhrase,
      this.props.searchData.sortBy,
      this.props.searchData.filters,
      this.state.exportFormat || 'ris'
    );

    this.closeDialog();
  };

  handleSelectAll = changeEvent => {
    this.props.selectAllBriefs();
  };

  getCheckboxStatus = briefId => {
    if (this.props.selectAllEnabled) {
      if (this.props.excludedBriefs.indexOf(briefId.toString()) !== -1) {
        return false;
      }
      return true;
    } else {
      return this.props.selectedBriefs.indexOf(briefId.toString()) !== -1
        ? true
        : false || this.props.selectAllEnabled;
    }
  };

  handleCheckboxChange = changeEvent => {
    const checkbox = changeEvent.target;
    let newCheckedItems = [];
    let checkedItemIndex = -1;
    if (!this.props.selectAllEnabled) {
      newCheckedItems = [...this.props.selectedBriefs];
      checkedItemIndex = this.props.selectedBriefs.indexOf(checkbox.id);

      if (checkedItemIndex !== -1) {
        newCheckedItems.splice(checkedItemIndex, 1);
      } else {
        newCheckedItems.push(checkbox.id);
      }
      this.props.selectBriefs(newCheckedItems);
    } else {
      newCheckedItems = [...this.props.excludedBriefs];
      checkedItemIndex = this.props.excludedBriefs.indexOf(checkbox.id);

      if (checkedItemIndex !== -1) {
        newCheckedItems.splice(checkedItemIndex, 1);
      } else {
        newCheckedItems.push(checkbox.id);
      }

      this.props.excludeBriefs(newCheckedItems);
    }
  };

  totalNumberOfItemsToExport() {
    if (this.props.selectedBriefs.length > 0) {
      return this.props.selectedBriefs.length;
    }

    return this.props.searchData.totalHits - this.props.excludedBriefs.length;
  }
  render() {
    const enableExportFeature =
      this.props.selectAllEnabled ||
      this.props.selectedBriefs.length > 0 ||
      this.props.excludedBriefs.length > 0;

    const {
      searchData,
      user,
      startNewSearch,
      fetchPage,
      changeSortDirection,
      location,
      ranSearch,
    } = this.props;

    const {
      searchInProgess,
      pagingInProgress,
      filters,
      searchPhrase,
      sortBy,
      totalHits,
      startIndex,
      endIndex,
      currentPage,
      maxScore,
      briefData,
      pageSize,
    } = searchData;

    const currentPhrase = extractSearchString(location);

    const handleSelectAll = this.handleSelectAll;

    const newSearch = currentPhrase !== searchPhrase;

    if (newSearch) {
      ranSearch(user, currentPhrase);
      startNewSearch(user, currentPhrase, sortBy);
    }

    const selectProps = {
      placeholder: 'Type an Organization Name',
      value: this.state.exportFormat,
      onChange: this.handleExportSelectChange,
    };

    console.log('Brief List is working!');
    return (
      <section className="page-content">
        <StatusBar
          isOpen={enableExportFeature}
          resultCount={this.totalNumberOfItemsToExport()}
          action={e => this.openDialog(e)}
          selectAll={this.handleSelectAll}
          selectAllEnabled={this.props.selectAllEnabled}
          handleClearAll={this.resetPage}
        />
        <div className="container">
          <div className="row">
            <article className="col-xs-12">
              <div className="row">
                <div className="col-xs-12 col-md-3">
                  {searchInProgess && filters.length ? (
                    <LoadingSpinner />
                  ) : (
                    <SearchFilters />
                  )}
                </div>
                <div className="col-xs-12 col-md-9">
                  {searchInProgess || newSearch ? (
                    <LoadingSpinner />
                  ) : (
                    <React.Fragment>
                      <h1 className={styles.resultsPageHeading}>
                        {`Search${
                          !pagingInProgress && (searchInProgess || newSearch)
                            ? 'ing'
                            : ' Results'
                        } for '${currentPhrase}'`}
                      </h1>
                      <div className={styles.searchResultListHead}>
                        <ResultCount
                          startIndex={startIndex}
                          endIndex={endIndex}
                          totalHits={totalHits}
                        />
                        <div className={styles.exportControls}>
                          <button
                            className={`${
                              styles.exportButton
                            } ${!enableExportFeature && styles.disabled}`}
                            onClick={e => this.openDialog(e)}
                          >
                            <i
                              className={`fa fa-download ${styles.faDownload}`}
                            />
                            Export Selected
                          </button>

                          <ExportDialog
                            dialogIsOpen={this.state.dialogIsOpen}
                            openDialog={e => this.openDialog(e)}
                            closeDialog={this.closeDialog.bind(this)}
                            actionButton={this.handleExport}
                            selectProps={selectProps}
                            ariaLabelledBy="export-modal-title"
                            ariaDescribedBy="export-modal-description"
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                  <div className={styles.resultsToolbar}>
                    <div className={styles.col1}>
                      <div
                        className={styles.checkboxLabel}
                        onClick={e => {
                          return handleSelectAll(e);
                        }}
                      >
                        <input
                          type="checkbox"
                          id=""
                          name=""
                          autoComplete="off"
                          aria-labelledby="Select All / Clear All"
                          checked={
                            this.props.selectAllEnabled &&
                            this.props.excludedBriefs.length === 0
                          }
                        />
                        <label
                          className={`${styles.checkboxTitle} ${
                            styles.selectAllTitle
                          }`}
                          htmlFor=""
                        >
                          {/*<LimitedText text={patientAge.key.Title} maxchars={20} />*/}
                          <span
                            title=""
                            className={`${
                              styles.checkboxInnerTitle
                            } checkbox-inner-title`}
                          >
                            Select All / Clear All
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className={styles.col2}>
                      <SortFilter
                        onChange={e => changeSortDirection(e.target.value)}
                        selectedValue={sortBy}
                      />
                    </div>
                  </div>
                  <div className="results-list">
                    {!searchInProgess &&
                      briefData.length > 0 &&
                      briefData.map((brief, i) => {
                        let cbStatus = this.getCheckboxStatus(brief.uniqueId);

                        return (
                          <BriefSearchResultItem
                            key={brief.uniqueId}
                            brief={brief}
                            maxScore={maxScore}
                            isSelected={cbStatus}
                            checkboxChange={this.handleCheckboxChange}
                          />
                        );
                      })}
                    {!searchInProgess && briefData.length === 0 && (
                      <div>No results found</div>
                    )}
                  </div>
                  {!searchInProgess && briefData.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      pageSize={pageSize}
                      totalItems={totalHits}
                      onChangePage={p => {
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
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...loggingActions,
      ...searchActions,
      ...briefSelectionActions,
      ...exportActions,
    },
    dispatch
  );

const mapStateToProps = state => ({
  user: state.oidc.user,
  searchData: state.search,
  selectAllEnabled: state.briefSelections.selectAllEnabled,
  selectedBriefs: state.briefSelections.selectedBriefs,
  excludedBriefs: state.briefSelections.excludedBriefs,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
