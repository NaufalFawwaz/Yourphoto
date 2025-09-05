import React from 'react';
import { Camera, Filter, Smile } from 'lucide-react';
import FilterPanel from './FilterPanel';
import StickerPanel from './StickerPanel';
import { useTheme } from '@/context/ThemeContext';

const CameraPreview = ({
  videoRef,
  containerRef,
  selectedFilter,
  activeStickers,
  isCapturing,
  countdown,
  showFilterPanel,
  showStickerPanel,
  filterPanelRef,
  stickerPanelRef,
  onFilterSelect,
  onAddSticker,
  onRemoveSticker,
  onStickerMouseDown,
  onStickerTouchStart,
  onStartCapture,
  currentStep,
  totalPhotos,
  setShowFilterPanel,
  setShowStickerPanel
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full lg:w-2/3 max-w-2xl">
      <div
        ref={containerRef}
        className="relative bg-black rounded-lg overflow-hidden shadow-lg">
        {isCapturing && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute bg-white rounded-full w-32 h-32 animate-ping opacity-20"></div>
                <div className="absolute bg-white rounded-full w-28 h-28 animate-ping opacity-15 delay-300"></div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-24 h-24 flex items-center justify-center border-4 border-white shadow-2xl">
                <span className="text-4xl font-bold text-white drop-shadow-lg">
                  {countdown}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 z-30 flex gap-2">
          <button
            onClick={() => {
              setShowFilterPanel((v) => !v);
              setShowStickerPanel(false);
            }}
            className={`p-2 rounded-full transition-colors duration-200 cursor-pointer ${
              showFilterPanel 
                ? 'bg-blue-500 text-white' 
                : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black')
            }`}
            title="Filters"
          >
            <Filter size={20} />
          </button>
          <button
            onClick={() => {
              setShowStickerPanel((v) => !v);
              setShowFilterPanel(false);
            }}
            className={`p-2 rounded-full transition-colors duration-200 cursor-pointer ${
              showStickerPanel 
                ? 'bg-blue-500 text-white' 
                : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black')
            }`}
            title="Stickers"
          >
            <Smile size={20} />
          </button>
        </div>

        <FilterPanel
          show={showFilterPanel}
          panelRef={filterPanelRef}
          selectedFilter={selectedFilter}
          onFilterSelect={onFilterSelect}
        />

        <StickerPanel
          show={showStickerPanel}
          panelRef={stickerPanelRef}
          onAddSticker={onAddSticker}
        />

        {activeStickers.map((sticker) => (
          <div
            key={sticker.id}
            className="absolute text-4xl cursor-move z-20 select-none"
            style={{ left: `${sticker.position.x}px`, top: `${sticker.position.y}px` }}
            onMouseDown={(e) => onStickerMouseDown(e, sticker)}
            onTouchStart={(e) => onStickerTouchStart(e, sticker)}
            onDoubleClick={() => onRemoveSticker(sticker.id)}
            title="Drag to move, double-click to remove"
          >
            {sticker.emoji}
          </div>
        ))}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-auto aspect-video ${selectedFilter} transform scale-x-[-1]`}
        />
      </div>

      {!isCapturing && currentStep < totalPhotos && (
        <div className="mt-6 text-center">
          <button
            onClick={onStartCapture}
            className={`px-8 py-4 rounded-lg font-semibold flex items-center gap-3 mx-auto transition transform hover:scale-105 shadow-lg ${
              isDarkMode 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <Camera size={22} />
            {currentStep === 0 ? 'Start Taking Photos' : 'Take Next Photo'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraPreview;