import React, {useEffect} from 'react';
import {Avatar, Button, Icon, InlineStack, LegacyStack, Link, Text, Thumbnail, TopBar} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {BugIcon, MenuIcon, PaymentIcon, XIcon} from '@shopify/polaris-icons';
import isLocal from '@assets/helpers/isLocal';
import {docLink} from '@assets/config/menuLink';
import InfoIcon from '@assets/resources/icons/info.svg';
import NotificationIcon from '@assets/resources/icons/notification.svg';
import {LOGO_URL, LOGO_WIDTH} from '@assets/config/theme';
import '@assets/styles/layout/topbar.scss';
import {isShopUpgradable} from '@assets/services/shopService';
import {useStore} from '@assets/reducers/storeReducer';
import useConfirmSheet from '@assets/hooks/popup/useConfirmSheet';
import AppNewsSheet from '@assets/components/AppNews/AppNewsSheet';

/**
 * @param {boolean} isNavOpen
 * @param {function} toggleOpenNav
 * @return {JSX.Element}
 * @constructor
 */
export default function AppTopBar({isNavOpen, toggleOpenNav}) {
  const {state} = useStore();
  const {shop} = state;

  const {sheet: newsSheet, openSheet: openNewsSheet} = useConfirmSheet({Content: AppNewsSheet});

  return (
    <TopBar
      id="topbar"
      secondaryMenu={
        <div className="Avada-TopBar__Wrapper">
          <div className="Avada-TopBar__Title">
            <img alt="Avada App Name" src={LOGO_URL} width={LOGO_WIDTH} />
            {isLocal && (
              <LegacyStack alignment="center">
                <Button url="/dev_zone" icon={BugIcon} variant="plain" />
              </LegacyStack>
            )}
          </div>
          <div className="Avada-TopBar__Icons">
            <LegacyStack className="avatar">
              <Avatar initials="A" />
              <Text variant="bodyMd">Avada</Text>
            </LegacyStack>
          </div>
          {isShopUpgradable(shop) && (
            <Button url="/subscription">
              <LegacyStack alignment="center">
                <Icon source={PaymentIcon} />
                <LegacyStack.Item>Subscription</LegacyStack.Item>
              </LegacyStack>
            </Button>
          )}
          {newsSheet}
        </div>
      }
    />
  );
}

AppTopBar.propTypes = {
  isNavOpen: PropTypes.bool,
  toggleOpenNav: PropTypes.func
};
