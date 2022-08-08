import React, {useMemo, useState} from 'react';
import {Card, ChoiceList, Icon, Layout, Stack, TextField, Page} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import ProductCard from '@assets/components/molecules/ProductCard';
import {integrationApps, integrationCategories} from '@assets/config/integration/appList';
import PropTypes from 'prop-types';
import useScreenType from '@assets/hooks/utils/useScreenType';
import {chunk} from '@avada/utils';

/**
 * @return {React.ReactElement}
 * @constructor
 */
export default function Integration({history}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const screenType = useScreenType();
  const isDesktop = screenType.isDesktop || screenType.isLargeDesktop;

  const appChunks = useMemo(() => {
    return chunk(
      integrationApps.filter(
        item =>
          (!selected || item.category === selected) &&
          (!search || item.title.toLowerCase().includes(search))
      ),
      2
    );
  }, [search, selected]);

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
              value={search}
              placeholder="Search by name"
              onChange={setSearch}
              prefix={<Icon source={SearchMinor} />}
              autoComplete="off"
            />
            <Card sectioned>
              <ChoiceList
                title=""
                selected={[selected]}
                onChange={([val]) => setSelected(val)}
                choices={[{label: 'All Categories', value: ''}, ...integrationCategories]}
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
                  <ProductCard app={app[chunkKey]} key={key} handleOpenLink={handleOpenLink} />
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
