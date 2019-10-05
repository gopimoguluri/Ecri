import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PasswordInput from '../PasswordInput';
import { verifyNewUser } from '../../../actions/registration';
import styles from '../register.module.scss';

class NewUserVerificationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      passwordIsValid: true,
      hideErrorBox: true,
    };
  }

  handleSubmit() {
    const { password, passwordConfirm, passwordIsValid } = this.state;
    const { crmId, onSubmit } = this.props;

    if (password === '' || !passwordIsValid || password !== passwordConfirm) {
      this.setState({ hideErrorBox: false, wasValidated: true });
    }
    onSubmit({ crmId, password, passwordConfirm });
  }

  render() {
    const {
      password,
      passwordConfirm,
      passwordIsValid,
      hideErrorBox,
    } = this.state;
    return (
      <form
        className={`${styles.registerForm} ${!passwordIsValid &&
          styles.wasValidated}`}
        noValidate
        onSubmit={() => this.handleSubmit()}
      >
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <PasswordInput
              key="password"
              id="password"
              label="Password"
              value={password}
              onChange={e =>
                this.setState({
                  password: e.target.value,
                  passwordIsValid: e.target.checkValidity(),
                })
              }
            />
          </div>
        </div>
        <div className="row center-md">
          <div className="col-xs-12 col-md-6 col-lg-6">
            <PasswordInput
              key="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              value={passwordConfirm}
              onChange={e => this.setState({ passwordConfirm: e.target.value })}
            />
          </div>
        </div>
        <div className="row center-xs center-md">
          <div className="col-xs-12 col-md-6">
            <div
              className={`${styles.infoBox} ${styles.error} ${
                !passwordIsValid || password !== passwordConfirm
                  ? styles.show
                  : styles.hide
              }`}
            >
              {!passwordIsValid && (
                <p>
                  Your password does not meet the minimum standards. It must be
                  at least 8 characters long and contain at least 2 of the
                  following: Uppercase letter, Number, or Special Character
                  (such as !, $, #, %).
                </p>
              )}
              {password !== passwordConfirm && <p>Passwords do not match</p>}
            </div>
          </div>
        </div>
        <div className="row center-xs center-md">
          <div className=" col-xs-12 col-md-6">
            <button
              type="submit"
              className={styles.formSubmit}
              disabled={
                password === '' ||
                !passwordIsValid ||
                password !== passwordConfirm
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const ConfirmNewUser = ({
  location,
  verificationInProgress,
  verificationCompleted,
  verificationErrorOccured,
  errorMessage,
  submitVerificationData,
}) => {
  if (verificationCompleted) {
    return <Redirect to="/new-user-redirect" />;
  }
  const { search } = location;
  if (search && search !== '') {
    const qsParsed = qs.parse(search, { ignoreQueryPrefix: true });
    if (qsParsed.key) {
      return (
        <div className="page-content">
          <div className="container">
            <div>
              <h2 className={styles.pageTitle}>Complete Your Registration</h2>
            </div>
            <div className="row center-xs center-md">
              <div className="col-xs-12 col-md-8 col-lg-8">
                {verificationInProgress ? (
                  <div className={`${styles.infoBox}`}>
                    Please wait while we process your request
                  </div>
                ) : (
                  <div>
                    {verificationErrorOccured && (
                      <div className={`${styles.infoBox} ${styles.error}`}>
                        {errorMessage}
                      </div>
                    )}
                    {!verificationErrorOccured && (
                      <div className={styles.infoBox}>
                        Please create a password for your account. It must be at
                        least 8 characters long and contain at least 2 of the
                        following: Uppercase letter, Number, or Special
                        Character (such as !, $, #, %).
                      </div>
                    )}

                    <NewUserVerificationForm
                      crmId={qsParsed.key}
                      onSubmit={confirmData =>
                        submitVerificationData(confirmData)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <Redirect to="/new-user-redirect" />;
};

const mapDispatchToProps = dispatch => ({
  submitVerificationData: userData => dispatch(verifyNewUser(userData)),
});

const mapStateToProps = state => ({
  ...state.registration.newUserVerification,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmNewUser)
);
