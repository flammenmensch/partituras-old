import {
  componentFromStreamWithConfig,
  createEventHandlerWithConfig,
  mapPropsStreamWithConfig,
} from 'recompose';

import rxjsConfig from 'recompose/rxjsObservableConfig';

export const componentFromStream = componentFromStreamWithConfig(rxjsConfig);
export const createEventHandler = createEventHandlerWithConfig(rxjsConfig);
export const mapPropsStream = mapPropsStreamWithConfig(rxjsConfig);
