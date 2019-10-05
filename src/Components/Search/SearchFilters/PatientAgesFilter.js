import React from 'react';
import LimitedText from '../../../LimitedText';
import Shiitake from 'shiitake';
import styles from '../searchFilters.module.scss';

const patientAgeOrderMap = {
  'Infant, Newborn (to 1 month)': 1,
  'Infant (1 to 23 months)': 2,
  'Child (2 to 12 years)': 3,
  'Adolescent (13 to 18 years)': 4,
  'Adult (19 to 44 years)': 5,
  'Middle Age (45 to 64 years)': 6,
  'Aged (65 to 79 years)': 7,
  'Aged, 80 and over': 8,
  'Not stated': 9,
};

const PatientAgesFilter = ({ patientAges, onPatientAgeFilterChange }) => (
  <dl className={styles.filter}>
    <dt className={styles.filterHeading}>Patient Age</dt>
    <dd className={styles.filterBody}>
      <ul className={styles.filterList}>
        {patientAges
          && [...patientAges]
            .sort(
              (a, b) => patientAgeOrderMap[a.key.Title.trim()] - patientAgeOrderMap[b.key.Title.trim()],
            )
            .map(patientAge => (
              <li key={patientAge.key.Id} className={styles.filterItem}>
                <div className={styles.filterItemLabel}>
                  <div className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      id={patientAge.key.Id}
                      name={patientAge.key.Id}
                      autoComplete="off"
                      aria-labelledby="checkbox_PublicationYear"
                      checked={patientAge.selected}
                      onClick={() => onPatientAgeFilterChange(patientAge.key.Id, !patientAge.selected)
                      }
                    />
                    <label className={styles.checkboxTitle} htmlFor={patientAge.key.Id}>
                      {/*<LimitedText text={patientAge.key.Title} maxchars={20} />*/}
                      <span title={patientAge.key.Title} className={styles.checkboxInnerTitle}>
                        <Shiitake lines={2} throttleRate={200} tagName="span">
                          {patientAge.key.Title}
                        </Shiitake>
                      </span>
                    </label>
                  </div>
                </div>
                <span className={styles.filterItemAmount}>
                  <a
                    href="JavaScript:void(0);"
                    onClick={() => onPatientAgeFilterChange(patientAge.key.Id, !patientAge.selected)
                    }
                  >
                    ({patientAge.count})
                  </a>
                </span>
              </li>
            ))}
      </ul>
    </dd>
  </dl>
);

export default PatientAgesFilter;
