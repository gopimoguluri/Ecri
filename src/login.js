import React from 'react';
import userManager from '../../utils/usermanager';
import styles from './login.module.scss';

class Login extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <div className={styles.loginBody}>
        <h3>Welcome to ECRI Guidelines !</h3>
        <p>You are not logged in. Please log in to continue.</p>
        <button onClick={e => this.onLoginButtonClick(e)}>Login with ECRI STS</button>
        
      </div>
    );
  }
}

export default Login;
