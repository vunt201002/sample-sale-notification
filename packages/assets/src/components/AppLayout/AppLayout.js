import React, {useCallback, useRef, useState} from 'react';
import {Frame, Loading, Navigation, Toast, TopBar} from '@shopify/polaris';
import {
  ChatMajorMonotone,
  HomeMajorMonotone,
  InfoMinor,
  LogOutMinor,
  PrintMinor,
  SettingsMinor,
  ViewMinor
} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import {detectShop, getRawSupport, shop} from '../../helpers';
import {connect} from 'react-redux';
import {setLoading as setLoadingAction} from '../../actions/layout/setLoadingAction';
import {
  closeToast as closeToastAction,
  setToast as setToastAction
} from '../../actions/layout/setToastAction';
import LogoutModal from '../LogoutModal';
import {logout as logoutAction} from '../../actions/layout/logoutAction';
import {withRouter} from 'react-router-dom';

/**
 * Render an app layout
 *
 * @param {React.ReactNode} children
 * @param {Object} layout
 * @param {Function} logout
 * @param {Function} closeToast
 * @param {Object} location
 * @param {Object} history
 * @return {React.ReactNode}
 * @constructor
 */
function AppLayout({children, layout, logout, location, history, closeToast}) {
  const skipToContentRef = useRef(null);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive(!userMenuActive),
    [userMenuActive]
  );
  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive(!mobileNavigationActive),
    [mobileNavigationActive]
  );

  const handleCloseLogoutModal = useCallback(() => {
    setIsLogoutModal(false);
  }, []);

  const handleOpenLogoutModal = useCallback(() => {
    setIsLogoutModal(true);
  }, []);

  const userMenuActions = [
    {
      items: [
        {
          content: 'Help desk',
          icon: InfoMinor,
          url: 'https://help.avada.io/en-us/category/pdf-invoice-bu5nt0/',
          external: true
        }
      ]
    },
    {
      items: [
        {
          content: 'Log out',
          icon: LogOutMinor,
          onAction: handleOpenLogoutModal
        }
      ]
    }
  ];
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name={layout.user ? layout.user.displayName : ''}
      detail={shop ? shop.replace('.myshopify.com', '') : ''}
      initials={
        layout.user &&
        layout.user.displayName &&
        layout.user.displayName.length > 0
          ? layout.user.displayName[0].toUpperCase()
          : ''
      }
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Primary menu"
        separator
        items={[
          {
            label: 'Dashboard',
            icon: HomeMajorMonotone,
            selected: location.pathname === '/',
            url: '/',
            onClick: () => {
              history.push('/');
            }
          },
          {
            label: 'Samples',
            icon: SettingsMinor,
            url: '/samples',
            selected: location.pathname.startsWith('/samples')
          }
        ]}
      />
      <Navigation.Section
        title="Help center"
        fill
        action={{
          onClick: () => {
            window.open(`https://${detectShop()}`, '_blank');
          },
          icon: ViewMinor
        }}
        separator
        items={[
          {
            label: 'Help desk',
            icon: InfoMinor,
            onClick: () => {
              window.open(
                'https://help.avada.io/en-us/category/pdf-invoice-bu5nt0/',
                '_blank'
              );
            }
          },
          {
            label: 'Live chat',
            icon: ChatMajorMonotone,
            onClick: getRawSupport
          }
        ]}
      />
      <Navigation.Section
        items={[
          {
            label: 'Log out',
            icon: LogOutMinor,
            onClick: handleOpenLogoutModal
          }
        ]}
      />
    </Navigation>
  );

  const logoutMarkup = (
    <LogoutModal
      open={isLogoutModal}
      onClose={handleCloseLogoutModal}
      onAction={logout}
    />
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
      skipToContentTarget={skipToContentRef.current}
    >
      {children}
      {logoutMarkup}
      {layout.loading && <Loading />}
      {layout.isToast && <Toast onDismiss={closeToast} {...layout.toast} />}
    </Frame>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  closeToast: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = app => ({
  layout: app.layout
});

const mapStateToDispatch = {
  setLoading: setLoadingAction,
  setToast: setToastAction,
  closeToast: closeToastAction,
  logout: logoutAction
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(AppLayout));
