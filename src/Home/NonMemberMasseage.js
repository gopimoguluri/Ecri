
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nonmembermessage.module.scss';
import homeStyles from '../home.module.scss';

const NonMemberMessage = ({ isLoggedIn }) => (
  <section className={`${homeStyles.contentSection} ${homeStyles.tertiary}`}>
      <div className="container">
        <div className="row between-md middle-xs middle-md">
          <div className={`${homeStyles.leftCol} col-xs-12 col-md-7`}>
            <h2 className={homeStyles.sectionHeading}>Register for free access to the <br /><strong>ECRI Guidelines Trust<sup>&trade;</sup></strong></h2>
          </div>
          <div className={`${homeStyles.rightCol} col-xs-12 col-md-4`}>
            {isLoggedIn ? (
              <div>
                Please <Link to="/complete-member-signup" title="Login" aria-label="Login">login</Link> if you would like to add
                Guidelines Trust to your existing ECRI membership
              </div>
            ) : (
              <div>
                <Link className={homeStyles.registerButton} to="/register" aria-label="Sign Up">Sign Up</Link>
                <p className={homeStyles.registerCaption}>Already have an ECRI Account?
                <br />Please <Link to="/complete-member-signup" title="Login" aria-label="Login">login</Link>.</p>
              </div>
            )}
          </div>
        </div>
      </div>
  </section>
);

export default NonMemberMessage;




