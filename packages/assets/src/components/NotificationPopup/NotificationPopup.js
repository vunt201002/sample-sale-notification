import React, {useEffect, useState} from 'react';
import './NoticationPopup.scss';
import '@shopify/polaris/build/esm/styles.css';
import {CheckIcon} from '@shopify/polaris-icons';
import {Icon} from '@shopify/polaris';
import timestampToRelativeTime from '@assets/helpers/utils/timestampToRelativeTime';
const NotificationPopup = ({
  firstName,
  city,
  productName,
  country,
  productId,
  timestamp,
  productImage,
  time
}) => {
  const date = new Date(
    (timestamp?._seconds + timestamp?._nanoseconds / 1000000000) * 1000
  ).toDateString();

  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                {time}{' '}
                <span className="uni-blue">
                  <i>
                    <Icon source={CheckIcon} tone="info" />
                  </i>
                  by Avada
                </span>
              </div>
            </div>
          </a>
          <div className="close-btn">x</div>
        </div>
      </div>
      <div>{date !== 'Invalid Date' ? date : ''}</div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
