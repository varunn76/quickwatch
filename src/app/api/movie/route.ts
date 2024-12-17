import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  function findKeysInNestedData(
    data: unknown,
    targetKey: string,
    results: any[] = []
  ): any[] {
    if (Array.isArray(data)) {
      for (const item of data) {
        findKeysInNestedData(item, targetKey, results);
      }
    } else if (data !== null && typeof data === 'object') {
      for (const key in data as Record<string, unknown>) {
        if (key === targetKey) {
          results.push((data as Record<string, unknown>)[key]);
        } else {
          findKeysInNestedData(
            (data as Record<string, unknown>)[key],
            targetKey,
            results
          );
        }
      }
    }
    return results;
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is missing in the query parameters' },
        { status: 400 }
      );
    }

    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is missing' },
        { status: 500 }
      );
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&api_key=${apiKey}`,
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
    const genres = findKeysInNestedData(data?.genres, 'name');

    return NextResponse.json({
      genres: genres,
      imdb_id: data.imdb_id,
      id: data.id,
      origin_country: data.origin_country[0],
      original_language: data.original_language,
      title: data.title,
      description: data.overview,
      production_companies: data.production_companies,
      production_countries: data.production_countries[0],
      release_date: data.release_date,
      spoken_languages: data.spoken_languages[0],
      tagline: data.tagline,
      videos: data.videos.results,
    });
    // return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
