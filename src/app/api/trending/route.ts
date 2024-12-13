/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const version = searchParams.get('version') || 'all';

  console.log('Requested version: ', version);

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!apiKey || !baseUrl) {
      return NextResponse.json(
        { error: 'API key or Base URL is missing' },
        { status: 500 }
      );
    }

    // Ensure correct URL formatting
    const endpoint =
      version === 'movie'
        ? 'trending/movie/day'
        : version === 'tv'
          ? 'trending/tv/day'
          : 'trending/all/day';

    const url = `${baseUrl}/${endpoint}?api_key=${apiKey}`;
    console.log('Fetching URL: ', url);

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data from TMDb: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log('Fetched data: ', data);

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
