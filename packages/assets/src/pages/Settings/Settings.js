import React from 'react';
import {
  Checkbox,
  FormLayout,
  InlineGrid,
  Layout,
  LegacyCard,
  LegacyTabs,
  Page,
  Select,
  Spinner
} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import PageInput from '@assets/components/PageInput/PageInput';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import SliderRange from '@assets/components/SliderRange/SliderRange';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import defaultSettings from '@assets/const/defaultSettings.';
import {api} from '@assets/helpers';
import useSelectedTab from '@assets/hooks/tabs/useSelectedTab';
import './settings.css';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {tabSelected, handleTabChange} = useSelectedTab(0);

  const {data: settings, setData: setSettings, loading, setLoading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  if (loading) {
    return (
      <div className="loading">
        <Spinner size={'small'} />
      </div>
    );
  }
  console.log(settings, loading);
  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const pageOptions = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific page', value: 'specific'}
  ];

  const tabs = [
    {
      id: 'Display',
      content: 'Display',
      body: (
        <FormLayout>
          <LegacyCard.Section title="APPEARANCE">
            <DesktopPositionInput
              label="Desktop position"
              value={settings.position}
              onChange={newValue => handleSettingsChange('position', newValue)}
              helpText="The display position of the pop on your website"
            />
          </LegacyCard.Section>
          <LegacyCard.Section>
            <Checkbox
              label="Hide time ago"
              checked={settings.hideTimeAgo}
              onChange={newValue => handleSettingsChange('hideTimeAgo', newValue)}
            />
            <Checkbox
              label="Truncate context text"
              helpText="If you product a name is long for one line, it will be truncate to 'Product na...'"
              checked={settings.truncateProductName}
              onChange={newValue => handleSettingsChange('truncateProductName', newValue)}
            />
          </LegacyCard.Section>
          <LegacyCard.Section title="TIMING">
            <InlineGrid columns={2} gap={400}>
              <SliderRange
                label="Display duration"
                min={0}
                max={360}
                helpText="How long each pop will display on your page."
                unit="second"
                rangeValue={settings.displayDuration}
                handleRangeSliderChange={newValue =>
                  handleSettingsChange('displayDuration', newValue)
                }
              />
              <SliderRange
                label="Time before first pop"
                min={0}
                max={360}
                helpText="The delay time before the first notification."
                unit="second"
                rangeValue={settings.firstDelay}
                handleRangeSliderChange={newValue => handleSettingsChange('firstDelay', newValue)}
              />
              <SliderRange
                label="Gap time between two pops"
                min={0}
                max={360}
                helpText="The time interval between two popups notifications"
                unit="second"
                rangeValue={settings.popsInterval}
                handleRangeSliderChange={newValue => handleSettingsChange('popsInterval', newValue)}
              />
              <SliderRange
                label="Maximum of popups"
                min={0}
                max={80}
                helpText="The maximum number of popups allowed to show after page loading. Maximum number is 80."
                unit="pop"
                rangeValue={settings.maxPopsDisplay}
                handleRangeSliderChange={newValue =>
                  handleSettingsChange('maxPopsDisplay', newValue)
                }
              />
            </InlineGrid>
          </LegacyCard.Section>
        </FormLayout>
      )
    },
    {
      id: 'Triggers',
      content: 'Triggers',
      body: (
        <FormLayout>
          <LegacyCard.Section>
            <Select
              label="PAGE RESTRICTION"
              options={pageOptions}
              value={settings.allowShow}
              onChange={newValue => handleSettingsChange('allowShow', newValue)}
            />
          </LegacyCard.Section>
          {settings.allowShow === 'all' ? (
            <LegacyCard.Section>
              <PageInput
                label={'Excluded pages'}
                value={settings.excludedUrls}
                handleChange={newValue => handleSettingsChange('excludedUrls', newValue)}
                line={4}
              />
            </LegacyCard.Section>
          ) : (
            <LegacyCard.Section>
              <PageInput
                label={'Included pages'}
                value={settings.includedUrls}
                handleChange={newValue => handleSettingsChange('includedUrls', newValue)}
                line={4}
              />
              <br />
              <PageInput
                label={'Excluded pages'}
                value={settings.excludedUrls}
                handleChange={newValue => handleSettingsChange('excludedUrls', newValue)}
                line={4}
              />
            </LegacyCard.Section>
          )}
        </FormLayout>
      )
    }
  ];

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      const res = await api('/settings', {
        method: 'PUT',
        body: {data: settings}
      });

      console.log(res);
      await api('/settings', {
        method: 'GET'
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginBottom: '50px'}}>
      <Page
        title="Settings"
        subtitle="Dicide how your notifications will display"
        primaryAction={{
          content: 'Save',
          onAction: handleSaveSettings
        }}
      >
        <Layout sectioned>
          <InlineGrid columns={['oneThird', 'twoThirds']}>
            <div>
              <NotificationPopup
                firstName="John Doe"
                city="New York"
                country="US"
                productName="Puffer Jacket With Hidden Hood"
                productImage="https://s.net.vn/pA9G"
                time="a day ago"
              />
            </div>
            <LegacyCard>
              <LegacyTabs tabs={tabs} selected={tabSelected} onSelect={handleTabChange}>
                <LegacyCard.Section>{tabs[tabSelected].body}</LegacyCard.Section>
              </LegacyTabs>
            </LegacyCard>
          </InlineGrid>
        </Layout>
      </Page>
    </div>
  );
}
Settings.propTypes = {};
