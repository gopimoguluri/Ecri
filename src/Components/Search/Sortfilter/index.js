import React from 'react';
import styles from './sortfilter.module.scss';

const SearchFilter = ({ onChange, selectedValue }) => (
  <div>
    Sort by:
    <select className={styles.sortSelector} onChange={e => onChange(e)}>
      <option value="relevance" selected={selectedValue === 'relevance'}>
        Relevance
      </option>
      <option value="date" selected={selectedValue === 'date'}>
        Publication Year
      </option>
    </select>
  </div>
);

export default SearchFilter;
