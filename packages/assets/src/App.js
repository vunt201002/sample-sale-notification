import React from 'react';
import {Router} from 'react-router-dom';
import ReactRouterLink from '@assets/components/atoms/ReactRouterLink';
import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {history} from './helpers';
import ErrorBoundary from '@assets/components/templates/ErrorBoundary';
import Routes from './routes/routes';
import theme from '@assets/config/theme';
import PropTypes from 'prop-types';
import {getRoutePrefix} from '@assets/const/app';
import AppBridgeProvider from '@assets/components/templates/AppBridgeProvider';
import AppEmbeddedLayout from '@assets/layouts/EmbeddedLayout/AppEmbeddedLayout';
import AppFullLayout from '@assets/layouts/FullLayout/AppFullLayout';

/**
 * The main endpoint of application contains all routes, settings for redux and Polaris
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function App({isEmbedApp = false}) {
  return (
    <AppProvider
      theme={theme}
      i18n={translations}
      linkComponent={ReactRouterLink}
      features={{newDesignLanguage: isEmbedApp}}
    >
      <Router history={history}>
        <AppLayout isEmbedApp={isEmbedApp}>
          <ErrorBoundary>
            <Routes prefix={getRoutePrefix(isEmbedApp)} />
          </ErrorBoundary>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

App.propTypes = {
  isEmbedApp: PropTypes.bool
};

const AppLayout = ({children, isEmbedApp}) => {
  return isEmbedApp ? (
    <AppBridgeProvider>
      <AppEmbeddedLayout>{children}</AppEmbeddedLayout>
    </AppBridgeProvider>
  ) : (
    <AppFullLayout>{children}</AppFullLayout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
  isEmbedApp: PropTypes.bool
};
