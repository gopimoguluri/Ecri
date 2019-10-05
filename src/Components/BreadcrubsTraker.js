import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  addBreadCrumb,
  breadCrumbFollowed,
  breadCrumbClicked,
} from '../../actions/breadcrumb';

class BreadCrumbTracker extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location &&
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      if (
        this.props.currentCrumb &&
        this.props.currentCrumb.location &&
        this.props.currentCrumb.location.pathname ===
          this.props.location.pathname
      ) {
        this.props.onEatBread();
      } else {
        const { pathname } = prevProps.location;
        if (pathname === '/') {
          this.props.pushBreadCrumb('Back to Home', prevProps.location);
        } else if (pathname.toLowerCase().startsWith('/search')) {
          this.props.pushBreadCrumb(
            'Back to Search Results',
            prevProps.location
          );
        } else if (pathname.toLowerCase().includes('/trustscore')) {
          this.props.pushBreadCrumb(
            'Back to TRUST Scorecard',
            prevProps.location
          );
        } else if (pathname.toLowerCase().startsWith('/brief')) {
          this.props.pushBreadCrumb('Back to Brief', prevProps.location);
        } else if (pathname.toLowerCase().startsWith('/new-content')) {
          this.props.pushBreadCrumb('Back to New Content', prevProps.location);
        }
      }
    }
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => ({
  pushBreadCrumb: (title, location) =>
    dispatch(addBreadCrumb({ title, location })),
  onNavigation: () => dispatch(breadCrumbFollowed()),
  onEatBread: () => dispatch(breadCrumbClicked()),
});

const mapStateToProps = state => ({
  isNavigating: state.breadCrumbs.isNavigating,
  currentCrumb: state.breadCrumbs.crumbs.peek(),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BreadCrumbTracker)
);
