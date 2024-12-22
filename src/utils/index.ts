/* eslint-disable @typescript-eslint/no-explicit-any */
export const POSTERDATA = [
  { className: 'top-[0px] left-[10px] lg:left-[120px] xl:left-[210px]' },
  {
    className:
      'top-[50px] right-[10px] md:top-[0px] lg:right-[120px] xl:right-[210px]',
  },
  {
    className:
      'top-[320px] left-[10px] md:top-[150px] md:left-[200px] lg:left-[300px] xl:top-[120px] xl:left-[520px]',
  },
  {
    className:
      'top-[380px] md:top-[150px] right-[10px] md:right-[200px] lg:right-[300px]  xl:right-[480px]',
  },
  {
    className: 'md:top-[450px]  lg:left-[100px] xl:top-[350px] xl:left-[340px]',
  },
  {
    className:
      ' md:top-[450px] lg:right-[100px] xl:top-[350px] xl:right-[300px]',
  },
  {
    className:
      ' md:top-[520px]  lg:left-[430px] xl:top-[350px] xl:left-[710px]',
  },
];

export const dummyData = [
  {
    adult: false,
    backdrop_path: '/nBIHiMCLjdDX2GXbbPBRWafFJNn.jpg',
    genre_ids: [28, 80, 18],
    id: 781732,
    original_language: 'hi',
    original_title: 'Animal',
    overview:
      "The hardened son of a powerful industrialist returns home after years abroad and vows to take bloody revenge on those threatening his father's life.",
    popularity: 46.915,
    poster_path: '/hr9rjR3J0xBBKmlJ4n3gHId9ccx.jpg',
    release_date: '2023-12-01',
    title: 'Animal ',
    video: false,
    vote_average: 6.388,
    vote_count: 112,
  },
  {
    adult: false,
    backdrop_path: '/flgJZkK8j7QG98t2NwOM7TlbBmK.jpg',
    genre_ids: [53, 27],
    id: 274626,
    original_language: 'en',
    original_title: 'Animal',
    overview:
      'When plans for a weekend vacation hit a dead end, a group of close-knit friends find themselves stranded in unfamiliar territory, pursued by a menacing predator. Holed up in an isolated cabin, tensions mount as long-buried secrets are revealed. As the body count rises, the group must put their differences aside and fight for survival.',
    popularity: 8.301,
    poster_path: '/jAWZHSV5C6EOPuG2zVG9fISO5tQ.jpg',
    release_date: '2014-06-17',
    title: 'Animal',
    video: false,
    vote_average: 5.1,
    vote_count: 257,
  },
  {
    adult: false,
    backdrop_path: '/2PYSbjodqH6ytgXaeDtWitFjK1l.jpg',
    genre_ids: [28, 18],
    id: 10252,
    original_language: 'en',
    original_title: 'Animal',
    overview:
      'His name: infamous. His reputation: ruthless. But when James "Animal"Allen is locked up in a maximum security prison, he meets a revolutionary who changes his life. Now a reformed man, James is released only to find that his own son has assumed a life of crime and violence. Can a father haunted by his past redeem his family from the very streets he created, or will he be forced to make the ultimate sacrifice?',
    popularity: 8.665,
    poster_path: '/f0r2kdF3TitkTxAwb0kKdsTfIvi.jpg',
    release_date: '2005-05-01',
    title: 'Animal',
    video: false,
    vote_average: 5.62,
    vote_count: 46,
  },
  {
    adult: false,
    backdrop_path: '/15tVNxKlUdj4hP3wvFDak9ONWyC.jpg',
    genre_ids: [99, 18],
    id: 842354,
    original_language: 'fr',
    original_title: 'Animal',
    overview:
      '16-year-old Bella and Vipulan are part of a generation convinced its very future is in danger. Between climate change and the 6th mass extinction of wildlife, their world could well be inhabitable 50 years from now. They have sounded the alarm over and over, but nothing has really changed. So they’ve decided to tackle the root of the problem: our relationship with the living world. Over the course of an extraordinary journey, they come to realize just how deeply humans are tied to all other living species. And that by saving them… we’re also saving ourselves. Humans thought they could distance themselves from nature, but humans are part and parcel of nature. For man is, after all, an Animal.',
    popularity: 3.486,
    poster_path: '/lJhxPbRXfuSg3X63hJBWKdsW7K7.jpg',
    release_date: '2021-12-01',
    title: 'Animal',
    video: false,
    vote_average: 7.3,
    vote_count: 25,
  },
];
export const fetchPopular = async () => {
  const response = await fetch('/api/popular');
  if (!response.ok) {
    throw new Error(`Failed to fetch popular data: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.results.slice(0, 10);
};

export function getYearFromDate(dateString: string): number | null {
  try {
    // Validate the format using a regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      throw new Error('Invalid date format. Expected format: YYYY-MM-DD.');
    }

    // Create a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date.');
    }

    return date.getFullYear();
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
