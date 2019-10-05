import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './recentUpdateItem.module.scss';

const RecentUpdateItem = ({ brief, history }) => (
  <div className="col-xs-12 col-md-6">
    <div className={`${styles.searchItem} card`}>
      <div className="card-body">
        <h6 className={styles.searchItemTitle}>
          {brief.meetsRevisedInclusionCriteria ? (
            <Link
              to={{
                pathname: `/brief/${brief.uniqueId}`,
                state: history.location,
              }}
              aria-label={brief.guidelineTitle}
            >
              {brief.guidelineTitle}
            </Link>
          ) : (
            <a
              href={brief.accessTheGuideline}
              target="_blank"
              rel="noopener noreferrer"
              title={brief.guidelineTitle}
              aria-label={brief.guidelineTitle}
            >
              {brief.guidelineTitle}
            </a>
          )}
        </h6>
        <ul className={styles.searchItemDeveloper}>
          {brief.organizations && brief.organizations !== ''
            ? brief.organizations.map((organization, i) => (
                <li key={organization.id}>
                  {organization.title}
                  {brief.organizations.length > 1 &&
                  brief.organizations.length !== i + 1 ? (
                    <span className={styles.divider}>&#124;</span>
                  ) : (
                    ''
                  )}
                </li>
              ))
            : ''}
        </ul>
      </div>
    </div>
  </div>
);

RecentUpdateItem.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      state: PropTypes.object,
    }),
  }),
  brief: PropTypes.shape({
    uniqueId: PropTypes.number.isRequired,
    guidelineTitle: PropTypes.string.isRequired,
    publicationYear: PropTypes.string.isRequired,
    organizations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ),
    score: PropTypes.number,
  }).isRequired,
};

RecentUpdateItem.defaultProps = {
  history: {
    location: {
      hash: '',
      key: '1',
      pathname: '/',
      search: '',
    },
  },
};

const mapStateToProps = state => ({
  user: state.oidc.user,
});

export default withRouter(connect(mapStateToProps)(RecentUpdateItem));
