import React from 'react';
import {Page, Layout, Card} from '@shopify/polaris';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  return (
    <Page title="Settings">
      <Layout sectioned>
        <Card sectioned>Settings</Card>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
