import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Checkbox from '../Checkbox';
import PropTypes from 'prop-types';
import trustSealIcon from '../../assets/images/trust-seal-no-label-link.svg';
import trustSealIconDisabled from '../../assets/images/trust-seal-no-label-disabled.svg';
import styles from './briefSearchResultItem.module.scss';

const BriefSearchResultItem = ({
  brief,
  history,
  maxScore,
  isSelected,
  checkboxChange,
}) => {
  // Check if guid exists in checkbox data, if so, enable this checkbox.
  /*
  let storedCheckbox = {};
  if (checkboxData !== undefined) {
    storedCheckbox = checkboxData.find((checkbox) => {
      if (checkbox.id === brief.uniqueId) {
        return checkbox;
      }
    });
  } else {
    console.log("CheckboxData is undefined!");
  }*/

  return (
    <div className={styles.searchItem}>
      <div className={styles.col1}>
        <Checkbox
          guid={brief.uniqueId}
          label={brief.guidelineTitle}
          isSelected={isSelected}
          onCheckboxChange={checkboxChange}
        />
        {/*
        <div className={styles.checkboxLabel}>
          <input
            type="checkbox"
            id=""
            name=""
            autoComplete="off"
            aria-labelledby="checkbox_PublicationYear"
            checked=""
            onClick=""
          />
          <label className={styles.checkboxTitle} htmlFor="">
            <span title="" className={`${styles.checkboxInnerTitle} checkbox-inner-title`}>
            </span>
          </label>
        </div> 
        */}
      </div>
      <div className={styles.col2}>
        <h6 className={styles.searchItemTitle} title={brief.guidelineTitle}>
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
        <div className={styles.searchItemMeta}>
          <span className={styles.searchItemGuid}>
            Guideline ID: {brief.uniqueId}
          </span>
          <span className={styles.searchItemPubDate}>
            {brief.publicationReaffirmationDate}
          </span>
          {/*Guide-196 -may need to add back later-- {brief.score && (
            <span className={styles.searchItemRelevancy}>
              Relevancy Rank: {maxScore > 0 ? Math.round((10000 * brief.score) / maxScore) / 100 : 0}%
            </span>
          )} */}
        </div>
        <ul className={styles.searchItemDeveloper}>
          {brief.organizations != ''
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
        <ul className={styles.links}>
          <li>
            {brief.meetsRevisedInclusionCriteria ? (
              <Link
                to={{
                  pathname: `/brief/${brief.uniqueId}`,
                  state: history.location,
                }}
                aria-label="Guideline Brief"
              >
                <i className="fa fa-file-alt" />
                <span className={styles.linkLabel} title="Guideline Brief">
                  Guideline Brief
                </span>
              </Link>
            ) : (
              <div>
                <div
                  className={styles.disabledLink}
                  data-tip
                  data-for="inclusionBrief"
                >
                  <i className="fa fa-file-alt" />
                  <span className={styles.linkLabel}>Guideline Brief</span>
                </div>
                <ReactTooltip
                  type="info"
                  className={styles.tooltip}
                  id="inclusionBrief"
                  multiline
                >
                  <span>
                    A Guideline Brief has not been created for this guideline
                    because it does not meet
                    <br />
                    ECRI’s Inclusion Criteria or we have not received permission
                    from the guideline
                    <br />
                    developer.
                  </span>
                </ReactTooltip>
              </div>
            )}
          </li>
          <li>
            {brief.meetsRevisedInclusionCriteria ? (
              <Link
                to={{
                  pathname: `/brief/trustscore/${brief.uniqueId}/`,
                  state: history.location,
                }}
                aria-label="TRUST Scorecard"
              >
                <img className={styles.trustSealIcon} src={trustSealIcon} />
                <span className={styles.linkLabel} title="TRUST Scorecard">
                  TRUST Scorecard
                </span>
              </Link>
            ) : (
              <div>
                <div
                  className={styles.disabledLink}
                  data-tip
                  data-for="inclusionScoreCard"
                >
                  <img
                    className={styles.trustSealIcon}
                    src={trustSealIconDisabled}
                  />
                  <span className={styles.linkLabel} title="TRUST Scorecard">
                    TRUST Scorecard
                  </span>
                </div>
                <ReactTooltip
                  type="info"
                  className={styles.tooltip}
                  id="inclusionScoreCard"
                  multiline
                >
                  <span>
                    A TRUST Scorecard has not been created for this guideline
                    because it does not meet
                    <br />
                    ECRI’s Inclusion Criteria or we have not received permission
                    from the guideline
                    <br />
                    developer.
                  </span>
                </ReactTooltip>
              </div>
            )}
          </li>
          <li>
            <a
              href={brief.accessTheGuideline}
              target="_blank"
              title="View original Guideline"
              arial-label="View original Guideline"
            >
              <i className="fa fa-external-link-square-alt" />{' '}
              <span className={styles.linkLabel}>View original guideline</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
BriefSearchResultItem.propTypes = {
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
  maxScore: PropTypes.number,
};

BriefSearchResultItem.defaultProps = {
  history: {
    location: {
      hash: '',
      key: '1',
      pathname: '/',
      search: '',
    },
  },
  maxScore: 0,
};

const mapStateToProps = state => ({
  user: state.oidc.user,
});

export default withRouter(connect(mapStateToProps)(BriefSearchResultItem));
