export function getResponsiveReading(contentWidth) {
  if (contentWidth < 420) {
    return { bodySize: 15, lineHeight: 1.45, maxReadableWidth: 360, paragraphGap: 2 }
  }
  if (contentWidth < 900) {
    return { bodySize: 16, lineHeight: 1.5, maxReadableWidth: 640, paragraphGap: 3 }
  }
  return { bodySize: 17, lineHeight: 1.55, maxReadableWidth: 720, paragraphGap: 4 }
}