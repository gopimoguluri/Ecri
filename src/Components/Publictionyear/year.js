import React from 'react';
import ShowMoreContainer from '../../../ShowMoreContainer';
import styles from '../searchFilters.module.scss';

const PublicationYearSelector = ({
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
          aria-labelledby="checkbox_PublicationYear"
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

const PublicationYearFilter = ({ pubYears, onPublicationYearChange }) => (
  <dl className={styles.filter}>
    <dt className={styles.filterHeading}>Publication Year</dt>
    <dd className={styles.filterBody}>
      <ul className={styles.filterList}>
        {pubYears && (
          <ShowMoreContainer
            loadAllOnClick
            pageSize={5}
            childData={Object.keys(pubYears).sort((a, b) => b - a)}
            childMapFunc={o => (
              <PublicationYearSelector
                key={o}
                Id={o}
                Title={o}
                selected={pubYears[o].selected}
                count={pubYears[o].value}
                onClick={onPublicationYearChange}
              />
            )}
          />
        )}
      </ul>
    </dd>
  </dl>
);

export default PublicationYearFilter;
