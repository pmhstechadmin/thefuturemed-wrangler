// src/hooks/useMixpanel.ts

import { useEffect } from 'react';
import { mixpanelInstance } from './mixpanel';

export const useMixpanel = () => {
  // Identify user when available
  const identify = (userId: string) => {
    mixpanelInstance.identify(userId);
  };

  // Track events with typed properties
  const track = (eventName: string, properties?: Record<string, any>) => {
    mixpanelInstance.track(eventName, properties);
  };

  // Set user properties
  const setUserProps = (props: Record<string, any>) => {
    mixpanelInstance.people.set(props);
  };

  // Track page views
  const trackPageView = (pageName: string) => {
    track('Page View', { page: pageName });
  };

  return {
    identify,
    track,
    setUserProps,
    trackPageView,
  };
};