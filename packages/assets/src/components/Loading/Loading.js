import React from 'react';
import {Spinner} from '@shopify/polaris';

/**
 * Global loading component
 *
 * @return {React.FunctionComponent}
 * @constructor
 */
export default function Loading() {
  return (
    <div className="PreLoading">
      <Spinner color="teal" />
    </div>
  );
}
