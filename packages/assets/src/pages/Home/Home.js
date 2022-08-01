import React from 'react';
import {CalloutCard, FooterHelp, Layout, Link, Page} from '@shopify/polaris';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Customize the style of your checkout"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{content: 'Customize checkout'}}
          >
            <p>Upload your store’s logo, change colors and fonts, and more.</p>
          </CalloutCard>
        </Layout.Section>
        <Layout.Section>
          <FooterHelp>
            {'Learn more about '}
            <Link url="">fulfilling orders</Link>
          </FooterHelp>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
