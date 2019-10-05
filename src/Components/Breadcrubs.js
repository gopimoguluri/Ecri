import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { queuePageView } from '../../actions/usagelogging';

class AnalyticsWrapper extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { user, location, logPageView } = this.props;
      logPageView(user, location, document.title);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({
  user: state.oidc.user,
});

const mapDispatchToProps = dispatch => ({
  logPageView: (user, location) => dispatch(queuePageView(user, location)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AnalyticsWrapper),
);
