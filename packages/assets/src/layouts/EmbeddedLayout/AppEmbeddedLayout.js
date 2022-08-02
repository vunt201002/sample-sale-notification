import React from 'react';
import {Frame, Loading, Toast} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {TitleBar} from '@shopify/app-bridge-react';
import {useLocation} from 'react-router-dom';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast} from '@assets/actions/storeActions';
import getUrl from '@assets/helpers/getUrl';

/**
 * Render an app layout
 *
 * @param {React.ReactNode} children
 * @return {React.ReactNode}
 * @constructor
 */
function AppEmbeddedLayout({children}) {
  const {pathname} = useLocation();
  const {state, dispatch} = useStore();
  const {loading, isToast, toast} = state;

  return (
    <Frame>
      <TitleBar
        title=""
        secondaryActions={[
          {
            content: 'Dashboard',
            url: '/',
            disabled: pathname === getUrl('/')
          },
          {
            content: 'Samples',
            url: '/samples',
            disabled: pathname.includes(getUrl('/samples'))
          }
        ]}
      />
      {children}
      {loading && <Loading />}
      {isToast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppEmbeddedLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppEmbeddedLayout;
