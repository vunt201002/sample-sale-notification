import React from 'react';
import {Router} from 'react-router-dom';
import ReactRouterLink from './components/Link';
import {AppProvider} from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import {history} from './helpers';
import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './routes/routes';

const theme = {
  colors: {
    topBar: {
      background: '#0b4697'
    }
  },
  logo: {
    width: 124,
    topBarSource:
      'https://avada-popups.firebaseapp.com/images/AvadaLogo-white.png?b24ff4e9b7bedd9c1ec9046df5a366be',
    contextualSaveBarSource:
      'https://avada-popups.firebaseapp.com/images/AvadaLogo-back.png?b24ff4e9b7bedd9c1ec9046df5a366be',
    url: '/',
    accessibilityLabel: 'AVADA Sample App'
  }
};

/**
 * The main endpoint of application contains all routes, settings for redux and Polaris
 *
 * @return {React.FunctionComponent}
 * @constructor
 */
export default function App() {
  return (
    <AppProvider
      i18n={translations}
      theme={theme}
      linkComponent={ReactRouterLink}
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
