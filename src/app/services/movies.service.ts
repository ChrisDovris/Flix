import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoviesData, Movie, GenresData } from '../types/movie';
import { map } from 'rxjs';
import { VideosData } from '../types/video';
import { ImagesData } from '../types/photos';
import { CastData } from '../types/cast';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http : HttpClient) { }
  


  private apiUrl = environment.API_URL
  private apiKey = environment.API_KEY
 
  
  

  
  
  getMoviesByType(type:string, count = 20){
    return this.http
      .get<MoviesData>(
        `${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`
      ).pipe(map((data)=> data.results.slice(0, count))) 
  }
  
  getMovieById(id:string) {
    return this.http
      .get<Movie>(
        `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`)
        
  }

  getMovieVideos(id:string) {
    return this.http
    .get<VideosData>(
      `${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map(data => data.results))
  }

  getMovieImages(id:string) {
    return this.http
    .get<ImagesData>(
      `${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`)
      .pipe(map(data => data.backdrops))
  }
  
  getMovieCast(id:string) {
    return this.http
    .get<CastData>(
      `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map(data => data.cast))
  }

  getSimilarMovies(id: string) {
    return this.http
    .get<MoviesData>(
      `${this.apiUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map(data => data.results.slice(0, 12)))
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/movie' : 'movie/popular';
    return this.http.get<MoviesData>(
      `${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    );
  }

  getMoviesGenres() {
    return this.http
    .get<GenresData>(
      `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`
    )
    .pipe(map((data) => data.genres));
  }

  getMoviesByGenre(genreId: string,pageNumber = 1){
    return this.http
    .get<MoviesData>(
      `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
    )
    // .pipe(map(data => data.results));

  }
}




