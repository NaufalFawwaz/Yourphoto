import { useState, useRef, useEffect } from 'react';

const usePhotoCapture = (videoRef, containerRef) => {
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [activeStickers, setActiveStickers] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showStickerPanel, setShowStickerPanel] = useState(false);
  const [draggingStickerId, setDraggingStickerId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const filterPanelRef = useRef(null);
  const stickerPanelRef = useRef(null);

  useEffect(() => {
    const move = (clientX, clientY) => {
      if (!draggingStickerId || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      let x = clientX - containerRect.left - dragOffset.x;
      let y = clientY - containerRect.top - dragOffset.y;

      x = Math.max(0, Math.min(x, containerRect.width));
      y = Math.max(0, Math.min(y, containerRect.height));

      setActiveStickers((prev) =>
        prev.map((s) => (s.id === draggingStickerId ? { ...s, position: { x, y } } : s))
      );
    };

    const onMouseMove = (e) => move(e.clientX, e.clientY);
    const onMouseUp = () => setDraggingStickerId(null);

    const onTouchMove = (e) => {
      const t = e.touches[0];
      move(t.clientX, t.clientY);
    };
    const onTouchEnd = () => setDraggingStickerId(null);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [draggingStickerId, dragOffset, containerRef]);

  const startCapture = () => {
    setCountdown(3);
    setIsCapturing(true);
  };

  const removePhoto = (indexToRemove) => {
    setCapturedPhotos((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const resetPhotos = () => {
    setCapturedPhotos([]);
    setSelectedFilter('');
    setActiveStickers([]);
    setCountdown(3);
    setIsCapturing(false);
    setDraggingStickerId(null);
  };

  const handleFilterSelect = (filterClass) => {
    setSelectedFilter(filterClass);
    setShowFilterPanel(false);
  };

  const addSticker = (sticker) => {
    setActiveStickers((prev) => [
      ...prev,
      {
        ...sticker,
        id: Date.now(),
        position: { x: 60, y: 60 },
        size: 48,
      },
    ]);
    setShowStickerPanel(false);
  };

  const removeSticker = (stickerId) => {
    setActiveStickers((prev) => prev.filter((s) => s.id !== stickerId));
  };

  const handleStickerMouseDown = (e, sticker) => {
    e.stopPropagation();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const startX = e.clientX;
    const startY = e.clientY;
    setDraggingStickerId(sticker.id);
    setDragOffset({
      x: startX - (containerRect.left + sticker.position.x),
      y: startY - (containerRect.top + sticker.position.y),
    });
  };

  const handleStickerTouchStart = (e, sticker) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setDraggingStickerId(sticker.id);
    setDragOffset({
      x: touch.clientX - (containerRect.left + sticker.position.x),
      y: touch.clientY - (containerRect.top + sticker.position.y),
    });
  };

  return {
    capturedPhotos,
    countdown,
    isCapturing,
    selectedFilter,
    activeStickers,
    showFilterPanel,
    showStickerPanel,
    draggingStickerId,
    dragOffset,
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
    
    setCapturedPhotos,
    setCountdown,
    setIsCapturing,
    setSelectedFilter,
    setActiveStickers,
    setShowFilterPanel,
    setShowStickerPanel,
    setDraggingStickerId,
    setDragOffset
  };
};

export default usePhotoCapture;