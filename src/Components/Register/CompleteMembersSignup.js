import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyExistingUser } from '../../../actions/registration';
import userManager from '../../../utils/usermanager';
import styles from '../register.module.scss';

const CompleteMemberSignUp = ({
  verificationInProgress,
  verificationCompleted,
  verificationErrorOccured,
  loginRefreshRequired,
  processMembershipAdd,
  user,
}) => {
  if (verificationCompleted) {
    userManager.signinRedirect({ state: { pathname: '/new-user-redirect' } });
    // userManager.removeUser();
    return <Redirect to="/new-user-redirect" />;
  }

  if (!verificationInProgress) {
    processMembershipAdd(user.access_token);
  }

  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div>
            <h2 className={styles.pageTitle}>Register Account</h2>
          </div>
          <div className="row center-xs center-md">
            <div className="col-xs-12 col-md-8 col-lg-8">
              <div className="row start-xs center-md">
                <div className={`${styles.infoBox}`}>Please wait while your account is updated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  processMembershipAdd: token => dispatch(verifyExistingUser(token)),
});

const mapStateToProps = state => ({
  ...state.registration.memberVerification,
  user: state.oidc.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompleteMemberSignUp);
