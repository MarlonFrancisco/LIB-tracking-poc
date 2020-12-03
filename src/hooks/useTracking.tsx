import React, { useEffect, useCallback } from 'react';

import { DATALAYER_PAGES_BASIC_INFO } from '../shared/utils/constants-datalayer';
import { sendDataLayer, parseTrackingData, validateCustomTrackingData } from '../shared/utils/tracking';
import { noSSR } from '../shared/utils';
import { TrackingData } from '../shared/@types';

const defaultOptions = {
  customDispatch: (data: TrackingData) => {},
  dispatchOnMount: false,
};

export const useTracking = (trackingData: TrackingData, options = defaultOptions) => {
  const { customDispatch, dispatchOnMount } = options;

  useEffect(() => {
    return () => {
      sendDataLayer({});
    };
  }, []);

  const dispatchAnalyticsEvent = useCallback(
    (data: TrackingData) => {
      try {
        validateCustomTrackingData(data);

        const pageBasicTrackingData = DATALAYER_PAGES_BASIC_INFO()[data.context];

        const { eventType, datalayer } = parseTrackingData(pageBasicTrackingData, data);

        sendDataLayer(datalayer, eventType);

        customDispatch(data);
      } catch (err) {
        console.error(err);
      }
    },
    [customDispatch],
  );

  useEffect(() => {
    if (dispatchOnMount && trackingData) {
      dispatchAnalyticsEvent(trackingData);
    }
  }, [dispatchOnMount, trackingData, dispatchAnalyticsEvent]);

  return {
    trackingData,
    dispatchAnalyticsEvent: noSSR(dispatchAnalyticsEvent),
  };
};

export const withTracking = (WrapperComponent: any) => {
  return class extends React.Component {
    constructor(...props: any) {
      super(props);
    }

    componentWillUnmount() {
      sendDataLayer({});
    }

    dispatchEvent = (data: TrackingData) => {
      try {
        validateCustomTrackingData(data);
        const pageBasicTrackingData = DATALAYER_PAGES_BASIC_INFO()[data.context];

        const { eventType, datalayer } = parseTrackingData(pageBasicTrackingData, data);

        sendDataLayer(datalayer, eventType);
      } catch (err) {
        console.error(err);
      }
    };

    render() {
      return <WrapperComponent {...this.props} dispatchAnalyticsEvent={noSSR(this.dispatchEvent)} />;
    }
  };
};
