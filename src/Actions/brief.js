import { fetchRecentUpdates, fetchBrief as getBrief } from '../api';
import { deepMap } from '../utils/helpers';

const fetchBriefStarted = () => ({
  type: 'FETCH_BRIEF_STARTED',
});

const fetchBriefSucceeded = brief => ({
  type: 'FETCH_BRIEF_SUCCEEDED',
  current: brief,
});

const fetchBriefFailed = err => ({
  type: 'FETCH_BRIEF_FAILED',
});
// const fetchBriefFailed = () => {};

const fetchRecentBriefsStarted = () => ({
  type: 'FETCH_RECENT_UPDATES_STARTED',
});

const fetchRecentBriefsSucceeded = briefs => ({
  type: 'FETCH_RECENT_UPDATES_SUCCEEDED',
  recent: briefs,
});

const fetchRecentBriefsFailed = () => ({
  type: 'FETCH_RECENT_UPDATES_FAILED',
});

const fetchBrief = (token, id, usePreview) => (dispatch) => {
  dispatch(fetchBriefStarted());

  getBrief(id, token, usePreview)
    .then((resp) => {
      dispatch(fetchBriefSucceeded(deepMap(resp.data, val => (val == null ? '' : val))));
    })
    .catch((err) => {
      dispatch(fetchBriefFailed(err));
    });
};

const fetchRecentBriefs = token => (dispatch) => {
  dispatch(fetchRecentBriefsStarted());

  fetchRecentUpdates(token, 0, 5)
    .then((resp) => {
      // don't think we need deepmap here, but not ready to get rid of it
      dispatch(fetchRecentBriefsSucceeded(deepMap(resp.data.hits, val => (val == null ? '' : val))));
    })
    .catch((err) => {
      dispatch(fetchRecentBriefsFailed());
      // send to some logging system?
      console.error(err);
    });
};

export { fetchRecentBriefs, fetchBrief };
