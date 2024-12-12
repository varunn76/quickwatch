// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
// https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

export type ImageSize = 'original' | 'w500' | 'w780' | 'w1280';

export function getImageUrl(
  imagePath: string,
  size: ImageSize = 'original'
): string {
  if (!imagePath) {
    return '/poster_skeleton.png'; // Default placeholder image when no image path is provided
  }

  const baseUrl = 'https://image.tmdb.org/t/p/';
  return `${baseUrl}${size}/${imagePath}`;
}
