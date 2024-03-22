import {Card, Layout, Page, ResourceItem, ResourceList} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import './Notifications.css';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import timestampToRelativeTime from '@assets/helpers/utils/timestampToRelativeTime';
import Empty from '@assets/components/Empty/Empty';
import defaultNotification from '@assets/const/defaultNotification';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const {data: notifications, loading} = useFetchApi({
    url: '/notifications'
  });

  const sortNotifications = selected => {
    setSortValue(selected);
  };

  return (
    <div className="space-bottom">
      <Page title="Notifications" subtitle="List of sales notification from Shopify">
        <Layout>
          <Layout.Section>
            <Card>
              <ResourceList
                loading={loading}
                resourceName={resourceName}
                items={notifications || []}
                totalItemsCount={notifications.length}
                renderItem={renderItem}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                selectable
                sortValue={sortValue}
                sortOptions={[
                  {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                  {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
                ]}
                onSortChange={selected => sortNotifications(selected)}
                pagination={{
                  hasNext: true,
                  onNext: () => {}
                }}
                emptyState={<Empty />}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}

function renderItem(item) {
  const {firstName, city, productName, country, id, timestamp, productImage} = item;
  const time = timestampToRelativeTime(timestamp);

  return (
    <ResourceItem id={id}>
      <NotificationPopup
        id={id}
        firstName={firstName}
        city={city}
        productName={productName}
        country={country}
        timestamp={timestamp}
        productImage={productImage}
        time={time}
      />
    </ResourceItem>
  );
}
