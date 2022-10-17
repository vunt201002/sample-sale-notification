import React, {useMemo} from 'react';
import {Card, ChoiceList, Icon, Layout, Stack, TextField, Page} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import IntegrationCard from '@assets/components/molecules/Integration/IntegrationCard';
import {integrationApps, integrationCategories} from '@assets/config/integration/appList';
import PropTypes from 'prop-types';
import useScreenType from '@assets/hooks/utils/useScreenType';
import {chunk} from '@avada/utils';
import useInput from '@assets/hooks/form/useInput';

/**
 * @return {React.ReactElement}
 * @constructor
 */
export default function Integration({history}) {
  const [filters, handleFiltersChange] = useInput({title: '', category: ''});
  const screenType = useScreenType();
  const isDesktop = screenType.isDesktop || screenType.isLargeDesktop;

  const appChunks = useMemo(() => {
    return chunk(
      integrationApps.filter(
        item =>
          (!filters.category || item.category === filters.category) &&
          (!filters.title || item.title.toLowerCase().includes(filters.title))
      ),
      2
    );
  }, [filters]);

  const handleOpenLink = app => {
    app.external ? window.open(app.url, '_blank') : history.push(app.url);
  };

  return (
    <Page title="Integrations" fullWidth>
      <Layout>
        <Layout.Section oneThird={isDesktop} fullWidth={!isDesktop}>
          <Stack vertical>
            <TextField
              label=""
              value={filters.title}
              placeholder="Search by name"
              onChange={val => handleFiltersChange('title', val)}
              prefix={<Icon source={SearchMinor} />}
              autoComplete="off"
            />
            <Card sectioned>
              <ChoiceList
                title=""
                selected={[filters.category]}
                onChange={([val]) => handleFiltersChange('category', val)}
                choices={[{label: 'All categories', value: ''}, ...integrationCategories]}
              />
            </Card>
          </Stack>
        </Layout.Section>
        {[0, 1].map(chunkKey => (
          <Layout.Section oneThird key={chunkKey}>
            <Stack vertical>
              {appChunks
                .filter(app => app[chunkKey])
                .map((app, key) => (
                  <IntegrationCard app={app[chunkKey]} key={key} handleOpenLink={handleOpenLink} />
                ))}
            </Stack>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}

Integration.propTypes = {
  history: PropTypes.object
};
