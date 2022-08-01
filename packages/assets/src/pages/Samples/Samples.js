import React from 'react';
import {Card, Layout, Page, ResourceList, ResourceItem, Stack, TextStyle} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Samples() {
  const {data: todos, loading} = useFetchApi('/samples');

  return (
    <Page title="Samples" breadcrumbs={[{url: '/'}]}>
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={loading}
              resourceName={{singular: 'todo', plural: 'todos'}}
              items={todos}
              renderItem={todo => (
                <ResourceItem id={todo.id}>
                  <Stack>
                    <Stack.Item fill>
                      <h3>
                        <TextStyle variation="strong">{todo.title}</TextStyle>
                      </h3>
                    </Stack.Item>
                  </Stack>
                </ResourceItem>
              )}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
