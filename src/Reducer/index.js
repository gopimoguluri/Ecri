import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import breadCrumbReducer from './breadcrumb';
import briefReducer from './briefs';
import briefSelections from './briefSelections';
import previewModeReducer from './previewmode';
import registrationReducer from './registration';
import searchReducer from './search';
import exportReducer from './exportBriefsReducer';
import fdaReducer from '../store/reducers/fdaReducer';
import authReducer from './authReducer';
import notificationBarReducer from '../store/reducers/notificationBarReducer';

const reducer = combineReducers({
  oidc: oidcReducer,
  briefs: briefReducer,
  previewMode: previewModeReducer,
  registration: registrationReducer,
  breadCrumbs: breadCrumbReducer,
  search: searchReducer,
  briefSelections: briefSelections,
  exportBriefs: exportReducer,
  auth: authReducer,
  fda: fdaReducer,
  notificationBar: notificationBarReducer,
});

export default reducer;
