import React from 'react';
import styles from './checkbox.module.scss';

const Checkbox = ({ cxtClassName, label, guid, isSelected, onCheckboxChange }) => {
  return (
    <div className={`${cxtClassName ? styles[cxtClassName] : ''} ${styles.checkboxLabel}`}>
      <input
        className={`${styles.checkbox}`}
        type="checkbox"
        id={`${guid}`}
        name={`${label ? label : guid}`}
        autoComplete="off"
        aria-labelledby={`${label ? label : guid}`}
        checked={isSelected}
        onClick={(e) => {
            return onCheckboxChange(e)
          } 
        }
      />
      <label className={styles.checkboxTitle} htmlFor={`${guid}`}>
        {/*<LimitedText text={patientAge.key.Title} maxchars={20} />*/}
        <span title="" className={`${styles.checkboxInnerTitle}`}>
        </span>
      </label>
    </div>
  )
}

export default Checkbox;