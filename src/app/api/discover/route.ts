import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log('req.url', req.url);

  const genre = searchParams.get('genre') || '28';
  const year = searchParams.get('year');
  const version = searchParams.get('version') || 'movie';
  const adult = searchParams.get('adult') || false;
  const provider = searchParams.get('provider');
  const page = searchParams.get('page') || 1;
  const watchRegion = 'US';
  if (!genre) {
    return NextResponse.json({ error: 'Genre is required' }, { status: 400 });
  }

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing' },
        { status: 500 }
      );
    }
    const endpoint = version === 'movie' ? '/discover/movie' : '/discover/tv';
    const res = await fetch(
      `${baseUrl}${endpoint}?api_key=${apiKey}&sort_by=popularity.desc&with_watch_providers=${provider}&watch_region=${watchRegion}&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    //api.tmdb.org/3/discover/movie?api_key=9d005c81618cf4d45a9f6977b2d85774&include_adult=false&language=en-US&watch_region=US&sort_by=popularity.desc&with_watch_providers=337&page=1
    https: if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from TMDb' },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
