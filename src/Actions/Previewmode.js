import { verifyPreviewAccess } from '../api';

const previewModeDenied = () => ({
  type: 'PREVIEW_MODE_ACCESS_DENIED',
});

const previewModeGranted = () => ({
  type: 'PREVIEW_MODE_ACCESS_GRANTED',
});

const togglePreviewMode = previewStatus => (dispatch) => {
  dispatch({
    type: 'PREVIEW_MODE_TOGGLE',
    isEnabled: previewStatus,
  });
};

const checkPreviewModeAccess = user => (dispatch) => {
  dispatch({
    type: 'PREVIEW_MODE_CHECK_ACCESS',
  });

  if (!user || !user.access_token) {
    dispatch(previewModeDenied());
  } else {
    verifyPreviewAccess(user.access_token)
      .then((resp) => {
        if (resp.data === true) {
          dispatch(previewModeGranted());
        } else {
          dispatch(previewModeDenied());
        }
      })
      .catch(() => {
        dispatch(previewModeDenied());
      });
  }
};

export { togglePreviewMode, checkPreviewModeAccess };
