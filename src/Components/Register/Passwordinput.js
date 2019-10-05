import React from 'react';
import styles from '../register.module.scss';

class PasswordInput extends React.Component {
  render() {
    const {
      id, onChange, label, value,
    } = this.props;
    return (
      <React.Fragment>
        <label className={styles.formLabel} htmlFor={id}>
          {label}
        </label>
        <input
          ref={(i) => {
            this.inputRef = i;
          }}
          className={styles.formControl}
          type="password"
          id={id}
          required
          pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          value={value}
          onChange={e => onChange(e)}
        />
      </React.Fragment>
    );
  }
}

export default PasswordInput;
