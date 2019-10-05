import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ValidationMsg from '../ValidationMsg';
import { registrationAccessRequestCheck } from '../../../actions/registration';
import styles from '../register.module.scss';

class EmailCheckForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localEmailValue: props.emailValue,
      email: {
        validStatus: '',
        msgClassName: '',
        msg: '',
      },
      isDisabled: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.localEmailValue) {
      if (!checkingAccess) {
        checkAccess(localEmailValue);
      }
    }
  }

  handleInputChange(e) {
    const targetId = e.target.id;
    const targetValue = e.target.value;
    let validStatus;
    let stateObject;
    if (!targetValue) {
      // The value is empty, so show an error.
      stateObject = {
        [targetId]: {
          validStatus: 'isInvalid',
          msgClassName: 'invalidMsg',
          msg: 'Field cannot be empty',
        },
      };
      this.setState(prevState => stateObject);
      this.setState(prevState => ({ isDisabled: true }));
    } else if (targetValue.indexOf('@') !== -1) {
      stateObject = {
        [targetId]: {
          validStatus: 'isValid',
          msgClassName: 'ValidMsg',
          msg: '',
        },
      };
      this.setState(prevState => stateObject);
      this.setState(prevState => ({ isDisabled: false }));
    } else {
      stateObject = {
        [targetId]: {
          validStatus: 'isInvalid',
          msgClassName: 'invalidMsg',
          msg: 'Your email is invalid',
        },
      };
      this.setState(prevState => stateObject);
      this.setState(prevState => ({ isDisabled: true }));
    }
  }

  render() {
    const { checkingAccess, checkAccess } = this.props;
    const { localEmailValue, email } = this.state;
    return (
      <div>
        {/* <div className={`${styles.infoBox}`}>
          <p>Register your individual Guidelines Trust account and gain access to:</p>
          <ul className={styles.bulletList}>
            <li className={styles.bulletListItem}>Guidelines Trust member-only resources</li>
            <li className={styles.bulletListItem}>LOREM</li>
            <li className={styles.bulletListItem}>ECRI LOREM</li>
          </ul>
        </div> */}
        <div className="row start-xs center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <div className={styles.formControlGroup}>
              <label className={styles.formLabel} htmlFor="email">
                Email
              </label>
              <input
                className={`${styles.formControl} ${styles[email.validStatus]}`}
                id="email"
                type="email"
                value={localEmailValue}
                onBlur={e => this.handleInputChange(e)}
                onChange={(e) => {
                  if (!checkingAccess) {
                    this.setState({ localEmailValue: e.target.value });
                    this.setState({ isDisabled: false });
                  }
                }}
                onKeyPress={(e) => {
                  if (!checkingAccess && e.key === 'Enter') {
                    checkAccess(localEmailValue);
                  }
                }}
                disabled={checkingAccess}
              />
              {email.msg && <ValidationMsg msgClassName={email.msgClassName} msg={email.msg} />}
            </div>
            <button
              type="submit"
              className={`${styles.formSubmit} ${styles.email}`}
              onClick={() => {
                if (!checkingAccess) {
                  checkAccess(localEmailValue);
                }
              }}
              disabled={this.state.isDisabled || checkingAccess}
            >
              Register
            </button>
            {checkingAccess && <div>Please wait...</div>}
          </div>
        </div>
      </div>
    );
  }
}

EmailCheckForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  checkingAccess: PropTypes.bool.isRequired,
  checkAccess: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  checkAccess: email => dispatch(registrationAccessRequestCheck(email)),
});

const mapStateToProps = state => ({
  ...state.registration.userAccessCheck,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailCheckForm);
