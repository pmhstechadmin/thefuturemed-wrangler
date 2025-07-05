export const generateToken = async (): Promise<string> => {
    const token = import.meta.env.VITE_VIDEOSDK_TOKEN;
    if (!token) throw new Error("VideoSDK token not configured");
    return token;
  };
  
  export const createMeeting = async (token: string): Promise<string> => {
    try {
      const response = await fetch("https://api.videosdk.live/v2/rooms", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Failed to create meeting");
      const { roomId } = await response.json();
      return roomId;
    } catch (error) {
      console.error("Meeting creation error:", error);
      throw error;
    }
  };