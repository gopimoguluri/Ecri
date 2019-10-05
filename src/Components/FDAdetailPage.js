import React from 'react';
import { bindActionCreators } from 'redux';
import fdaActions from '../../store/actions/fdaActions';
import LoadingSpinner from '../LoadingSpinner';
import { connect } from 'react-redux';
import styles from './fdaDetailsPage.module.scss';

const PageDetails = props => (
  <React.Fragment>
    <div>
      <h2 className={styles.pageTitle}>FDA Notices</h2>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <div className={styles.fdaList}>
          {props.pageData.length > 0 &&
            props.pageData.map(item => {
              return (
                <FdaItem
                  key={item.updatedAt}
                  {...item}
                  formatDate={props.formatDate}
                />
              );
            })}
          {props.pageData.length === 0 && (
            <p className="center-xs">No FDA Notices at this time.</p>
          )}
        </div>
        {props.viewMoreEnabled && (
          <button
            className={`${styles.button} ${styles.primary}`}
            onClick={() => props.viewMoreAction()}
          >
            View More
          </button>
        )}
      </div>
    </div>
  </React.Fragment>
);

const FdaItem = props => (
  <div className={styles.fdaItem}>
    <span className={styles.fdaDate}>
      {props.formatDate(props.fdaDateOfNotice)}
    </span>
    <a className={styles.fdaTitle} href={props.fdaNoticeUrl} target="_blank">
      {props.fdaNoticeTitle}{' '}
      <i className={`fas fa-external-link-alt ${styles.externalLinkAlt}`}></i>
    </a>
    <span className={styles.fdaDrugsInvolved}>
      Drugs Involved: <strong>{props.fdaNoticeDrugsInvolved}</strong>
    </span>
    <p className={styles.fdaDescription}>
      {props.fdaNoticeToHealthCareProfessionals}
    </p>
  </div>
);

class FdaDetailsPage extends React.Component {
  componentDidMount() {
    this.props.fetchFdaNotices(this.props.user, 0, 5);
  }

  handleViewMore() {
    this.props.fetchFdaNotices(
      this.props.user,
      0,
      this.props.fda.fdaData.length + 5
    );
  }

  formatDate(date) {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString('en-US', options);
  }
  render() {
    return (
      <div className={styles.page}>
        <div className="page-content">
          <div className="container">
            {!this.props.fda.isLoadingFdaData ? (
              <PageDetails
                pageData={this.props.fda.fdaData}
                formatDate={this.formatDate}
                viewMoreAction={this.handleViewMore.bind(this)}
                viewMoreEnabled={this.props.fda.viewMoreIsEnabled}
              />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...fdaActions }, dispatch);

const mapStateToProps = state => ({
  user: state.oidc.user,
  isLoadingUser: state.oidc.user.isLoadingUser,
  previewMode: state.previewMode,
  fda: state.fda,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FdaDetailsPage);
