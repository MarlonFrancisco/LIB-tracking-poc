import { Datalayer, DATALAYER_PAGES, TrackingData } from '../@types';
import { FIELDS_DATALAYER_NOT_TO_SANITIZE } from './constants-datalayer';
import { toKebabCase } from './string';
import { onClientSide } from './index';

export const sanitizeObjectValues = <T>(obj: T): any => {
  const sanitized = Object.entries(obj).reduce((prevItem, currentItem) => {
    const [key, value] = currentItem;

    if (typeof value === 'object') {
      return {
        ...prevItem,
        [key]: sanitizeObjectValues(value),
      };
    }

    const transformCase = typeof value === 'string' && !FIELDS_DATALAYER_NOT_TO_SANITIZE.includes(key);
    return {
      ...prevItem,
      [key]: transformCase ? toKebabCase(String(value)) : value,
    };
  }, {});

  return sanitized;
};

export const mergeDefaultTrackingDataAndCustomTrackingData = (
  pageBasicTrackingData: Datalayer,
  customTrackingData: Datalayer,
) => {
  const pageBasicTrackingDataEntries = Object.entries(pageBasicTrackingData);
  const customTrackingDataEntries = Object.entries(customTrackingData);

  const merge = [...pageBasicTrackingDataEntries, ...customTrackingDataEntries].reduce<Datalayer>((acc, crr) => {
    const [key, value] = crr;

    const currentlayerValueIsString = typeof value === 'string';

    if (currentlayerValueIsString) {
      return {
        ...acc,
        [key]: value,
      };
    }

    const layerValuePrevSave = acc[key as keyof Datalayer];
    return {
      ...acc,
      [key]: {
        ...(layerValuePrevSave || {}),
        ...value,
      },
    };
  }, {});

  return merge;
};

export const parseTrackingData = (pageBasicTrackingData: Datalayer, customTrackingData: TrackingData) => {
  const sanitizedCustomTrackingData = sanitizeObjectValues<Datalayer>(customTrackingData.data);

  const currentDatalayerValue = {
    ...pageBasicTrackingData,
    ...window.objDataLayer,
  };

  const mappingTrackingDataToDatalayer = mergeDefaultTrackingDataAndCustomTrackingData(
    currentDatalayerValue,
    sanitizedCustomTrackingData,
  );

  const { eventType } = customTrackingData;
  return {
    eventType,
    datalayer: mappingTrackingDataToDatalayer,
  };
};

export const validateCustomTrackingData = (trackingData: TrackingData) => {
  if (!trackingData.context) {
    throw new Error('Context is mandatory');
  }
};

export const sendDataLayer = (objeto: Datalayer, eventType?: string) => {
  if (window.objDataLayer && typeof window.objDataLayer !== 'undefined') {
    window.objDataLayer = objeto;
  }
  if (eventType) sendDispatchEvent(eventType);
};

export const sendDispatchEvent = (eventType: string) => {
  if (onClientSide()) {
    console.log(eventType, window.objDataLayer);
    document.dispatchEvent(new CustomEvent(eventType, { detail: window.objDataLayer }));
    console.log('eventType', eventType);
  }
};

export const createTrackingData = (eventType: string, context: DATALAYER_PAGES, data: Datalayer) => ({
  eventType,
  context,
  data,
});
