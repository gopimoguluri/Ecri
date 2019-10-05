import React from 'react';
import styles from './resetfilterbutton.module.scss';

const ResetFilterButton = ({ onClick }) => (
  <div className={styles.resetFilterButtonContainer}>
    <button
      name="resetfilters"
      type="button"
      className={styles.resetFilterButton}
      onClick={() => onClick()}
    >
      Reset Filters
    </button>
  </div>
);

export default ResetFilterButton;
