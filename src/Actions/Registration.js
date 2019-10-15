import {
    requestAccess, submitNewUser, registerMember, confirmNewUser,
  } from '../api';
  
  const requiredActionIsLogin = 1;
  const registrationSucceeded = 3;
  const hasGuidelinesAlready = 5;
  const errorOccured = 6;
  
  const registrationAccessRequestCheckStarted = emailValue => ({
    type: 'REGISTRATION_ACCESS_REQUEST_STARTED',
    emailValue,
  });
  
  const registrationAcessRequestCompleted = isExistingUser => ({
    type: 'REGISTRATION_ACCESS_REQUEST_COMPLETED',
    isExistingUser,
    isNewUser: !isExistingUser,
  });
  
  const registrationAccessRequestCheck = emailValue => (dispatch) => {
    dispatch(registrationAccessRequestCheckStarted(emailValue));
    requestAccess(emailValue)
      .then((resp) => {
        const { data } = resp;
        // check if error...
        dispatch(registrationAcessRequestCompleted(data.requiredAction === requiredActionIsLogin));
      })
      .catch(err => console.log(err));
  };
  
  const submitNewUserInProgress = () => ({
    type: 'REGISTRATION_NEW_USER_SUBMITTING',
  });
  
  const submitNewUserSucceeded = () => ({
    type: 'REGISTRATION_NEW_USER_SUBMIT_SUCCESS',
  });
  
  const submitNewUserFailedFatal = errMessage => ({
    type: 'REGISTRATION_NEW_USER_SUBMIT_FAILED_FATAL',
    errorMessage: errMessage,
  });
  
  const submitNewUserFailed = errMessage => ({
    type: 'REGISTRATION_NEW_USER_SUBMIT_FAILED',
    errorMessage: errMessage,
  });
  
  const submitNewUserData = newUserInfo => (dispatch) => {
    dispatch(submitNewUserInProgress());
  
    submitNewUser(newUserInfo)
      .then((resp) => {
        const { errorMessage, requiredAction } = resp.data;
  
        switch (requiredAction) {
          case registrationSucceeded: {
            dispatch(submitNewUserSucceeded());
            break;
          }
          case requiredActionIsLogin: {
            // edge case where the user became a member through some other mechanism in between,
            // should rarely if ever be hit in practice
            dispatch(registrationAcessRequestCompleted(true));
            break;
          }
          case errorOccured: {
            dispatch(
              submitNewUserFailed(
                errorMessage || 'There was an error submitting your registration.  Please try again.',
              ),
            );
            break;
          }
          default: {
            dispatch(
              submitNewUserFailed(
                'There was an error submitting your registration.  Please try again',
              ),
            );
          }
        }
      })
      .catch(() => dispatch(
        submitNewUserFailedFatal(
          'There was an error submitting your registration.  Please try again',
        ),
      ));
  };
  
  const verifyExistingUserInProgress = () => ({
    type: 'REGISTRATION_EXISTING_USER_STARTED',
  });
  
  const notifyUserHasGuidelinesAlready = () => ({
    type: 'REGISTRATION_EXISTING_USER_HAS_GUIDELINES',
  });
  
  const errorVerifyingExistingUser = errMsg => ({
    type: 'REGISTRATION_EXISTING_USER_ERROR',
    errorMessage: errMsg,
  });
  
  const existingUserGuidelinesAddSuccess = () => ({
    type: 'REGISTRATION_EXISTING_USER_SUCCESS',
  });
  
  const newUserConfirmationStarted = () => ({
    type: 'REGISTRATION_NEW_USER_CONFIRM_STARTED',
  });
  
  const newUserConfirmationSuccess = () => ({
    type: 'REGISTRATION_NEW_USER_CONFIRM_SUCCESS',
  });
  
  const newUserConfirmError = errorMessage => ({
    type: 'REGISTRATION_NEW_USER_CONFIRM_ERROR',
    errorMessage,
  });
  
  const verifyExistingUser = token => (dispatch) => {
    dispatch(verifyExistingUserInProgress());
  
    registerMember(token)
      .then((resp) => {
        const { errorMessage, requiredAction } = resp.data;
        switch (requiredAction) {
          case hasGuidelinesAlready: {
            dispatch(notifyUserHasGuidelinesAlready());
            break;
          }
          case errorOccured: {
            dispatch(errorVerifyingExistingUser(errorMessage));
            break;
          }
          case registrationSucceeded: {
            dispatch(existingUserGuidelinesAddSuccess());
            break;
          }
          default:
            dispatch(
              errorVerifyingExistingUser(
                'An error occured while validation your membership.  Please try again.',
              ),
            );
            break;
        }
      })
      .catch(() => {
        dispatch(
          errorVerifyingExistingUser(
            'An error occured while validation your membership.  Please try again.',
          ),
        );
      });
  };
  
  const verifyNewUser = confirmationData => (dispatch) => {
    dispatch(newUserConfirmationStarted());
  
    confirmNewUser(confirmationData)
      .then((resp) => {
        const { errorMessage, requiredAction } = resp.data;
        switch (requiredAction) {
          case registrationSucceeded: {
            dispatch(newUserConfirmationSuccess());
            break;
          }
          case errorOccured: {
            dispatch(newUserConfirmError(errorMessage));
            break;
          }
          default:
            dispatch(
              newUserConfirmError(
                'There was a problem completing your registration.  Please try again.',
              ),
            );
            break;
        }
      })
      .catch(() => dispatch(
        newUserConfirmError('There was a problem completing your registration.  Please try again.'),
      ));
  };
  
  export {
    registrationAccessRequestCheck, submitNewUserData, verifyExistingUser, verifyNewUser,
  };
  