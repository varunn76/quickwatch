// interface ProductionCompany {
//   id: number;
//   logo_path: string | null;
//   name: string;
//   origin_country: string;
// }

// interface ProductionCountry {
//   iso_3166_1: string;
//   name: string;
// }

// interface SpokenLanguage {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// }

// interface Video {
//   iso_639_1: string;
//   iso_3166_1: string;
//   name: string;
//   key: string;
//   site: string;
//   size: number;
//   type: string;
//   official: boolean;
//   published_at: string;
//   id: string;
// }

// export interface MovieData {
//   genres: string[];
//   imdb_id: string;
//   id: number;
//   origin_country: string;
//   original_language: string;
//   title: string;
//   description: string;
//   production_companies: ProductionCompany[];
//   production_countries: ProductionCountry;
//   release_date: string;
//   spoken_languages: SpokenLanguage;
//   tagline: string;
//   videos: Video[];
// }

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
