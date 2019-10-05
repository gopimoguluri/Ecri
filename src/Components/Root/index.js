import React from 'react';
// import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import NotificationBar from '../NotificationBar';
import asyncComponent from '../AsyncComponent';
// import Register from '../Register';
import CallbackPage from '../Callback';
import CompleteMemberSignUp from '../Register/CompleteMemberSignUp';
import ConfirmNewUser from '../Register/ConfirmNewUser';
import NewUserRedirect from '../Register/NewUserRedirect';
import PrivateRoute from '../PrivateRoute';
import userManager from '../../utils/usermanager';
import Footer from '../Footer';
import ogThumb from '../../assets/egt-og-thumbnail-1200x630.png';
import '../../App/scss/global.scss';

const asyncAnalyticsPage = asyncComponent(() =>
  import('../AnalyticsPage' /* webpackChunkName: "analyticspage" */)
);
const asyncHome = asyncComponent(() =>
  import('../Home' /* webpackChunkName: "home" */)
);
const asyncBrief = asyncComponent(
  () => import('../Brief') /* webpackChunkName: "brief" */
);
const asyncStaticPage = asyncComponent(() =>
  import('../StaticPage' /* webpackChunkName: "staticpage" */)
);
const asyncTrustScore = asyncComponent(() =>
  import('../TrustScore' /* webpackChunkName: "trustscore" */)
);
const asyncSearch = asyncComponent(() =>
  import('../Search' /* webpackChunkName: "search" */)
);
const asyncPageNotFound = asyncComponent(() =>
  import('../PageNotFound' /* webpackChunkName: "pagenotfound" */)
);
const asyncNewContent = asyncComponent(() =>
  import('../NewContent' /* webpackChunkName: "newcontent" */)
);
const asyncRegister = asyncComponent(() =>
  import('../Register' /* webpackChunkName: "register" */)
);
const asyncFdaDetailsPage = asyncComponent(() =>
  import('../FdaDetailsPage' /* webpackChunkName: "fdaDetailsPage" */)
);

class Root extends React.Component {
  componentDidUpdate(prevProps) {
    const { user: prevUser } = prevProps;
    const { user: currUser, checkPreviewModeAccess } = this.props;
    if (!prevUser && currUser) {
      // todo eventually we'll use a claim issued from the idp
      checkPreviewModeAccess(currUser);
    }
  }

  handleSearchRequest(phrase) {
    if (phrase && phrase !== '') {
      this.props.history.push({
        pathname: '/search',
        search: encodeURIComponent(`?q=${phrase}`),
        state: { searchPhrase: phrase, sortBy: 'relevance' },
      });
    }
  }

  render() {
    const {
      user,
      isLoadingUser,
      location,
      togglePreviewMode,
      previewMode,
    } = this.props;
    const loggedOut = !user || user.expired;

    return (
      <React.Fragment>
        <Helmet title="ECRI Guidelines Trust™">
          <meta name="title" content="ECRI Guidelines Trust™" />
          <meta
            name="description"
            content="ECRI Guidelines Trust™ is a publicly available web-based repository of objective, evidence-based clinical practice guideline content."
          />
          <meta
            name="keywords"
            content="ECRI, ECRI Institute, supply chain management, patient safety, risk management, inclusion criteria, clinical guidelines, guidelines trust, guideline brief, trust scorecard"
          />

          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="ECRI Guidelines Trust™" />
          <meta property="og:title" content="ECRI Guidelines Trust™" />
          {location && location.href && (
            <meta property="og:url" content={location.href} />
          )}
          <meta property="og:image" content={ogThumb} />
          <meta
            property="og:description"
            content="ECRI Guidelines Trust™ is a publicly available web-based repository of objective, evidence-based clinical practice guideline content."
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="ECRI Guidelines Trust™" />
          <meta
            name="twitter:description"
            content="ECRI Guidelines Trust™ is a publicly available web-based repository of objective, evidence-based clinical practice guideline content."
          />
          {location && location.href && (
            <meta name="twitter:url" content={location.href} />
          )}
          <meta name="twitter:image" content={ogThumb} />
        </Helmet>
        <Header
          rootUrl={process.env.REACT_APP_PUBLIC_URL}
          userName={loggedOut ? '' : user.profile.name}
          onSearchRequest={phrase => {
            if (!isLoadingUser) {
              this.handleSearchRequest(phrase);
            }
          }}
          loginButtonInfo={{
            mobileText: loggedOut ? 'LOGIN' : 'LOG OUT',
            fullText: loggedOut ? 'Log In' : 'Log Out',
            onClick: () => {
              if (!loggedOut) {
                userManager.createSignoutRequest().then(req => {
                  window.location = req.url;
                });
              } else {
                userManager.signinRedirect({ state: location });
              }
            },
          }}
          previewButtonInfo={{
            ...previewMode,
            onPreviewChange: val => togglePreviewMode(val),
          }}
        />
        <NotificationBar />
        <main>
          {!isLoadingUser && (
            <Switch>
              <Route exact path="/" component={asyncHome} />
              <Route
                path="/loggedout"
                render={() => <h1>You are now logged out.</h1>}
              />
              <Route path="/callback" component={CallbackPage} />
              <Route path="/about" component={asyncStaticPage} />
              <Route path="/inclusion-criteria" component={asyncStaticPage} />
              <Route
                path="/about-trust-scorecard"
                component={asyncStaticPage}
              />
              <Route path="/register" component={asyncRegister} />
              <Route path="/confirm-signup" component={ConfirmNewUser} />
              <Route path="/ask-us" component={asyncStaticPage} />
              <Route path="/search-tips" component={asyncStaticPage} />
              <Route path="/scorecard-analytics" component={asyncStaticPage} />
              <PrivateRoute
                exact
                path="/analytics"
                component={asyncAnalyticsPage}
              />
              <PrivateRoute
                exact
                path="/fda-notices"
                component={asyncFdaDetailsPage}
              />
              <PrivateRoute
                exact
                path="/brief/:uniqueid"
                component={asyncBrief}
              />
              <PrivateRoute path="/search" component={asyncSearch} />
              <PrivateRoute
                path="/brief/trustscore/:uniqueid"
                component={asyncTrustScore}
              />
              <PrivateRoute
                path="/complete-member-signup"
                component={CompleteMemberSignUp}
              />
              <PrivateRoute
                path="/new-user-redirect"
                component={NewUserRedirect}
              />
              <PrivateRoute path="/new-content" component={asyncNewContent} />
              <Route component={asyncPageNotFound} />
            </Switch>
          )}
        </main>
        <Footer
          facebookurl="https://www.facebook.com/ECRIInstitute/"
          twitterurl="https://twitter.com/ECRI_Institute"
          youtubeurl="https://www.youtube.com/user/ECRIInstitute"
          linkedinurl="https://www.linkedin.com/company/ecri-institute"
          chaturl="https://ecrichat.ecri.org/chat/chatstart.aspx?domain=www.ecri.org&link=https://guidelines.ecri.org/ "
          rootUrl={process.env.REACT_APP_PUBLIC_URL}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Root);
