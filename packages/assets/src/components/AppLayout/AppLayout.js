import React, {useRef, useState} from 'react';
import {Frame, Loading, Navigation, Toast, TopBar} from '@shopify/polaris';
import {
  ChatMajor,
  CircleInformationMajor,
  HomeMajor,
  InfoMinor,
  LogOutMinor,
  SettingsMinor,
  ViewMinor
} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import useConfirmModal from '@assets/hooks/modal/useConfirmModal';
import {getRawSupport} from '@assets/services/crispService';
import getDomain from '@assets/helpers/getDomain';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast} from '@assets/actions/storeAction';
import {logout} from '@assets/services/shopService';

/**
 * Render an app layout
 *
 * @param {React.ReactNode} children
 * @param {Object} location
 * @param {Object} history
 * @return {React.ReactNode}
 * @constructor
 */
function AppLayout({children, location, history}) {
  const {pathname} = location;
  const {state, dispatch} = useStore();
  const {shop, user, loading, isToast, toast} = state;
  const displayName = user?.displayName || '';

  const skipToContentRef = useRef(null);
  const [isUserMenu, setIsUserMenu] = useState(false);
  const [isMobileNavigation, setIsMobileNavigation] = useState(false);

  const {openModal: openLogoutModal, modal: logoutModal} = useConfirmModal({
    confirmAction: () => logout(),
    title: 'Log out',
    content: 'Are you sure you want to log out?',
    destructive: true
  });

  const userMenuActions = [
    {
      items: [
        {
          content: 'Help desk',
          icon: InfoMinor,
          url: 'https://help.avada.io',
          external: true
        }
      ]
    },
    {
      items: [
        {
          content: 'Log out',
          icon: LogOutMinor,
          onAction: openLogoutModal
        }
      ]
    }
  ];
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={displayName}
      detail={getDomain(shop)}
      initials={displayName && displayName[0].toUpperCase()}
      open={isUserMenu}
      onToggle={() => setIsUserMenu(prev => !prev)}
    />
  );
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={() => setIsMobileNavigation(prev => !prev)}
    />
  );
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Primary menu"
        separator
        action={{
          icon: ViewMinor,
          onClick: () => window.open(`//${getDomain(shop)}`, '_blank')
        }}
        items={[
          {
            label: 'Dashboard',
            icon: HomeMajor,
            url: '/',
            selected: pathname === '/',
            onClick: () => history.push('/')
          },
          {
            label: 'Samples',
            icon: SettingsMinor,
            url: '/samples',
            selected: pathname.startsWith('/samples')
          }
        ]}
      />
      <Navigation.Section
        title="Help center"
        separator
        items={[
          {
            label: 'Documents',
            icon: CircleInformationMajor,
            url: 'https://help.avada.io',
            external: true
          },
          {
            label: 'Helpdesk',
            icon: ChatMajor,
            onClick: getRawSupport
          }
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={isMobileNavigation}
      onNavigationDismiss={() => setIsMobileNavigation(prev => !prev)}
      skipToContentTarget={skipToContentRef.current}
    >
      {children}
      {logoutModal}
      {loading && <Loading />}
      {isToast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(AppLayout);
