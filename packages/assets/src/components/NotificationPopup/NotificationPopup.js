import React from 'react';
import './NoticationPopup.scss';
import '@shopify/polaris/build/esm/styles.css';
import {CheckIcon} from '@shopify/polaris-icons';
import {Icon, Text, TextContainer, Tooltip} from '@shopify/polaris';
import timestampToDate from '@assets/helpers/utils/timestampToDate';
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
  const date = timestampToDate(timestamp);

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
          <div className="close-btn">
            <Tooltip content="Delete notification">
              <TextContainer>x</TextContainer>
            </Tooltip>
          </div>
        </div>
      </div>
      <div>{date !== 'Invalid Date' ? date : ''}</div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
