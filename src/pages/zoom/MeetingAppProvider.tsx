import React, { useState, createContext } from "react";

// Create the context
export const MeetingAppContext = createContext<any>(null);

interface MeetingAppProviderProps {
  children: React.ReactNode;
}

const MeetingAppProvider: React.FC<MeetingAppProviderProps> = ({
  children,
}) => {
  const [selectedMic, setSelectedMic] = useState<any>(null);
  const [selectedWebcam, setSelectedWebcam] = useState<any>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

  return (
    <MeetingAppContext.Provider
      value={{
        selectedMic,
        setSelectedMic,
        selectedWebcam,
        setSelectedWebcam,
        selectedSpeaker,
        setSelectedSpeaker,
      }}
    >
      {children}
    </MeetingAppContext.Provider>
  );
};

export default MeetingAppProvider;
