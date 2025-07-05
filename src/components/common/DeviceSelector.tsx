import React, { useState, useEffect, useRef } from "react";
import { Button, Select, Switch, Alert } from "@/components/ui";
// import { useMediaDevices } from "../hooks";
import "./DeviceSelector.scss";
import { useMediaDevices } from "../hooks/useMeetingSetup";

interface DeviceSelectorProps {
  initialAudioDeviceId?: string;
  initialVideoDeviceId?: string;
  initialAudioEnabled?: boolean;
  initialVideoEnabled?: boolean;
  onDeviceChange?: (config: {
    audioDeviceId: string;
    videoDeviceId: string;
    audioEnabled: boolean;
    videoEnabled: boolean;
  }) => void;
  onConfirm?: (config: {
    audioDeviceId: string;
    videoDeviceId: string;
    audioEnabled: boolean;
    videoEnabled: boolean;
  }) => void;
  onCancel?: () => void;
  showPreview?: boolean;
  showConfirmButtons?: boolean;
  className?: string;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  initialAudioDeviceId = "",
  initialVideoDeviceId = "",
  initialAudioEnabled = true,
  initialVideoEnabled = true,
  onDeviceChange,
  onConfirm,
  onCancel,
  showPreview = true,
  showConfirmButtons = false,
  className = "",
}) => {
  const [audioEnabled, setAudioEnabled] = useState(initialAudioEnabled);
  const [videoEnabled, setVideoEnabled] = useState(initialVideoEnabled);
  const [audioDeviceId, setAudioDeviceId] = useState(initialAudioDeviceId);
  const [videoDeviceId, setVideoDeviceId] = useState(initialVideoDeviceId);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { devices: audioDevices, loading: audioLoading } =
    useMediaDevices("audioinput");
  const { devices: videoDevices, loading: videoLoading } =
    useMediaDevices("videoinput");

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // Initialize media stream with selected devices
  useEffect(() => {
    const enableMediaStream = async () => {
      try {
        // Stop any existing tracks
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop());
        }

        // Skip if both audio and video are disabled
        if (!audioEnabled && !videoEnabled) {
          setLocalStream(null);
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          return;
        }

        const constraints = {
          audio: audioEnabled
            ? {
                deviceId: audioDeviceId ? { exact: audioDeviceId } : undefined,
              }
            : false,
          video: videoEnabled
            ? {
                deviceId: videoDeviceId ? { exact: videoDeviceId } : undefined,
                width: { ideal: 1280 },
                height: { ideal: 720 },
              }
            : false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current
            .play()
            .catch((e) => console.error("Error playing video:", e));
        }

        setError(null);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError(
          "Failed to access media devices. Please check your permissions."
        );

        // Handle specific error cases
        if (err.name === "NotAllowedError") {
          setError(
            "Permission denied. Please allow access to your microphone and camera."
          );
        } else if (err.name === "NotFoundError") {
          setError("No matching device found. Please check your connections.");
        }

        // Fallback to disabled state if access is denied
        if (!audioEnabled && !videoEnabled) return;

        setAudioEnabled(false);
        setVideoEnabled(false);
      }
    };

    enableMediaStream();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [audioEnabled, videoEnabled, audioDeviceId, videoDeviceId]);

  // Set default devices when available
  useEffect(() => {
    if (audioDevices.length > 0 && !audioDeviceId) {
      const defaultAudio =
        audioDevices.find((d) => d.deviceId === "default") || audioDevices[0];
      setAudioDeviceId(defaultAudio.deviceId);
    }
    if (videoDevices.length > 0 && !videoDeviceId) {
      const defaultVideo =
        videoDevices.find((d) => d.deviceId === "default") || videoDevices[0];
      setVideoDeviceId(defaultVideo.deviceId);
    }
  }, [audioDevices, videoDevices]);

  // Notify parent of device changes
  useEffect(() => {
    if (onDeviceChange) {
      onDeviceChange({
        audioDeviceId: audioEnabled ? audioDeviceId : "",
        videoDeviceId: videoEnabled ? videoDeviceId : "",
        audioEnabled,
        videoEnabled,
      });
    }
  }, [audioDeviceId, videoDeviceId, audioEnabled, videoEnabled]);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({
        audioDeviceId: audioEnabled ? audioDeviceId : "",
        videoDeviceId: videoEnabled ? videoDeviceId : "",
        audioEnabled,
        videoEnabled,
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleToggleAudio = (enabled: boolean) => {
    setAudioEnabled(enabled);
    if (!enabled) setVideoEnabled(true); // Ensure at least one is enabled
  };

  const handleToggleVideo = (enabled: boolean) => {
    setVideoEnabled(enabled);
    if (!enabled) setAudioEnabled(true); // Ensure at least one is enabled
  };

  return (
    <div className={`device-selector ${className}`}>
      {error && <Alert type="error" message={error} className="device-error" />}

      <div className="device-selector-content">
        {showPreview && (
          <div className="media-preview">
            <div className="video-container">
              {videoEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={localStream ? "active" : "inactive"}
                />
              ) : (
                <div className="audio-only-preview">
                  <div className="audio-visualizer"></div>
                  <p>Audio only</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="device-controls">
          <div className="control-group">
            <Switch
              label="Microphone"
              checked={audioEnabled}
              onChange={handleToggleAudio}
              disabled={audioLoading || audioDevices.length === 0}
            />
            {audioEnabled && (
              <Select
                label="Select microphone"
                value={audioDeviceId}
                onChange={setAudioDeviceId}
                options={audioDevices.map((device) => ({
                  value: device.deviceId,
                  label:
                    device.label ||
                    `Microphone ${audioDevices.indexOf(device) + 1}`,
                }))}
                disabled={audioLoading || audioDevices.length === 0}
                loading={audioLoading}
              />
            )}
          </div>

          <div className="control-group">
            <Switch
              label="Camera"
              checked={videoEnabled}
              onChange={handleToggleVideo}
              disabled={videoLoading || videoDevices.length === 0}
            />
            {videoEnabled && (
              <Select
                label="Select camera"
                value={videoDeviceId}
                onChange={setVideoDeviceId}
                options={videoDevices.map((device) => ({
                  value: device.deviceId,
                  label:
                    device.label ||
                    `Camera ${videoDevices.indexOf(device) + 1}`,
                }))}
                disabled={videoLoading || videoDevices.length === 0}
                loading={videoLoading}
              />
            )}
          </div>
        </div>
      </div>

      {showConfirmButtons && (
        <div className="device-actions">
          <Button
            variant="secondary"
            onClick={handleCancel}
            className="action-button"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="action-button"
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeviceSelector;
