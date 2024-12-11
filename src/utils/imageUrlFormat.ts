// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
// https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

type ImageSize = 'original' | 'w500' | 'w780' | 'w1280';

export function getImageUrl(
  imagePath: string,
  size: ImageSize = 'original'
): string {
  if (!imagePath) {
    throw new Error('Image path is required');
  }

  const baseUrl = 'https://image.tmdb.org/t/p/';
  return `${baseUrl}${size}/${imagePath}`;
}

// const svgImageUrl = getImageUrl(
//   'wwemzKWzjKYJFfCeiB57q3r4Bcm',
//   'original',
//   'svg'
// );
// const pngImageUrl = getImageUrl('wwemzKWzjKYJFfCeiB57q3r4Bcm', 'w500', 'png');
