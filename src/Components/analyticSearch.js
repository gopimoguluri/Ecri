import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//import { fetchAnalyticsQuery } from '../../api';
import Autosuggest from 'react-autosuggest';
import { Helmet } from 'react-helmet';
import PrivateRoute from '../PrivateRoute';
import userManager from '../../utils/usermanager';
import LoadingSpinner from '../LoadingSpinner';
import DatePicker from 'react-datepicker';
import excelLogo from '../../assets/images/excel-logo.svg';
import Moment from 'react-moment';
import { throttle, debounce } from 'throttle-debounce';
import PropTypes from 'prop-types';
import './react-datepicker.css';
import './forms.css';
import './autosuggest-styles.css';
import styles from './analyticsPage.module.scss';
import { fetchAnalyticsQuery, fetchAnalyticsReport } from '../../api';

const ReportDetails = props => {
  if (props.reportData.length > 0) {
    return (
      <section className={styles.reportSection}>
        <div className="row">
          <div className="col-xs-12">
            <div className={styles.reportHeader}>
              <div className={styles.metaInfo}>
                <h3 className={styles.mainHeading}>{props.selectedOrgName}</h3>
                <h6 className={styles.subHeading}>
                  Showing results from{' '}
                  <strong>{props.formattedStartDate}</strong> thru{' '}
                  <strong>{props.formattedEndDate}</strong>
                </h6>
              </div>
              <button
                className={styles.exportButton}
                onClick={() => {
                  props.exportToExcel();
                }}
              >
                <img className={styles.iconExcel} src={excelLogo} />
                Export to Excel
              </button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.centered}>Guideline ID</th>
                  <th>Guideline Title</th>
                  <th className={styles.centered}>Guideline Brief Hits</th>
                  <th className={styles.centered}>Trust Scorecard Hits</th>
                </tr>
              </thead>
              <tbody>
                {props.reportData.map((org, i) => (
                  <tr key={i}>
                    <td className={styles.centered}>{org.guidelineId}</td>
                    <td>{org.guidelineTitle}</td>
                    <td className={styles.centered}>{org.brief}</td>
                    <td className={styles.centered}>{org.trustscore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
  return ''; {/*<ReportNotFound initialSearch={props.initialSearch}/> */}
};

const ReportNotFound = props => {
  if (props.initialSearch) {
    return (
      <div className={styles.notFoundSection}>
        <div className="row">
          <div className="col-xs-12">
            <div className={styles.notFoundMsg}>
              <h4 className={styles.notFoundHeading}>
                <i className={`fas fa-ban ${styles.notFoundIcon}`} />
                Report not found
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};
const NotAuthorizedUser = props => {
  return (
    <div className="page-content">
      <div className="container">
        <h2 className={styles.pageHeading}>Not Authorized</h2>
        <div className="row center-xs">
          <div className="col-xs-12">
            <h3>We're sorry, but you are not authorized to view this page.</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorMessage = props => {
  return (
    <div className={styles.errorSection}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className={styles.errorMsg}>
              <h4 className={styles.errorHeading}>
                <i
                  className={`fas fa-exclamation-triangle ${styles.errorIcon}`}
                />
              </h4>
              <p className={styles.errorText}>{props.errorMsg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <span>{suggestion.primaryOrganization}</span>
);

const renderSuggestionsContainer = ({ containerProps, children, query }) => (
  <div {...containerProps}>
    {children}
    {
      <div className="footer">
        Press Enter to search <strong>{query}</strong>
      </div>
    }
  </div>
);

const initFormatDate = date => {
  const moment = require('moment');
  return moment(date)
    .format('MM/DD/YYYY')
    .toString();
};
const randomDelay = () => 300 + Math.random() * 1000;

class AnalyticsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSearch: false,
      exportOnly: false,
      queryData: [] /* should be null until data is loaded and stored here - temporarily changed to true */,
      queryValue: '',
      queryIsLoading: false,
      suggestions: [],
      selectedOrgId: '',
      selectedOrgName: '',
      reportData: [],
      reportLoading: false,
      reportNotFound: false,
      loading: false,
      error: false,
      errorMsg: '',
      startDate: new Date('November 1, 2018 00:00:01'),
      formattedStartDate: initFormatDate(new Date('November 1, 2018 00:00:01')),
      endDate: new Date(),
      formattedEndDate: initFormatDate(new Date()),
      user: null,
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleQueryInputChange = this.handleQueryInputChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.debouncedLoadSuggestions = debounce(500, this.fetchQuery); // 1000ms is chosen for demo purposes only.
    this.fetchReport = this.fetchReport.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  handleStartDateChange(startDate) {
    this.setState({
      startDate: startDate,
      formattedStartDate: this.formatDate(startDate),
    });
  }

  handleEndDateChange(endDate) {
    this.setState({
      endDate: endDate,
      formattedEndDate: this.formatDate(endDate),
    });
  }

  handleQueryInputChange = (event, { newValue, method }) => {
    this.setState({
      queryValue: newValue,
      //selectedOrgId: '',
      //selectedOrgName: '',
    });
  };

  fetchReport() {
    let exportOnly = this.state.exportOnly;

    //axios.get(`/api/analytics/getanalytics/?PrimaryOrganizationId=aeec9b48063372c877af740a36982dc1&StartDate=${this.state.formattedStartDate}&EndDate=${this.state.formattedEndDate}`, {headers: { Authorization: `Bearer ${this.state.user.access_token}` },})
    fetchAnalyticsReport(
      this.state.user,
      exportOnly,
      this.state.selectedOrgId,
      this.state.formattedStartDate,
      this.state.formattedEndDate
    )
      .then(res => {
        if (exportOnly) {
          //let blob = new Blob([res.data], { type: 'application/vnd-xls' });         
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
          const url = window.URL.createObjectURL(blob);
          const filename = 'analytics.xls';
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, filename);
          } else {
              let url = window.URL.createObjectURL(blob);
          }

          const link = document.createElement('a');
          link.href = url;

          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.outerHTML = "";
          // ref.current.download = 'report.xls';
          // ref.current.click();
          // ref.current.outerHTML = "";
          //  FileDownload(res.data, 'report.xls');
          this.setState({
            exportOnly: false,
            reportLoading: false,
            reportNotFound: false,
            error: false,
            errorMsg: '',
          });
          return false;
        } else {
          if (res.data.length > 0) {
            this.setState(
              {
                reportData: res.data,
                reportLoading: false,
                reportNotFound: false,
                error: false,
                errorMsg: '',
              },
              () => this.forceUpdate()
            );
          } else {
            this.setState(
              {
                reportData: res.data,
                reportLoading: false,
                reportNotFound: true,
                error: false,
                errorMsg: '',
              },
              () => this.forceUpdate()
            );
          }
        }
      })
      .catch(error => {
        console.error('error: ', error);
        this.setState({
          // objects cannot be used as a react child
          // -> <p>{error}</p> would throw otherwise
          error: `${error}`,
          errorMsg: `${error.message}`,
          reportLoading: false,
          reportNotFound: false,
        });
      });
  }

  handleSubmit(event = false) {
    let inputValue = '';
    if (typeof event === 'object' && event.target.value) {
      event.preventDefault();
      let queryInput = event.target.getElementsByClassName(
        'react-autosuggest__input'
      );
      if (queryInput[0].value === '') {
        this.setState({
          initialSearch: true,
          error: false,
          errorMsg: '',
        });
        return false;
      }
      inputValue = event.target.value;
    } else {
      inputValue = this.state.queryValue;
    }
    this.setState(
      {
        initialSearch: true,
        reportData: [],
        reportLoading: true,
        reportNotFound: false,
        error: false,
        errorMsg: '',
        queryValue: inputValue,
      },
      () => {
        console.log('New form was submitted for ' + this.state.selectedOrgName);
        /*Working ID for testing: PrimaryOrganizationId=aeec9b48063372c877af740a36982dc1*/
        /* working dates 01/01/2012 thru 01/01/2020 */
        let matchFound = false;
        if (this.state.queryData.length > 0) {
          this.state.queryData.filter((org, i, queryData) => {
            if (this.state.queryValue === org.primaryOrganization) {
              matchFound = true;
              this.setState(
                {
                  selectedOrgName: org.primaryOrganization,
                  selectedOrgId: org.primaryOrganizationId,
                },
                () => {
                  console.log(
                    'Organization has been updated to ' +
                      this.state.selectedOrgName
                  );
                  return this.fetchReport();
                }
              );
            }
            if (queryData.length === i + 1 && !matchFound) {
              this.setState(
                {
                  reportLoading: false,
                  reportNotFound: true,
                  error: false,
                  errorMsg: '',
                },
                () => this.forceUpdate()
              );
            }
          });
        } else {
          this.setState(
            {
              reportLoading: false,
              reportNotFound: true,
              error: false,
              errorMsg: '',
            },
            () => this.forceUpdate()
          );
        }
      }
    );
  }

  fetchQuery = (user = null, searchTerm, callback) => {
    let callbackExists = false;

    if (callback && typeof callback === 'function') {
      callbackExists = true;
    }

    this.setState({
      queryIsLoading: true,
    });

    if (user !== null && user.access_token !== null && searchTerm.length > 0) {
      fetchAnalyticsQuery(user, searchTerm)
        .then(
          function(res) {
            console.log(res.data);
            this.setState(
              {
                queryData: res.data,
                suggestions: res.data,
                queryIsLoading: false,
                error: false,
                errorMsg: '',
                reportLoading: false,
                reportNotFound: false,
              },
              () => callbackExists && callback()
            );
          }.bind(this)
        )
        .catch(error => {
          console.error('error: ', error);
          this.setState(
            {
              // objects cannot be used as a react child
              // -> <p>{error}</p> would throw otherwise
              queryData: [],
              suggestions: [],
              reportData: [],
              queryIsLoading: false,
              error: true,
              errorMsg: `${error.message}`,
              reportLoading: false,
              reportNotFound: false,
            },
            () => callbackExists && callback()
          );
        });
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  // ***
  // Note: This is where the query API should be called from.
  // ***
  onSuggestionsFetchRequested = ({ value }) => {
    // Check if value changed by several keystrokes. If so, then make another API call.
    // This logic will need to be refined to account for mobile autospelling in single kepypresses.
    let searchTerm = encodeURI(value);
    this.setState({ queryIsLoading: true });
    return this.debouncedLoadSuggestions(this.state.user, searchTerm);
  };

  // Autosuggest will call this function every time you need to clear suggestions
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Called when a suggestion is selected.
  onSuggestionSelected = (suggestion, method) => {
    let matched = {
      selectedOrgName: '',
      selectedOrgId: '',
    };

    //
    this.state.queryData.filter((org, i) => {
      if (event.target.innerHTML === org.primaryOrganization) {
        matched = {
          selectedOrgName: org.primaryOrganization,
          selectedOrgId: org.primaryOrganizationId,
        };
      }
    });

    console.log('Sugestion Selected.');
    this.setState(
      {
        selectedOrgName: matched.selectedOrgName,
        selectedOrgId: matched.selectedOrgId,
      },
      () => this.handleSubmit()
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    this.setState({
      selectedOrgId: suggestion.primaryOrganizationId,
      selectedOrgName: suggestion.primaryOrganization,
    });
    return suggestion.primaryOrganization;
  };

  formatDate(date) {
    const moment = require('moment');
    return moment(date)
      .format('MM/DD/YYYY')
      .toString();
  }
  exportToExcel() {
    this.setState(
      {
        exportOnly: true,
      },
      () => {
        this.fetchReport();
      }
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      // Enter
      // Stop it here
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget.value === '') {
        this.setState({
          initialSearch: true,
        });
      } else {
        //this.fetchQuery(this.state.user, e.target.value, this.handleSubmit)
        this.handleSubmit();
      }
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  };
  componentDidMount() {
    this.loadPage();
  }

  componentDidUpdate(prevProps) {
    const { location, previewMode } = this.props;
    const isNewPath = prevProps.location.pathname !== location.pathname;
    const isPreviewSwitch =
      prevProps.previewMode.isEnabled !== previewMode.isEnabled;
    if (isNewPath || (isPreviewSwitch && this.state.queryData.length === 0)) {
      this.loadPage();
    }
  }

  loadPage() {
    const { user = null, previewMode } = this.props;
    const loggedOut = !user || user.expired;
    //const pathNoTailingSlash = location.pathname.substring(1);
    const isPreview = previewMode.isPreviewUser && previewMode.isEnabled;
    const self = this;
    this.setState({
      user: user,
    });
  }

  render() {
    const { ...stateProps } = this.state;
    const {
      user,
      isLoadingUser,
      location,
      togglePreviewMode,
      previewMode,
    } = this.props;
    const handleStartDateChange = this.handleStartDateChange;
    const handleEndDateChange = this.handleEndDateChange;
    const handleSubmit = this.handleSubmit;
    const exportToExcel = this.exportToExcel;
    const loggedOut = !user || user.expired;
    //const pathNoTailingSlash = location.pathname.substring(1);
    const isPreview = previewMode.isPreviewUser && previewMode.isEnabled;
    const self = this;

    if (!previewMode.isPreviewUser) {
      return <NotAuthorizedUser />;
    }

    const inputProps = {
      placeholder: 'Type an Organization Name',
      value: stateProps.queryValue,
      onChange: this.handleQueryInputChange,
      onKeyDown: this.onKeyDown,
    };
    return (
      <div className={`page-content ${styles.pageContent}`}>
        <div className={`container ${styles.container}`}>
          <h2 className={styles.pageHeading}>Guideline Analytics</h2>

          <div className={styles.searchSection}>
            <div className="row">
              <div className="col-xs-12">
                {/*<form className={styles.analyticsForm} onSubmit={props.handleSubmit.bind(this, props.user)}>*/}
                <form
                  className={`${styles.analyticsForm}`}
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <div
                    className={`input-group ${styles.inputGroup} ${
                      styles.querySearch
                    }`}
                  >
                    <div
                      className={`input-group-prepend ${
                        styles.inputGroupPrepend
                      }`}
                    >
                      <span
                        className={`input-group-text ${styles.inputGroupText}`}
                      >
                        Organization Name
                      </span>
                    </div>
                    <div
                      className={`react-autosuggest__wrap ${
                        styles.autosuggestWrap
                      }`}
                    >
                      <Autosuggest
                        suggestions={stateProps.suggestions}
                        onSuggestionsFetchRequested={
                          this.onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          this.onSuggestionsClearRequested
                        }
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        renderSuggestionsContainer={renderSuggestionsContainer}
                        inputProps={inputProps}
                      />
                      {/*<a className={styles.searchButton} onClick={(e) => this.handleSubmit(e)}><i className={`fas fa-search ${styles.iconSearch}`}></i></a>*/}
                      {stateProps.queryIsLoading && (
                        <i
                          className={`fas fa-spinner fa-spin ${
                            styles.autosuggestSpinner
                          }`}
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.dateControls}>
                    <div
                      className={`input-group ${styles.inputGroup} ${
                        styles.startDate
                      }`}
                    >
                      <div
                        className={`input-group-prepend ${
                          styles.inputGroupPrepend
                        }`}
                      >
                        <span
                          className={`input-group-text ${
                            styles.inputGroupText
                          }`}
                        >
                          Start Date
                        </span>
                      </div>
                      <DatePicker
                        id="startDate"
                        className={`form-control ${styles.formControl}`}
                        selected={stateProps.startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                    <div
                      className={`input-group ${styles.inputGroup} ${
                        styles.endDate
                      }`}
                    >
                      <div
                        className={`input-group-prepend ${
                          styles.inputGroupPrepend
                        }`}
                      >
                        <span
                          className={`input-group-text ${
                            styles.inputGroupText
                          }`}
                        >
                          End Date
                        </span>
                      </div>
                      <DatePicker
                        id="endDate"
                        className={`form-control ${styles.formControl}`}
                        selected={stateProps.endDate}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
          {stateProps.reportLoading ? (
            <div className="page-content">
              <div className="container">
                <LoadingSpinner cxtClassName={'shortHeight'} />
              </div>
            </div>
          ) : (
            [
              stateProps.reportNotFound ? (
                <ReportNotFound initialSearch={stateProps.initialSearch} />
              ) : (
                <ReportDetails {...stateProps} exportToExcel={exportToExcel} />
              ),
            ]
          )}
          {stateProps.error && <ErrorMessage {...stateProps} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.oidc.user,
  previewMode: state.previewMode,
});

export default withRouter(connect(mapStateToProps)(AnalyticsPage));
