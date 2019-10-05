import React from 'react';
import LimitedText from '../../../LimitedText';
import ShowMoreContainer from '../../../ShowMoreContainer';
import styles from '../searchFilters.module.scss';

const InterventionSelector = ({
  Id, Title, selected, count, onClick,
}) => (
  <li key={Id} className={styles.filterItem}>
    <div className={styles.filterItemLabel}>
      <div className={styles.checkboxLabel}>
        <input
          type="checkbox"
          id={Id}
          name={Id}
          autoComplete="off"
          aria-labelledby="checkbox_Intervention"
          checked={selected}
          onClick={() => onClick(Id, !selected)}
        />
        <label className={styles.checkboxTitle} htmlFor={Id}>
          <span title={Title} className={styles.checkboxInnerTitle}>{Title}</span>
        </label>
      </div>
    </div>
    <span className={styles.filterItemAmount}>
      <a href="JavaScript:void(0);" onClick={() => onClick(Id, !selected)} title={`Filtered Items: ${count}}`} aria-label={`Filtered Items: ${count}}`}>
        ({count})
      </a>
    </span>
  </li>
);

const InterventionsFilter = ({ interventions, onInterventionFilterChange }) => (
  <dl className={styles.filter}>
    <dt className={styles.filterHeading}>Intervention</dt>
    <dd className={styles.filterBody}>
      <ul className={styles.filterList}>
        {interventions && (
          <ShowMoreContainer
            loadAllOnClick
            pageSize={5}
            childData={[...interventions].sort((a, b) => (a.key.Title < b.key.Title ? -1 : 1))}
            childMapFunc={ca => (
              <InterventionSelector
                {...ca}
                {...ca.key}
                onClick={onInterventionFilterChange}
                key={ca.key.Id}
              />
            )}
          />
        )}
      </ul>
    </dd>
  </dl>
);

export default InterventionsFilter;
