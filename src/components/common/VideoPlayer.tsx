import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Slider, Select, Tooltip } from "./components";
// import { formatTime } from "./pages/utils";
import "./VideoPlayer.scss";
import { formatTime } from "../utils";

interface VideoPlayerProps {
  src: string | MediaStream;
  poster?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playbackRates?: number[];
  qualityOptions?: { label: string; value: string }[];
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
  qualityOptions,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  onFullscreenChange,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState(
    qualityOptions?.[0]?.value || ""
  );
  const [showControls, setShowControls] = useState(controls);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showPlaybackRate, setShowPlaybackRate] = useState(false);
  const [showQuality, setShowQuality] = useState(false);

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current
        ?.play()
        .catch((e) => console.error("Error playing video:", e));
    }
  }, [isPlaying]);

  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      onTimeUpdate?.(videoRef.current.currentTime);
    }
  }, [onTimeUpdate]);

  // Handle progress (buffering)
  const handleProgress = useCallback(() => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(
        videoRef.current.buffered.length - 1
      );
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setBufferProgress((bufferedEnd / duration) * 100);
      }
    }
  }, []);

  // Handle seeking
  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !videoRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const seekTime = pos * duration;

      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    },
    [duration]
  );

  // Handle volume change
  const handleVolumeChange = useCallback((value: number) => {
    if (!videoRef.current) return;

    const newVolume = Math.min(Math.max(value, 0), 1);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }, []);

  // Handle mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (newMuted) {
      setVolume(0);
    } else {
      videoRef.current.volume = volume > 0 ? volume : 0.5;
      setVolume(volume > 0 ? volume : 0.5);
    }
  }, [isMuted, volume]);

  // Handle playback rate change
  const handlePlaybackRateChange = useCallback((rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowPlaybackRate(false);
  }, []);

  // Handle quality change
  const handleQualityChange = useCallback((value: string) => {
    setSelectedQuality(value);
    setShowQuality(false);
    // In a real app, you would switch the video source here
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!playerRef.current) return;

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if ((playerRef.current as any).webkitRequestFullscreen) {
        (playerRef.current as any).webkitRequestFullscreen();
      } else if ((playerRef.current as any).msRequestFullscreen) {
        (playerRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }, [isFullscreen]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 5;
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 5;
          break;
        case "ArrowUp":
          handleVolumeChange(Math.min(volume + 0.1, 1));
          break;
        case "ArrowDown":
          handleVolumeChange(Math.max(volume - 0.1, 0));
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullscreen();
          break;
        default:
          break;
      }
    },
    [togglePlay, volume, handleVolumeChange, toggleMute, toggleFullscreen]
  );

  // Set up event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleFullscreenChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isFs);
      onFullscreenChange?.(isFs);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("durationchange", () => {
      setDuration(video.duration || 0);
    });
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    // Initialize duration
    if (video.duration) {
      setDuration(video.duration);
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("progress", handleProgress);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleTimeUpdate,
    handleProgress,
    handleKeyDown,
    onPlay,
    onPause,
    onEnded,
    onFullscreenChange,
  ]);

  // Handle source changes
  useEffect(() => {
    if (!videoRef.current) return;

    if (typeof src === "string") {
      videoRef.current.src = src;
    } else {
      videoRef.current.srcObject = src;
    }

    if (autoPlay) {
      videoRef.current.play().catch((e) => console.error("Autoplay error:", e));
    }
  }, [src, autoPlay]);

  // Toggle controls visibility on mouse movement
  useEffect(() => {
    if (!controls) return;

    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [controls]);

  return (
    <div
      ref={playerRef}
      className={`video-player ${className} ${
        isFullscreen ? "fullscreen" : ""
      }`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        poster={poster}
        loop={loop}
        muted={isMuted}
        playsInline
        className="video-element"
      />

      {(showControls || !isPlaying) && (
        <div className="video-controls">
          {/* Progress bar */}
          <div
            ref={progressRef}
            className="progress-container"
            onClick={handleSeek}
          >
            <div
              className="buffer-progress"
              style={{ width: `${bufferProgress}%` }}
            />
            <div
              className="progress-bar"
              style={{
                width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
            <div
              className="progress-thumb"
              style={{
                left: `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
          </div>

          {/* Bottom controls */}
          <div className="controls-bottom">
            <div className="controls-left">
              {/* Play/Pause button */}
              <Button
                variant="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </Button>

              {/* Volume controls */}
              <div className="volume-controls">
                <Button
                  variant="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </Button>

                <Slider
                  value={isMuted ? 0 : volume}
                  onChange={(value) => {
                    handleVolumeChange(value);
                    if (value === 0) {
                      setIsMuted(true);
                    } else if (isMuted) {
                      setIsMuted(false);
                    }
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                  className="volume-slider"
                />
              </div>

              {/* Time display */}
              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="controls-right">
              {/* Playback rate */}
              {playbackRates.length > 0 && (
                <div className="settings-menu">
                  <Button
                    variant="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlaybackRate(!showPlaybackRate);
                      setShowQuality(false);
                    }}
                    aria-label="Playback rate"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
                    </svg>
                  </Button>

                  {showPlaybackRate && (
                    <div className="settings-dropdown">
                      {playbackRates.map((rate) => (
                        <button
                          key={rate}
                          className={`dropdown-item ${
                            playbackRate === rate ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaybackRateChange(rate);
                          }}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quality selector */}
              {qualityOptions && qualityOptions.length > 0 && (
                <div className="settings-menu">
                  <Button
                    variant="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowQuality(!showQuality);
                      setShowPlaybackRate(false);
                    }}
                    aria-label="Quality settings"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </Button>

                  {showQuality && (
                    <div className="settings-dropdown">
                      {qualityOptions.map((option) => (
                        <button
                          key={option.value}
                          className={`dropdown-item ${
                            selectedQuality === option.value ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQualityChange(option.value);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Fullscreen button */}
              <Button
                variant="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
              >
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M7 16h2v2h2v-2h2v-2H9v-2H7v2H5v2h2v2zm10-2h-2v2h-2v2h2v-2h2v-2h2v-2h-2v2zm0-8h2v2h-2V6zm-4 0h2v2h-2V6zM5 6h2v2H5V6zm0 8h2v2H5v-2zm8-8h2v2h-2V6z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
