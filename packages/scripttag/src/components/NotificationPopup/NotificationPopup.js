import React from 'react';
import './NoticationPopup.scss';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hoodafsdfasdfsadfdsfsadfasdfsdafasdfsadfasdfasdfsadfsadfsadfsadfsadfsadfwqerqwegfasdfsdafasd',
  relativeDate = 'a day ago',
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  position = 'top-left',
  truncateProductName = false,
  hideTimeAgo = false
}) => {
  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated Avava-SP__Wrapper--center`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div
                className={
                  truncateProductName ? 'Avada-SP__Subtitle text-elipsis' : 'Avada-SP__Subtitle'
                }
              >
                purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <span className={hideTimeAgo ? 'Avada-SP__Footer--hide' : ''}>{relativeDate} </span>
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
