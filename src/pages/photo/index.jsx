import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CameraPreview from '@/components/PhotoBooth/CameraPreview';
import PreviewPanel from '@/components/PhotoBooth/PreviewPanel';
import useCamera from '@/hooks/useCamera';
import usePhotoCapture from '@/hooks/usePhotoCapture';
import { layoutOptions } from '@/utils/layoutUtils';
import { generateFinalImage, mapClassToCanvasFilter } from '@/utils/photoUtils';
import { useTheme } from '@/context/ThemeContext';

const PhotoPage = () => {
  const router = useRouter();
  const { layout } = router.query;
  const { isDarkMode } = useTheme();

  const [selectedLayout, setSelectedLayout] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneratingFinal, setIsGeneratingFinal] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const { videoRef, containerRef } = useCamera(selectedLayout);
  const {
    capturedPhotos,
    countdown,
    isCapturing,
    selectedFilter,
    activeStickers,
    showFilterPanel,
    showStickerPanel,
    filterPanelRef,
    stickerPanelRef,
    startCapture,
    removePhoto,
    resetPhotos,
    handleFilterSelect,
    addSticker,
    removeSticker,
    handleStickerMouseDown,
    handleStickerTouchStart,
    setShowFilterPanel,
    setShowStickerPanel,
    setCountdown,
    setIsCapturing,
    setCapturedPhotos,
    setActiveStickers
  } = usePhotoCapture(videoRef, containerRef);

  useEffect(() => {
    if (layout) {
      const layoutId = parseInt(layout);
      const foundLayout = layoutOptions.find((l) => l.id === layoutId);
      setSelectedLayout(foundLayout || null);
      resetAll();
      setCurrentStep(0);
      setFinalImage(null);
    }
  }, [layout]);

  const resetAll = () => {
    resetPhotos();
    setCurrentStep(0);
    setFinalImage(null);
  };

  useEffect(() => {
    let timer;
    if (isCapturing && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (isCapturing && countdown === 0) {
      capturePhoto();
    }
    return () => clearTimeout(timer);
  }, [isCapturing, countdown]);

  const capturePhoto = async () => {
    if (videoRef.current && containerRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = videoRef.current.videoWidth || 1280;
      canvas.height = videoRef.current.videoHeight || 720;

      const canvasFilter = mapClassToCanvasFilter(selectedFilter);
      
      context.save();
      context.filter = canvasFilter;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      context.restore();

      if (activeStickers.length > 0) {
        const rect = containerRef.current.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        activeStickers.forEach((sticker) => {
          const cx = sticker.position.x * scaleX;
          const cy = sticker.position.y * scaleY;
          const fontPx = Math.round((sticker.size || 48) * Math.min(scaleX, scaleY));
          
          context.font = `${fontPx}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji", Arial, sans-serif`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(sticker.emoji, cx, cy);
        });
      }

      const photoDataUrl = canvas.toDataURL('image/png');

      setCapturedPhotos((prev) => [...prev, photoDataUrl]);
      setCurrentStep((prev) => prev + 1);
      setIsCapturing(false);
      setCountdown(3);
      setActiveStickers([]);
    }
  };

  const handleRemovePhoto = (indexToRemove) => {
    removePhoto(indexToRemove);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setFinalImage(null);
  };

  const handleReset = () => {
    resetAll();
  };

  useEffect(() => {
    const needed = parseInt(selectedLayout?.posts?.match(/\d+/)?.[0] || 0);
    if (selectedLayout && capturedPhotos.length > 0 && capturedPhotos.length === needed) {
      if (!finalImage && !isGeneratingFinal) {
        setIsGeneratingFinal(true);
        generateFinalImage(capturedPhotos, selectedLayout)
          .then((result) => {
            setFinalImage(result);
            setIsGeneratingFinal(false);
          })
          .catch((e) => {
            console.error('generate preview failed', e);
            setIsGeneratingFinal(false);
          });
      }
    }
  }, [capturedPhotos, selectedLayout, finalImage, isGeneratingFinal]);

  const downloadFinalWithLayout = async () => {
    if (finalImage) {
      const link = document.createElement('a');
      link.download = `photobooth-${selectedLayout.title}-${Date.now()}.png`;
      link.href = finalImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (isGeneratingFinal) return;
    try {
      setIsGeneratingFinal(true);
      const result = await generateFinalImage(capturedPhotos, selectedLayout);
      setFinalImage(result);
      if (result) {
        const link = document.createElement('a');
        link.download = `photobooth-${selectedLayout.title}-${Date.now()}.png`;
        link.href = result;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Download error:', err);
      alert('Error generating download. Please try again.');
    } finally {
      setIsGeneratingFinal(false);
    }
  };

  if (!selectedLayout) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}>
        <h1 className="text-2xl font-bold mb-4">No layout selected</h1>
        <Link href="/layout" className={`hover:underline flex items-center ${
          isDarkMode ? 'text-blue-400' : 'text-blue-500'
        }`}>
          <ArrowLeft size={16} className="mr-2" />
          Choose a layout first
        </Link>
      </div>
    );
  }

  const totalPhotos = parseInt(selectedLayout.posts.match(/\d+/)[0]);
  const isComplete = currentStep === totalPhotos;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-black'
    }`}>
      <Head>
        <title>Photobooth - {selectedLayout.title}</title>
        <meta name="description" content={`Take photos with ${selectedLayout.title} layout`} />
      </Head>

      <div className="container mx-auto flex justify-center pt-5">
        <h1 className="text-xl font-bold">YourPhoto - {selectedLayout.title}</h1>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {Array.from({ length: totalPhotos }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-2 rounded-full ${
                  index < currentStep 
                    ? (isDarkMode ? 'bg-green-400' : 'bg-green-500') 
                    : (isDarkMode ? 'bg-gray-600' : 'bg-gray-300')
                }`}
              ></div>
            ))}
          </div>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Photo {currentStep} of {totalPhotos}
            {isComplete && ' - Complete!'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          <CameraPreview
            videoRef={videoRef}
            containerRef={containerRef}
            selectedFilter={selectedFilter}
            activeStickers={activeStickers}
            isCapturing={isCapturing}
            countdown={countdown}
            showFilterPanel={showFilterPanel}
            showStickerPanel={showStickerPanel}
            filterPanelRef={filterPanelRef}
            stickerPanelRef={stickerPanelRef}
            onFilterSelect={handleFilterSelect}
            onAddSticker={addSticker}
            onRemoveSticker={removeSticker}
            onStickerMouseDown={handleStickerMouseDown}
            onStickerTouchStart={handleStickerTouchStart}
            onStartCapture={startCapture}
            currentStep={currentStep}
            totalPhotos={totalPhotos}
            setShowFilterPanel={setShowFilterPanel}
            setShowStickerPanel={setShowStickerPanel}
          />

          <PreviewPanel
            capturedPhotos={capturedPhotos}
            isGeneratingFinal={isGeneratingFinal}
            onRemovePhoto={handleRemovePhoto}
            onDownload={downloadFinalWithLayout}
            onReset={handleReset}
          />
        </div>

        {finalImage && (
          <div className={`w-full max-w-md mx-auto mt-8 p-4 rounded-lg shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Final Result
            </h3>
            <div className="flex justify-center">
              <img
                src={finalImage}
                alt="Final result with layout"
                className="max-w-full h-auto rounded-md border"
                style={{ 
                  maxHeight: '400px',
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                }}
              />
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PhotoPage;