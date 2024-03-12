import {RangeSlider, Text} from '@shopify/polaris';
import React from 'react';

export default function SliderRange({
  label, min, max, helpText, rangeValue, handleRangeSliderChange, unit
}) {
  return (
    <RangeSlider
      output
      label={label}
      min={min}
      max={max}
      helpText={helpText}
      value={rangeValue}
      onChange={handleRangeSliderChange}
      suffix={
        <div
          style={{
            minWidth: '32px',
            border: '1px solid gray',
            borderRadius: '4px 8px',
            padding: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{marginRight: '8px'}}>{rangeValue}</span>
          <Text variant="bodyXs" as="span">
            {unit}(s)
          </Text>
        </div>
      }
    />
  );
}
