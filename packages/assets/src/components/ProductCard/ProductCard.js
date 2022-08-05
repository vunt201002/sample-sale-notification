/* eslint-disable react/prop-types */
import React from 'react';
import {Button, Card, FormLayout, Icon, Link, Stack, TextStyle} from '@shopify/polaris';

export default function ProductCard({app, handleOpenLink}) {
  return (
    <Card sectioned>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: app.title === 'Translations' && 'pointer'
        }}
      >
        <div style={{marginRight: '1em'}}>
          {app.url ? (
            <Link onClick={() => handleOpenLink(app)}>
              {app.img && <img src={app.img} alt="Logo Partner" width={40} />}
              {app.icon && <Icon source={app.icon} />}
            </Link>
          ) : (
            <React.Fragment>
              {app.img && <img src={app.img} alt="Logo Partner" width={40} />}
              {app.icon && <Icon source={app.icon} />}
            </React.Fragment>
          )}
        </div>
        <div>
          <Stack vertical={false}>
            <Stack.Item>
              <FormLayout>
                {app.url ? (
                  <Link removeUnderline monochrome onClick={() => handleOpenLink(app)}>
                    <FormLayout>
                      <TextStyle variation="strong">{app.title}</TextStyle>
                      <TextStyle>{app.description}</TextStyle>
                    </FormLayout>
                  </Link>
                ) : (
                  <FormLayout>
                    <TextStyle variation="strong">{app.title}</TextStyle>
                    <TextStyle>{app.description}</TextStyle>
                  </FormLayout>
                )}

                {app.button && app.title !== 'Translations' && (
                  <Button
                    primary
                    disabled={app.status === 'disable'}
                    onClick={() => handleOpenLink(app)}
                  >
                    {app.button}
                  </Button>
                )}
              </FormLayout>
            </Stack.Item>
          </Stack>
        </div>
      </div>
    </Card>
  );
}
