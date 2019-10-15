import '@fortawesome/fontawesome/styles.css';
import 'reset-css';
import 'typeface-chivo/index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Root from '../components/Root';
import SnackbarNotify from '../components/SnackbarNotify';
import ScrollToTop from '../components/ScrollToTop';
import AnalyticsWrapper from '../components/AnalyticsWrapper';
import BreadCrumbTracker from '../components/BreadCrumbTracker';
//import { ThemeProvider } from '@material-ui/styles';
import { checkPreviewModeAccess, togglePreviewMode } from '../actions/previewmode';

const theme = {};

const App = props => (
  //<ThemeProvider theme={theme}>
    <ScrollToTop>
      <AnalyticsWrapper>
        <BreadCrumbTracker>
          <Root {...props} />
        </BreadCrumbTracker>
      </AnalyticsWrapper>
      <SnackbarNotify />
    </ScrollToTop>
  //</ThemeProvider>

);

App.propTypes = {
  isLoadingUser: PropTypes.bool,
};

App.defaultProps = {
  isLoadingUser: false,
};

const mapDispatchToProps = {
  checkPreviewModeAccess,
  togglePreviewMode,
};

const mapStateToProps = state => ({
  isLoadingUser: state.oidc.isLoadingUser,
  user: state.oidc.user,
  previewMode: state.previewMode,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
