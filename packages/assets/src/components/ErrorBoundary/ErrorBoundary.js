/* eslint-disable require-jsdoc */
import React, {Component} from 'react';
import NotFound from '../../pages/NotFound';
import * as PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

// import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {eventId: null};
    const { history } = this.props;

    history.listen((location, action) => {
      if (this.state.hasError) {
        this.setState({
          hasError: false,
        });
      }
    });
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'production') {
      // // Setup Sentry for reporting errors
      // Sentry.withScope(scope => {
      //   scope.setExtras(errorInfo);
      //   const eventId = Sentry.captureException(error);
      //   this.setState({eventId});
      // });
    }
  }

  render() {
    if (this.state.hasError) {
      return <NotFound />;
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(ErrorBoundary)
