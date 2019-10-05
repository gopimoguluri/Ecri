import React from 'react';
import styles from '../searchFilters.module.scss';

const InclusionCriteriaFilter = ({ inclusions, onInclusionCriteriaChange }) => {
  const meetsCrit = inclusions.find(x => x.key.Id === 'true') || {
    key: { Id: 'true', Title: '' },
    count: 0,
    selected: false,
  };
  const doesNotMeetCrit = inclusions.find(x => x.key.Id === 'false') || {
    key: { Id: 'false', Title: '' },
    count: 0,
    selected: false,
  };
  return (
    <dl className={styles.filter}>
      <dt className={styles.filterHeading}>Show Guidelines</dt>
      <dd className={styles.filterBody}>
        <ul className={styles.filterList}>
          <li key="meets-crit" className={styles.filterItem}>
            <div className={styles.filterItemLabel}>
              <div className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="meets-crit"
                  name="meets-crit"
                  autoComplete="off"
                  aria-labelledby="checkbox_InclusionMeetsCrit"
                  checked={meetsCrit.selected}
                  onClick={() => onInclusionCriteriaChange('true', !meetsCrit.selected)}
                />
                <label className={styles.checkboxTitle} htmlFor="meets-crit">
                  <span
                    title="Only Guidelines with Briefs/Scorecards"
                    className={styles.checkboxInnerTitle}
                  >
                    Only Guidelines with Briefs/Scorecards
                  </span>
                </label>
              </div>
            </div>
            <span className={styles.filterItemAmount}>
              <a href="JavaScript:void(0);" title={`Filtered Items: ${meetsCrit.count}`} aria-label={`Filtered Items: ${meetsCrit.count}`}>({meetsCrit.count})</a>
            </span>
          </li>
          <li key="meets-crit" className={styles.filterItem}>
            <div className={styles.filterItemLabel}>
              <div className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="not-meets-crit"
                  name="not-meets-crit"
                  autoComplete="off"
                  aria-labelledby="checkbox_InclusionDoesNotMeetsCrit"
                  checked={doesNotMeetCrit.selected}
                  onClick={() => onInclusionCriteriaChange('false', !doesNotMeetCrit.selected)}
                />
                <label className={styles.checkboxTitle} htmlFor="not-meets-crit">
                  <span
                    title="Only Guidelines without Briefs/Scorecards"
                  >
                    Only Guidelines without Briefs/Scorecards
                  </span>
                </label>
              </div>
            </div>
            <span className={styles.filterItemAmount}>
              <a href="JavaScript:void(0);" title={`Filtered Items: ${doesNotMeetCrit.count}`} aria-label={`Filtered Items: ${doesNotMeetCrit.count}`}>({doesNotMeetCrit.count})</a>
            </span>
          </li>
        </ul>
      </dd>
    </dl>
  );
};

export default InclusionCriteriaFilter;
