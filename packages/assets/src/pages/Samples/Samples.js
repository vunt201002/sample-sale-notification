import React from 'react';
import {
  Card,
  Layout,
  Page,
  ResourceList,
  ResourceItem,
  Stack,
  TextStyle
} from '@shopify/polaris';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {paginateSamples as paginateSamplesAction} from '../../actions/sample/paginateSample';
import useFetchTodoes from '../../hooks/useFetchTodoes';
import api from '../../helpers';
import useFetchApi from '../../hooks/api/useFetchApi';

/**
 * Just render a sample page
 *
 * @param {Function} paginateSamples
 * @param {Object} sample
 * @return {React.ReactElement}
 * @constructor
 */
function Samples({paginateSamples, sample}) {
  const {todos, loading: fetchLoading} = useFetchTodoes();
  /**
   * Read the useFetchApi hook, always make API within admin using the api functions from helpers.js
   */
  const {data: sampleData} = useFetchApi('/samples');

  return (
    <Page
      title="Samples"
      secondaryActions={[{content: 'Back to dashboard', url: '/'}]}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              loading={fetchLoading}
              resourceName={{singular: 'todo', plural: 'todoes'}}
              items={todos}
              renderItem={todo => {
                const {id, title} = todo;

                return (
                  <ResourceItem id={id}>
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">{title}</TextStyle>
                        </h3>
                      </Stack.Item>
                    </Stack>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Samples.propTypes = {
  paginateSamples: PropTypes.func.isRequired,
  sample: PropTypes.object.isRequired
};

const mapStateToProps = app => ({
  sample: app.sample
});

const mapStateToDispatch = {
  paginateSamplesAction
};

export default connect(mapStateToProps, mapStateToDispatch)(Samples);
