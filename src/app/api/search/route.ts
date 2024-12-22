import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  try {
    const query = searchParams.get('query');
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing' },
        { status: 500 }
      );
    }

    const res = await fetch(
      `${baseUrl}/search/multi?query=${query}&api_key=${apiKey}`,
      //   https://api.themoviedb.org/3/search/multi?query=animal&include_adult=false&language=en-US&page=1
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from TMDb' },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log('search data--------------------------------------->', data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
