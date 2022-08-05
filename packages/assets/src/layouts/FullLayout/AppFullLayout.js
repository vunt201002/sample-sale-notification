import React, {useRef, useState} from 'react';
import {Frame, Loading, Navigation, Toast, TopBar} from '@shopify/polaris';
import {
  AppsMajor,
  ArrowLeftMinor,
  ChatMajor,
  CircleInformationMajor,
  HomeMajor,
  LogOutMinor,
  TapChipMajor,
  TeamMajor,
  ViewMinor
} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import useConfirmModal from '@assets/hooks/modal/useConfirmModal';
import {getRawSupport} from '@assets/services/crispService';
import getDomain from '@assets/helpers/getDomain';
import {useStore} from '@assets/reducers/storeReducer';
import {closeToast, logout} from '@assets/actions/storeActions';
import getUrl from '@assets/helpers/getUrl';

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
  const {shop, user, loading, toast} = state;
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
      initials={displayName[0].toUpperCase?.()}
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
        items={[
          {
            label: 'Back to Shopify',
            icon: ArrowLeftMinor,
            onClick: () => window.open(`//${getDomain(shop)}/admin`, '_blank')
          }
        ]}
      />
      <Navigation.Section
        title="Primary Menu"
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
            selected: pathname === getUrl('/'),
            onClick: () => history.push('/')
          },
          {
            label: 'Samples',
            icon: AppsMajor,
            url: '/samples',
            selected: pathname.startsWith(getUrl('/samples'))
          },
          {
            label: 'Integrations',
            icon: TeamMajor,
            url: '/integration',
            selected: pathname.startsWith(getUrl('/integration'))
          },
          {
            label: 'Subscription',
            icon: TapChipMajor,
            url: '/subscription',
            selected: pathname.startsWith(getUrl('/subscription'))
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
            onClick: () => window.open('https://help.avada.io', '_blank')
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
      {toast && <Toast onDismiss={() => closeToast(dispatch)} {...toast} />}
    </Frame>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withRouter(AppLayout);
