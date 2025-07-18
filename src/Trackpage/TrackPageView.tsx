import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import mixpanel from "../utils/mixpanel"; // ✅ Correct path to mixpanel.js

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    mixpanel.track("Page View", {
      path: location.pathname,
    });
  }, [location]);

  return null;
};

export default TrackPageView;
