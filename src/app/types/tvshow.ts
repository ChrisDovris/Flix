import { Movie, MoviesData } from "./movie"


export type TvShow = {
    id: number
    backdrop_path: string
    overview: string
    genre_ids: number[]
    original_language: string
    original_name: string
    title: string
    popularity: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    name : string
    first_air_date: string
}

export type TvshowsData = {
    page: number
    results: TvShow[]
    total_pages: number
    total_results: number
}

export function mapToMovies(tvshows: TvShow[]): Movie[] {
    return tvshows.map((tvshow: TvShow)=> {
        return {
          ...tvshow,
          title: tvshow.name,
          original_title: tvshow.original_name,
          release_date : tvshow.first_air_date
        }
      })

}

export function mapToMovie(tvshow: TvShow): Movie {
  return {
    ...tvshow,
    title: tvshow.name,
    original_title: tvshow.original_name,
    release_date : tvshow.first_air_date
  };
}

export function mapToMoviesData(tvShowData: TvshowsData): MoviesData {
  return {
    results: tvShowData.results.map(mapToMovie),
    total_pages: tvShowData.total_pages,
    total_results: tvShowData.total_results,
    page: tvShowData.page
  }
}