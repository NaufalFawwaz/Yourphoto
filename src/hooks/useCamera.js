import { useEffect, useRef } from 'react';

const useCamera = (selectedLayout) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please check permissions.');
      }
    };

    if (selectedLayout) {
      initCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [selectedLayout]);

  return { videoRef, streamRef, containerRef };
};

export default useCamera;