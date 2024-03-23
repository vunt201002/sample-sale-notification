import {Card, Layout, Page, ResourceItem, ResourceList} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import './Notifications.css';
import timestampToRelativeTime from '@assets/helpers/utils/timestampToRelativeTime';
import Empty from '@assets/components/Empty/Empty';
import usePaginate from '@assets/hooks/api/usePaginate';

export default function Notifications() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('desc');

  const {
    data: notifications,
    loading,
    nextPage,
    prevPage,
    count,
    pageInfo,
    onQueriesChange
  } = usePaginate({
    url: '/notifications',
    defaultSort: sortValue,
    defaultLimit: 5,
    searchKey: ''
  });

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const sortNotifications = async selected => {
    setSortValue(selected);

    await onQueriesChange(
      {
        page: pageInfo.pageNumber,
        sort: selected,
        limit: 5
      },
      true
    );
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
                  {label: 'Newest update', value: 'desc'},
                  {label: 'Oldest update', value: 'asc'}
                ]}
                onSortChange={selected => sortNotifications(selected)}
                pagination={{
                  hasNext: pageInfo.pageNumber < count,
                  hasPrevious: pageInfo.pageNumber > 1,
                  label: `page ${pageInfo.pageNumber || ''} of ${count || ''}`,
                  onNext: nextPage,
                  onPrevious: prevPage
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
  const {firstName, city, productName, country, timestamp, productImage, id} = item;
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
