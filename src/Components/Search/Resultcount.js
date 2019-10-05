import React from 'react';
import styles from './resultcount.module.scss';

const ResultCount = ({ startIndex, endIndex, totalHits }) => (
  <div className={styles.searchResultListHeadCount}>
    {`(${totalHits === 0 ? 0 : startIndex + 1}-${Math.min(
      totalHits,
      endIndex + 1,
    )} of ${totalHits} Results)`}
  </div>
);

export default ResultCount;
