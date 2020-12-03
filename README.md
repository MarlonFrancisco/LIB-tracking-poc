# Tracking

Tracking is a JS library for dealing with analytics events dispatch and sending information to the data layer object.

## Installation

Use the package manager [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) to install Tracking.

```bash
npm i --save trackingpoc

or

yarn add trackingpoc
```

## Usage Hook

```python
import {useTracking, DATALAYER_PAGES, createTrackingData} from 'trackingpoc'

const {dispatchAnalyticsEvent} = useTracking();

useEffect(() => {
    const objDatalayer = {
      site: {},
    };
    const trackingData = createTrackingData('eventType', DATALAYER_PAGES.home, objDatalayer)
    dispatchAnalyticsEvent(trackingData);
}, [])
```

## Usage HoC

```python
import {withTracking, DATALAYER_PAGES, createTrackingData} from 'trackingpoc'

class Component {
  constructor(...props) {
    const { dispatchAnalyticsEvent } = this.props;

    this.dispatchAnalyticsEvent = dispatchAnalyticsEvent;
  }

  handleSendDataLayer(eventType) {
    const objDatalayer = {
      site: {},
    };
    const trackingData = createTrackingData(
      eventType,
      DATALAYER_PAGES.home,
      objDatalayer
    );
    this.dispatchAnalyticsEvent(trackingData);
  }
}

export default withTracking(Component);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

