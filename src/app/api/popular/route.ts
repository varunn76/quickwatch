import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing' },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
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

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
