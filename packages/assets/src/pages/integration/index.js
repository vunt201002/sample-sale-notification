import React, {useState} from 'react';
import {Card, ChoiceList, Icon, Layout, Stack, TextField, Page} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import ProductCard from '@assets/components/ProductCard';
import {appList} from '@assets/config/integration/appList';
import PropTypes from 'prop-types';
import useScreenType from '@assets/hooks/utils/useScreenType';

/**
 * @return {React.ReactElement}
 * @constructor
 */
export default function Integration({history}) {
  const [intApps, setIntApps] = useState(appList);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('all');
  const screenType = useScreenType();
  const isDesktop = screenType.isDesktop || screenType.isLargeDesktop;

  const handleOpenLink = app => {
    app.external ? window.open(app.url, '_blank') : history.push(app.url);
  };

  const handleSearch = val => {
    setSearch(val);

    if (selected === 'all') {
      return setIntApps(appList.filter(item => item.title.toLowerCase().includes(val)));
    }
    return setIntApps(
      appList
        .filter(item => item.category === selected)
        .filter(item => item.title.toLowerCase().includes(val))
    );
  };

  const handleChangeApp = ([val]) => {
    setSelected(val);
    setIntApps(val === 'all' ? appList : appList.filter(item => item.category === val));
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
              onChange={val => handleSearch(val)}
              prefix={<Icon source={SearchMinor} />}
              autoComplete="off"
            />
            <Card sectioned>
              <ChoiceList
                title=""
                selected={[selected]}
                onChange={handleChangeApp}
                choices={[
                  {label: 'All Categories', value: 'all'},
                  {label: 'Theme Integration', value: 'theme'}
                ]}
              />
            </Card>
          </Stack>
        </Layout.Section>
        <Layout.Section oneThird>
          <Stack vertical>
            {intApps.map((app, appKey) => {
              if (appKey % 2 === 0) {
                return <ProductCard app={app} key={appKey} handleOpenLink={handleOpenLink} />;
              }
            })}
          </Stack>
        </Layout.Section>
        <Layout.Section oneThird>
          <Stack vertical>
            {intApps.map((app, appKey) => {
              if (appKey % 2 === 1) {
                return <ProductCard app={app} key={appKey} handleOpenLink={handleOpenLink} />;
              }
            })}
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Integration.propTypes = {
  history: PropTypes.object
};
