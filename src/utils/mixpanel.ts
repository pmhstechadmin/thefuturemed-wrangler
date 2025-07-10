// src/utils/mixpanel.js
import mixpanel from 'mixpanel-browser';

mixpanel.init('3f6a035015c6ab2d765e5bff2efe39df', {
  debug: true,
  track_pageview: false, // We'll handle it manually
});

export default mixpanel;
