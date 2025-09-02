function drawRoundedRect(ctx, x, y, width, height, radius = 0) {
  if (radius <= 0) {
    ctx.rect(x, y, width, height);
    return;
  }
  const maxRadius = Math.min(width / 2, height / 2);
  radius = Math.min(radius, maxRadius);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
}

export function mapClassToCanvasFilter(twClass) {
  switch (twClass) {
    case 'grayscale':
      return 'grayscale(1)';
    case 'sepia':
      return 'sepia(1)';
    case 'brightness-150':
      return 'brightness(1.5)';
    case 'contrast-150':
      return 'contrast(1.5)';
    case 'saturate-200':
      return 'saturate(2)';
    case 'hue-rotate-90':
      return 'hue-rotate(90deg)';
    case 'invert':
      return 'invert(1)';
    case '':
    default:
      return 'none';
  }
}

export const generateFinalImage = async (capturedPhotos, selectedLayout) => {
  if (!selectedLayout || capturedPhotos.length === 0) return null;

  return new Promise((resolve) => {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = selectedLayout.layoutWidth;
    finalCanvas.height = selectedLayout.layoutHeight;
    const ctx = finalCanvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    let loadedImages = 0;
    const totalImages = capturedPhotos.length;

    if (totalImages === 0) {
      resolve(finalCanvas.toDataURL('image/png'));
      return;
    }

    const loadPromises = capturedPhotos.map((photoDataUrl, index) => {
      return new Promise((resolveImg) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          if (index < selectedLayout.photoPositions.length) {
            const pos = selectedLayout.photoPositions[index];

            const photoAspect = img.width / img.height;
            const targetAspect = pos.width / pos.height;

            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = img.width;
            let sourceHeight = img.height;

            if (photoAspect > targetAspect) {
              sourceHeight = img.height;
              sourceWidth = img.height * targetAspect;
              sourceX = (img.width - sourceWidth) / 2;
            } else {
              sourceWidth = img.width;
              sourceHeight = img.width / targetAspect;
              sourceY = (img.height - sourceHeight) / 2;
            }

            if (selectedLayout.id === 3) {
              const adjustedX = Math.floor(pos.x);
              const adjustedY = Math.floor(pos.y);
              const adjustedWidth = Math.ceil(pos.width);
              const adjustedHeight = Math.ceil(pos.height);

              ctx.save();
              ctx.beginPath();
              ctx.rect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
              ctx.clip();

              ctx.drawImage(
                img,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                adjustedX,
                adjustedY,
                adjustedWidth,
                adjustedHeight
              );

              ctx.restore();
            } else {
              ctx.save();
              drawRoundedRect(ctx, pos.x, pos.y, pos.width, pos.height, pos.radius || 0);
              ctx.clip();

              ctx.drawImage(
                img,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                pos.x,
                pos.y,
                pos.width,
                pos.height
              );
              ctx.restore();
            }
          }
          loadedImages++;
          resolveImg();
        };
        img.onerror = () => {
          loadedImages++;
          resolveImg();
        };
        img.src = photoDataUrl;
      });
    });

    Promise.all(loadPromises).then(() => {
      const layoutImg = new Image();
      layoutImg.crossOrigin = 'anonymous';
      layoutImg.onload = () => {
        ctx.drawImage(layoutImg, 0, 0, finalCanvas.width, finalCanvas.height);
        const finalDataUrl = finalCanvas.toDataURL('image/png');
        resolve(finalDataUrl);
      };
      layoutImg.onerror = () => {
        const finalDataUrl = finalCanvas.toDataURL('image/png');
        resolve(finalDataUrl);
      };
      layoutImg.src = selectedLayout.imageUrl;
    });
  });
};