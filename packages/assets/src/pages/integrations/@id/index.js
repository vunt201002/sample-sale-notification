import React from 'react';
import {Card, FormLayout, Link, List, TextStyle} from '@shopify/polaris';
import PropTypes from 'prop-types';
import {getIntAppByUrl} from '@assets/config/integration/appList';
import IntegrationTemplate from '@assets/components/templates/Integration/IntegrationTemplate';

export default function Sample({location}) {
  const app = getIntAppByUrl(location.pathname);
  const {title} = app;

  return (
    <IntegrationTemplate app={app}>
      <Card sectioned title="Introduction">
        <List>
          <List.Item>
            {`${title} is a Shopify page builder app with powerful, yet easy-to-use drag & drop page designer to build lading pages, product page, contact page, etc.`}
          </List.Item>
          <List.Item>
            {`This integration allows you to go show reward popup on any ${title} pages.`}
          </List.Item>
        </List>
      </Card>
      <Card sectioned title="Download & Install">
        <FormLayout>
          <TextStyle>
            {`You can download ${title} app `}
            <Link removeUnderline external url={app.externalUrl}>
              here
            </Link>
            {`. After install successfully, AVADA will auto connect to ${title} and show reward popup on any ${title} pages.`}
          </TextStyle>
        </FormLayout>
      </Card>
    </IntegrationTemplate>
  );
}

Sample.propTypes = {
  location: PropTypes.object
};
