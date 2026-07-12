import { EventType } from "../types/EventType";

type EventImage = NonNullable<EventType["images"]>[number];

/**
 * Picks the best quality image from a Ticketmaster event's image array.
 * Prefers non-fallback images with the highest resolution.
 * Falls back to any available image if no preferred ones exist.
 */
const getBestImage = (
  images?: EventImage[],
  preferredRatio = "16_9",
): string => {
  if (!images || images.length === 0) return "/default-image.jpg";

  const byResolution = (a: EventImage, b: EventImage) => {
    const aPixels = (a.width ?? 0) * (a.height ?? 0);
    const bPixels = (b.width ?? 0) * (b.height ?? 0);
    return bPixels - aPixels; // descending
  };

  // 1st priority: non-fallback with preferred ratio, highest resolution
  const preferredRatioImages = images
    .filter((img) => !img.fallback && img.ratio === preferredRatio)
    .sort(byResolution);

  if (preferredRatioImages.length > 0) return preferredRatioImages[0].url;

  // 2nd priority: any non-fallback image, highest resolution
  const nonFallbackImages = images
    .filter((img) => !img.fallback)
    .sort(byResolution);

  if (nonFallbackImages.length > 0) return nonFallbackImages[0].url;

  // Last resort: any image, highest resolution
  return [...images].sort(byResolution)[0]?.url ?? "/default-image.jpg";
};

export default getBestImage;
