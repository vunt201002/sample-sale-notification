import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Link, Stack, TextStyle} from '@shopify/polaris';

export default function ProductCard({app, handleOpenLink}) {
  return (
    <Card sectioned>
      <AppLink {...{app, handleOpenLink}}>
        <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{marginRight: '2rem'}}>
            {app.img && <img src={app.img} alt={app.title} width={40} />}
            {app.icon && <Icon source={app.icon} />}
          </div>
          <Stack vertical>
            <TextStyle variation="strong">{app.title}</TextStyle>
            <TextStyle>{app.description}</TextStyle>
            {app.button && (
              <Button primary disabled={app.status === 'disable'}>
                {app.button}
              </Button>
            )}
          </Stack>
        </div>
      </AppLink>
    </Card>
  );
}

ProductCard.propTypes = {
  app: PropTypes.object,
  handleOpenLink: PropTypes.func
};

const AppLink = ({children, app, handleOpenLink}) => {
  return app.url ? (
    <Link removeUnderline monochrome onClick={() => handleOpenLink(app)}>
      {children}
    </Link>
  ) : (
    children
  );
};

AppLink.propTypes = {
  children: PropTypes.any,
  app: PropTypes.object,
  handleOpenLink: PropTypes.func
};
