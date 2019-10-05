import React from 'react';
import LimitedText from '../../../LimitedText';
import ShowMoreContainer from '../../../ShowMoreContainer';
import styles from '../searchFilters.module.scss';

const ClinicalAreaSelector = ({
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
          {/*<LimitedText text={Title} maxchars={20} />*/}
          <span title={Title} className={styles.checkboxInnerTitle}>{Title}</span>
        </label>
      </div>
    </div>
    <span className={styles.filterItemAmount}>
      <a href="JavaScript:void(0);" onClick={() => onClick(Id, !selected)} title={`Filtered Items: ${count}`} aria-label={`Filtered Items: ${count}`}>
        ({count})
      </a>
    </span>
  </li>
);

const ClinicalAreasFilter = ({ clinicalAreas, onClinicalAreaFilterChange }) => (
  <dl className={styles.filter}>
    <dt className={styles.filterHeading}>Clinical Area</dt>
    <dd className={styles.filterBody}>
      <ul className={styles.filterList}>
        {clinicalAreas && (
          <ShowMoreContainer
            loadAllOnClick
            pageSize={5}
            childData={[...clinicalAreas].sort((a, b) => (a.key.Title < b.key.Title ? -1 : 1))}
            childMapFunc={ca => (
              <ClinicalAreaSelector
                {...ca}
                {...ca.key}
                onClick={onClinicalAreaFilterChange}
                key={ca.key.Id}
              />
            )}
          />
        )}
      </ul>
    </dd>
  </dl>
);

export default ClinicalAreasFilter;
