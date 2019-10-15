const initialState = {
    userAccessCheck: {
      emailValue: '',
      checkingAccess: false,
      isExistingUser: false,
      isNewUser: false,
    },
    signUp: {
      submittingData: false,
      submissionCompleted: false,
      isFatalError: false,
      errorMessage: '',
    },
    memberVerification: {
      verificationInProgress: false,
      verificationCompleted: false,
      verificationErrorOccured: false,
      loginRefreshRequired: false,
    },
    newUserVerification: {
      verificationInProgress: false,
      verificationCompleted: false,
      verificationErrorOccured: false,
      errorMessage: '',
    },
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTRATION_NEW_USER_CONFIRM_SUCCESS': {
        return {
          ...state,
          newUserVerification: {
            verificationInProgress: false,
            verificationCompleted: true,
            verificationErrorOccured: false,
            errorMessage: '',
          },
        };
      }
      case 'REGISTRATION_NEW_USER_CONFIRM_ERROR': {
        return {
          ...state,
          newUserVerification: {
            verificationInProgress: false,
            verificationCompleted: false,
            verificationErrorOccured: true,
            errorMessage: action.errorMessage,
          },
        };
      }
      case 'REGISTRATION_NEW_USER_CONFIRM_STARTED': {
        return {
          ...state,
          newUserVerification: {
            verificationInProgress: true,
            verificationCompleted: false,
            verificationErrorOccured: false,
            errorMessage: '',
          },
        };
      }
      case 'REGISTRATION_EXISTING_USER_STARTED': {
        return {
          ...state,
          memberVerification: {
            verificationInProgress: true,
            verificationCompleted: false,
            verificationErrorOccured: false,
            loginRefreshRequired: false,
          },
        };
      }
      case 'REGISTRATION_EXISTING_USER_HAS_GUIDELINES': {
        return {
          ...state,
          memberVerification: {
            verificationInProgress: false,
            verificationCompleted: true,
            verificationErrorOccured: false,
            loginRefreshRequired: false,
          },
        };
      }
      case 'REGISTRATION_EXISTING_USER_SUCCESS': {
        return {
          ...state,
          memberVerification: {
            verificationInProgress: false,
            verificationCompleted: true,
            verificationErrorOccured: false,
            loginRefreshRequired: true,
          },
        };
      }
      case 'REGISTRATION_ACCESS_REQUEST_STARTED': {
        return {
          ...state,
          userAccessCheck: {
            ...state.userAccessCheck,
            emailValue: action.emailValue,
            isExistingUser: false,
            isNewUser: false,
            checkingAccess: true,
          },
        };
      }
      case 'REGISTRATION_ACCESS_REQUEST_COMPLETED': {
        return {
          ...state,
          userAccessCheck: {
            ...state.userAccessCheck,
            isExistingUser: action.isExistingUser,
            isNewUser: action.isNewUser,
            checkingAccess: false,
          },
        };
      }
      case 'REGISTRATION_NEW_USER_SUBMITTING': {
        return {
          ...state,
          signUp: {
            submittingData: true,
            submissionCompleted: false,
            errorMessage: '',
            isFatalError: false,
          },
        };
      }
      case 'REGISTRATION_NEW_USER_SUBMIT_SUCCESS': {
        return {
          ...state,
          signUp: {
            submittingData: false,
            submissionCompleted: true,
            errorMessage: '',
            isFatalError: false,
          },
        };
      }
      case 'REGISTRATION_NEW_USER_SUBMIT_FAILED': {
        return {
          ...state,
          signUp: {
            submittingData: false,
            submissionCompleted: false,
            errorMessage: action.errorMessage,
            isFatalError: false,
          },
        };
      }
      case 'REGISTRATION_NEW_USER_SUBMIT_FAILED_FATAL': {
        return {
          ...state,
          signUp: {
            submittingData: false,
            submissionCompleted: false,
            errorMessage: action.errorMessage,
            isFatalError: true,
          },
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  