import React, { useRef, useCallback, useEffect } from 'react';

import Webcam from 'react-webcam';

interface WebcamCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => console.log('Camera access granted ✅'))
      .catch((err) => console.error('Camera error ❌', err));
  }, []);
  

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    // Convert base64 to File
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file);
        onClose();
      });
  }, [webcamRef]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg"
      />
      <div className="mt-4 space-x-2">
        <button onClick={capture} className="bg-blue-600 text-white px-4 py-2 rounded">
          Capture
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WebcamCapture;
