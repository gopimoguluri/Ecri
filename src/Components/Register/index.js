import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NewUserForm from './NewUserForm';
import EmailCheckForm from './EmailCheckForm';
import styles from './register.module.scss';

const Register = (props) => {
  const { user, registration } = props;
  const { userAccessCheck } = registration;
  const isLoggedIn = user && !user.expired;

  // if logged in or we have identified as an existing user, redirect to the completion component
  // this will take care of either adding guidelines via mauth in the backend
  // or if the user has guidelines, we just redirect them back to home
  if (isLoggedIn || userAccessCheck.isExistingUser) {
    return <Redirect to="/complete-member-signup" />;
  }

  // if we make it here, the user is either not logged on (so we don't know who they are)
  // or we have identified that it is a non-member who needs to submit more info
  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div>
            <h2 className={styles.pageTitle}>Register for free access to the ECRI Guidelines Trust<sup>&trade;</sup></h2>
          </div>
          <div className="row center-xs center-md">
            <div className="col-xs-12 col-md-8 col-lg-8">
              {userAccessCheck.isNewUser ? (
                <NewUserForm email={userAccessCheck.emailValue} />
              ) : (
                <EmailCheckForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.oidc.user,
  registration: state.registration,
});

export default connect(mapStateToProps)(Register);
