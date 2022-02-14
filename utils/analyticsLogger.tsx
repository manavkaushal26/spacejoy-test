/**
ReactGA.event({
  category: 'Promotion',
  action: 'Displayed Promotional Widget',
  label: 'Homepage Thing',
  nonInteraction: true
});

[args.category]	String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
[args.action]	String. Required. A description of the behaviour. E.g. 'Clicked Delete', 'Added a component', 'Deleted account', etc.
[args.label]	String. Optional. More precise labelling of the related action. E.g. alongside the 'Added a component' action, we could add the name of a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.
[args.value]	Int. Optional. A means of recording a numerical value against an event. E.g. a rating, a score, etc.
[args.nonInteraction]	Boolean. Optional. If an event is not triggered by a user interaction, but instead by our code (e.g. on page load, it should be flagged as a nonInteraction event to avoid skewing bounce rate data.
[args.transport]	String. Optional. This specifies the transport mechanism with which hits will be sent. Valid values include 'beacon', 'xhr', or 'image'.

 */

import ReactGA from 'react-ga';
import { page } from './config';
import { reactLocalStorage } from './helpers';

const prod = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

declare global {
  interface Window {
    dataLayer: any;
  }
}

const EventName = {
  click: 'Click',
  landingPage: 'LandingPage',
  routeChange: 'RouteChange',
  PWAInstalled: 'PWAInstalled',
};

const dataToPush = (data, type) => {
  if (prod && typeof window !== 'undefined') {
    window?.dataLayer?.push({ data, ...{ event: type } });
    if (type === EventName.routeChange || type === EventName.landingPage) {
      window?.dataLayer?.push({ event: 'optimize.activate' });
    }
  }
};

const initAnalytics = () => {
  if (prod) {
    ReactGA.initialize(page.ga);
  }
};

const logPageView = () => {
  if (prod) {
    ReactGA.set({ page: window?.location?.pathname });
    ReactGA.pageview(window?.location?.pathname + window?.location?.search);
  }
};

const logEvent = (category = '', action = '', label = '', value = '') => {
  if (prod && category && action) {
    ReactGA.event({ category, action, label, value: parseInt(value, 10) });
  }
};

const logException = (description = '', fatal = false) => {
  if (prod && description) {
    ReactGA.exception({ description, fatal });
  }
};

const PushEvent = async (data) => {
  const { category, action, label, value } = data;
  const userFromLS = await reactLocalStorage.getObject('authVerification');
  const categoryLabel = `Web${window.location.pathname} | ${category}`;
  const labelWithUserData = `${label} | user Name - ${userFromLS.name || 'Guest'}`;
  dataToPush(data, EventName.click);
  logEvent(categoryLabel, action, labelWithUserData, value);
};

const LandingPage = (data) => {
  dataToPush(data, EventName.landingPage);
  logPageView();
};

const RouteChange = (data) => {
  dataToPush(data, EventName.routeChange);
  logPageView();
};

const PwaInstalled = (data) => {
  dataToPush(data, EventName.PWAInstalled);
};

export { PushEvent, LandingPage, RouteChange, PwaInstalled, initAnalytics, logException };
