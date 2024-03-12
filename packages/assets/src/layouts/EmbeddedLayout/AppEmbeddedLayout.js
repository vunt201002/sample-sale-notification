import React from 'react';
import {Frame, Loading, Toast} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast} from '@assets/actions/storeActions';
import AppNavigation from '@assets/layouts/AppLayout/AppNavigation';
import AppTopBar from '@assets/layouts/AppLayout/AppTopBar';
import AppFullLayout from '@assets/layouts/FullLayout/AppFullLayout';

/**
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function AppEmbeddedLayout({children}) {
  const {state, dispatch} = useStore();
  const {loading, toast} = state;

  return (
    <Frame>
      {children}
      {loading && <Loading />}
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppEmbeddedLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppEmbeddedLayout;
