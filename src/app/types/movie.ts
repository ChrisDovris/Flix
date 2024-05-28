export type Movie = {
    id: number
    backdrop_path: string
    overview: string
    genre_ids: number[]
    original_language: string
    original_title: string
    title: string
    popularity: string
    poster_path: string
    release_date: string
    vote_average: number
    vote_count: number
    revenue?: number
    runtime?: string
    status?: string
    genres?: Genre[]
}

export type MoviesData = {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

export type Genre = {
    id:number
    name: string
}

export type GenresData = {
    genres: Genre[];
}