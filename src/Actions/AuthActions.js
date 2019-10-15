import { updateLastLoginDate, fetchLatestFdaNotices } from '../api';
import { fetchFdaSucceeded } from '../store/actions/fdaActions';
import notificationBarActions from '../store/actions/notificationBarAction';

const updateLastLoginDateRequested = () => ({
  type: 'UPDATE_LAST_LOGIN_DATE_REQUESTED',
});

const updateLastLoginDateSuccess = (lastLoginDate, previousLoginDate) => ({
  type: 'UPDATE_LAST_LOGIN_DATE_SUCCESS',
  payload: {
    lastLoginDate: lastLoginDate,
    previousLoginDate: previousLoginDate,
  },
});

const updateLastLoginDateFailure = error => ({
  type: 'UPDATE_LAST_LOGIN_DATE_FAILURE',
  payload: {
    error: error,
  },
});

const actionCreators = {
  updateLastLoginDate: user => dispatch => {
    dispatch(updateLastLoginDateRequested);

    if (user && user.access_token) {
      updateLastLoginDate(user)
        .then(response => {
          dispatch(
            updateLastLoginDateSuccess(
              response.data.lastLoginDate,
              response.data.previousLoginDate
            )
          );

          fetchLatestFdaNotices(
            user,
            0,
            10,
            response.data.previousLoginDate
          ).then(fdaResponse => {
            dispatch(fetchFdaSucceeded(fdaResponse.data.payload));
            if (fdaResponse.data.payload.fdaNotices.length > 0) {
              dispatch(
                notificationBarActions.displayNotification(
                  `${fdaResponse.data.payload.fdaNotices.length}
                  Alerts have been posted since your last login. ${fdaResponse.data.payload.summaryOfDrugsInvolved} <a href="/fda-notices">Learn more</a>`,
                  'error'
                )
              );
            }
          });
        })

        .catch(err => {
          dispatch(updateLastLoginDateFailure(err));
          console.log(err);
        });
    } else {
      dispatch(updateLastLoginDateFailure('User is not authenticated!'));
    }
  },
};

export default actionCreators;
