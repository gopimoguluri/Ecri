import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RecentUpdates from './RecentUpdates/async';
import NonMemberMessage from './NonMemberMessage';
import trustScoreImg from '../../assets/images/trust-seal-no-label.svg';
import styles from './home.module.scss';

class Home extends React.Component {
  render() {
    const { user } = this.props;
    const loggedIn = user && !user.expired;
    const hasGuidelines =
      loggedIn &&
      user.profile.role.filter(
        r => r === 'ECRI Employee' || r === 'Guidelines Trust'
      ).length > 0;

    return (
      <React.Fragment>
        <section className={styles.hero}>
          <div className={styles.heroItem}>
            <div className={styles.view}>
              <div className={`${styles.mask}`}>
                <div className={styles.container}>
                  <div
                    className={`${styles.heroItemContent} row center-xs start-lg`}
                  >
                    <div className="col-xs-10 col-md-10 col-lg-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {!hasGuidelines && <NonMemberMessage />}
        <section className={`${styles.contentSection}`}>
          <div className="container">
            <div className={styles.features}>
              <div className="row">
                <div className={`${styles.featureItem} col-xs-12 col-md-4`}>
                  <i className={`${styles.featureIcon} fas fa-users`} />
                  <h5 className={styles.featureHeading}>
                    About Guidelines Trust
                  </h5>
                  <p>
                    20+ years’ experience providing current, evidence-based
                    guidance.
                  </p>
                  <Link
                    className={styles.readMore}
                    to="/about"
                    aria-label="About Guidelines Trust"
                  >
                    Learn More
                  </Link>
                </div>
                <div className={`${styles.featureItem} col-xs-12 col-md-4`}>
                  <i
                    className={`${styles.featureIcon} fas fa-clipboard-check`}
                  />
                  <h5 className={styles.featureHeading}>Inclusion Criteria</h5>
                  <p>How are guidelines included in the Trust?</p>
                  <Link
                    className={styles.readMore}
                    to="/inclusion-criteria"
                    aria-label="Inclusion Criteria"
                  >
                    Learn More
                  </Link>
                </div>
                <div className={`${styles.featureItem} col-xs-12 col-md-4`}>
                  <img
                    className={`${styles.featureIcon} ${styles.goldStar}`}
                    src={trustScoreImg}
                    alt="Gold Star"
                  />
                  <h5 className={styles.featureHeading}>TRUST Scorecard</h5>
                  <p>How are guidelines assessed for Trustworthiness?</p>
                  <Link
                    className={styles.readMore}
                    to="/about-trust-scorecard"
                    aria-label="TRUST Scorecard"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {hasGuidelines && <RecentUpdates />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.oidc.user,
  previewMode: state.previewMode,
});

export default connect(mapStateToProps)(Home);
