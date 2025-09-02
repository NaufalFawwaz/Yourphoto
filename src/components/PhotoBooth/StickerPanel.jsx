import React from 'react';
import { STICKERS } from '@/utils/stickers';

const StickerPanel = ({ show, panelRef, onAddSticker }) => {
  if (!show) return null;

  return (
    <div 
      ref={panelRef}
      className="absolute top-16 left-16 bg-white p-3 rounded-lg shadow-lg z-30 max-h-48 overflow-y-auto"
    >
      <div className="grid grid-cols-4 gap-2">
        {STICKERS.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onAddSticker(sticker)}
            className="p-2 text-2xl hover:bg-gray-100 rounded transition-colors"
            title={sticker.name}
          >
            {sticker.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickerPanel;