import React from 'react';
import {Button, FooterHelp, Layout} from '@shopify/polaris';

export default function Footer() {
  return (
    <Layout sectioned>
      <FooterHelp>
        {'Created by '}
        <Button plain external url="https://avada.io">
          AVADA
        </Button>
        {' with love'}
      </FooterHelp>
    </Layout>
  );
}
