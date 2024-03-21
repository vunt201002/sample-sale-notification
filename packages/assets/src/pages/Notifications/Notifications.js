import {Card, Layout, Page, ResourceItem, ResourceList} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import './Notifications.css';
import useFetchApi from '@assets/hooks/api/useFetchApi';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const {data: notifications, loading} = useFetchApi({
    url: '/notifications',
    defaultData: []
  });

  return (
    <div className="space-bottom">
      <Page title="Notifications" subtitle="List of sales notification fomr Shopify">
        <Layout>
          <Layout.Section>
            <Card>
              <ResourceList
                loading={loading}
                resourceName={resourceName}
                items={notifications}
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
                onSortChange={selected => {
                  setSortValue(selected);
                  console.log(`Sort option changed to ${selected}.`);
                }}
                pagination={{
                  hasNext: true,
                  onNext: () => {}
                }}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}

function renderItem(item) {
  const {firstName, city, productName, country, id, timestamp, productImage, time} = item;

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
