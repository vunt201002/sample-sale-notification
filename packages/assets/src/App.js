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
import AppBridgeProvider from '@assets/components/templates/AppBridgeProvider';
import AppEmbeddedLayout from '@assets/layouts/EmbeddedLayout/AppEmbeddedLayout';
import AppFullLayout from '@assets/layouts/FullLayout/AppFullLayout';
import {isEmbeddedApp} from '@assets/config/app';

/**
 * The main endpoint of application contains all routes, settings for redux and Polaris
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function App() {
  return (
    <AppProvider
      theme={theme}
      i18n={translations}
      linkComponent={ReactRouterLink}
      features={{newDesignLanguage: isEmbeddedApp}}
    >
      <Router history={history}>
        <AppLayout>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

const AppLayout = ({children}) => {
  return isEmbeddedApp ? (
    <AppBridgeProvider>
      <AppEmbeddedLayout>{children}</AppEmbeddedLayout>
    </AppBridgeProvider>
  ) : (
    <AppFullLayout>{children}</AppFullLayout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node
};
