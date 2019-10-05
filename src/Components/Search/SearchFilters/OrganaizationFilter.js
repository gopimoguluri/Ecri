import React from 'react';
import ShowMoreContainer from '../../../ShowMoreContainer';
import Shiitake from 'shiitake';
import styles from '../searchFilters.module.scss';

const OrganizationSelector = ({
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
          <span title={Title} className={styles.checkboxInnerTitle}>
            <Shiitake lines={2} throttleRate={200} className={styles.checkboxInnerTitle} tagName="span">
              {Title}
            </Shiitake>
          </span>
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

const OrganizationsFilter = ({ orgs, onOrganizationFilterChange }) => (
  <dl className={styles.filter}>
    <dt className={styles.filterHeading}>Organization</dt>
    <dd className={styles.filterBody}>
      <ul className={styles.filterList}>
        {orgs && (
          <ShowMoreContainer
            loadAllOnClick
            pageSize={5}
            childData={[...orgs]
              .filter(x => x.key.Title !== '')
              .sort((a, b) => (a.key.Title < b.key.Title ? -1 : 1))}
            childMapFunc={o => (
              <OrganizationSelector
                {...o}
                {...o.key}
                onClick={onOrganizationFilterChange}
                key={o.key.Id}
              />
            )}
          />
        )}
      </ul>
    </dd>
  </dl>
);

export default OrganizationsFilter;
