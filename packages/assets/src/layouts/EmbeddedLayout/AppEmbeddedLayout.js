import React from 'react';
import {Frame, Loading, Toast} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {TitleBar} from '@shopify/app-bridge-react';
import {useLocation} from 'react-router-dom';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast} from '@assets/actions/storeActions';
import {prependRoute} from '@assets/config/app';
import useConfirmSheet from '@assets/hooks/popup/useConfirmSheet';
import AppNewsSheet from '@assets/components/templates/AppNews/AppNewsSheet';

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
  const {loading, toast} = state;

  const {sheet: newsSheet, openSheet: openNewsSheet} = useConfirmSheet({Content: AppNewsSheet});

  return (
    <Frame>
      <TitleBar
        title=""
        secondaryActions={[
          {
            content: 'Dashboard',
            url: '/embed',
            disabled: pathname === prependRoute('')
          },
          {
            content: 'Samples',
            url: '/samples',
            disabled: pathname.includes(prependRoute('/samples'))
          },
          {
            content: 'Integrations',
            url: '/integrations',
            disabled: pathname.includes(prependRoute('/integrations'))
          },
          {
            content: "What's new",
            onAction: openNewsSheet
          }
        ]}
      />
      {children}
      {loading && <Loading />}
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
      {newsSheet}
    </Frame>
  );
}

AppEmbeddedLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppEmbeddedLayout;
