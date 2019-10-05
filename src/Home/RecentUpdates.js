import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RecentUpdateItem from '../RecentUpdateItem';
import LoadingSpinner from '../../LoadingSpinner';
import ShowMoreLink from '../../ShowMoreLink';
import { fetchRecentBriefs } from '../../../actions/briefs';
import styles from './recentUpdates.module.scss';
import homeStyles from '../home.module.scss';

class RecentUpdates extends React.Component {
  componentDidMount() {
    const { dispatch, user, briefs } = this.props;
    const { recent: recentBriefs = [], isLoadingRecent: isLoading = false } = briefs;
    if (!isLoading && recentBriefs.length === 0) {
      dispatch(fetchRecentBriefs(user.access_token));
    }
  }

  render() {
    const { isLoadingRecent: isLoading, recent } = this.props.briefs;

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!recent || recent.length === 0) {
      return <div />;
    }
    // should really be checking we have 6, but if we have at least one we should in practice
    const recentBriefsRow1 = recent.slice(0, 2);
    const recentBriefsRow2 = recent.slice(2, 4);
    const recentBriefsRow3 = recent.slice(4, 6);

    return (
      <section className={`${homeStyles.contentSection} ${homeStyles.secondary}`}>
        <div className={`${homeStyles.mask} ${homeStyles.lighten}`} />
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2>New Content (Last 30 Days)</h2>
              <div className={`${styles.recentUpdates} row`}>
                {recentBriefsRow1.map(brief => (
                  <RecentUpdateItem key={brief.uniqueId} brief={brief} />
                ))}
              </div>
              <div className={`${styles.recentUpdates} row`}>
                {recentBriefsRow2.map(brief => (
                  <RecentUpdateItem key={brief.uniqueId} brief={brief} />
                ))}
              </div>
              <div className={`${styles.recentUpdates} row`}>
                {recentBriefsRow3.map(brief => (
                  <RecentUpdateItem key={brief.uniqueId} brief={brief} />
                ))}
              </div>
            </div>
            <ShowMoreLink
              className={styles.viewMoreButton}
              text="View More"
              arrowPosition="right"
              onClick={() => {
                this.props.history.push({
                  pathname: '/new-content',
                });
              }}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.oidc.user,
  briefs: state.briefs,
  previewMode: state.previewMode,
});

export default withRouter(connect(mapStateToProps)(RecentUpdates));
