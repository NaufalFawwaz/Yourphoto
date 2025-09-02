import React from 'react';
import { Download, RotateCcw, X } from 'lucide-react';

const PreviewPanel = ({
  capturedPhotos,
  isGeneratingFinal,
  onRemovePhoto,
  onDownload,
  onReset
}) => {
  return (
    <div className="w-full lg:w-1/3 max-w-md">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Your Photos</h2>

        {capturedPhotos.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {capturedPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Captured photo ${index + 1}`}
                    className="w-full h-auto rounded border border-gray-200 cursor-pointer"
                    onClick={() => onRemovePhoto(index)}
                    title="Click to undo this photo"
                  />
                  <button
                    onClick={() => onRemovePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove this photo"
                  >
                    <X size={14} />
                  </button>
                  <span className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>

            {isGeneratingFinal && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-600 text-center">Generating final image...</p>
              </div>
            )}

            <div className="flex flex-col space-y-2 mt-4">
              <button
                onClick={onDownload}
                disabled={isGeneratingFinal}
                className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                <Download size={18} />
                {isGeneratingFinal ? 'Generating...' : 'Download Photo'}
              </button>

              <button
                onClick={onReset}
                className="flex items-center justify-center gap-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                <RotateCcw size={18} />
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Your captured photos will appear here
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;