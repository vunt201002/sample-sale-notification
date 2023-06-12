import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Provider} from '@shopify/app-bridge-react';
import {useHistory, useLocation} from 'react-router-dom';

export default function AppBridgeProvider({children}) {
  const {push} = useHistory();
  const location = useLocation();
  const history = useMemo(() => ({replace: path => push(path, {replace: true})}), [push]);
  const router = useMemo(() => ({location, history}), [location, history]);

  return (
    <Provider
      router={router}
      config={{
        host: new URL(window.location).searchParams.get('host'),
        apiKey: process.env.SHOPIFY_API_KEY,
        forceRedirect: true
      }}
    >
      {children}
    </Provider>
  );
}

AppBridgeProvider.propTypes = {
  children: PropTypes.any
};
