import React from 'react';
import {Page, Layout, Card, ResourceList, ResourceItem, Stack} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import formatFullTime, {formatBothDateTime} from '@assets/helpers/utils/formatFullTime';

/**
 * @return {JSX.Element}
 */
export default function Notifications() {
  const {data: notifications, loading} = {
    data: [
      {
        id: 1,
        firstName: 'Thomas',
        lastName: 'Nguyen',
        productName: 'dfdf',
        city: 'Hanoi',
        country: 'VN',
        timestamp: new Date(),
        productImage: ''
      }
    ],
    loading: false
  };
  return (
    <Page title={'Notifications'}>
      <Card>
        <ResourceList
          loading={loading}
          resourceName={{singular: 'notification', plural: 'notifications'}}
          items={notifications}
          renderItem={item => {
            const {id, firstName, city, country, productName, productImage, timestamp} = item;

            return (
              <ResourceItem id={id} url={'url'}>
                <Stack distribution={'fill'}>
                  <NotificationPopup
                    productImage={productImage}
                    firstName={firstName}
                    city={city}
                    country={country}
                    productName={productName}
                  />
                  <div>{formatBothDateTime(timestamp)}</div>
                </Stack>
              </ResourceItem>
            );
          }}
        />
      </Card>
    </Page>
  );
}

Notifications.propTypes = {};
