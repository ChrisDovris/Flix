import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TvShow, TvshowsData } from '../types/tvshow';
import { VideosData } from '../types/video';
import { ImagesData } from '../types/photos';
import { CastData } from '../types/cast';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'fb67db02c63d573a9bd1a526b65b2557'


  constructor(private http: HttpClient) { }

  getTvShowsByType(type: string, count = 20) {
    return this.http
      .get<TvshowsData>(
        `${this.apiUrl}/tv/${type}?api_key=${this.apiKey}`
      ).pipe(map((data)=> data.results.slice(0, count)))
  }

  getTvShowById(id:string) {
    return this.http
      .get<TvShow>(
        `${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`)
        
  }

  getTvShowsVideos(id: string) {
    return this.http
    .get<VideosData>(
      `${this.apiUrl}/tv/${id}/videos?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results))
  }
  
  getTvShowImages(id: string) {
    return this.http
    .get<ImagesData>(
      `${this.apiUrl}/tv/${id}/images?api_key=${this.apiKey}`)
      .pipe(map((data) => data.backdrops))

  }
  getTvShowCast(id: string) {
    return this.http
    .get<CastData>(
      `${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`)
      .pipe(map((data) => data.cast))

  }

  getTvShowsSimilar(id: string) {
  return this.http
    .get<TvshowsData>(
      `${this.apiUrl}/tv/${id}/similar?api_key=${this.apiKey}`)
      .pipe(map((data) => data.results.slice(0, 12)))
  }

  searchTvShows(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/tv' : '/tv/popular';
    return this.http.get<TvshowsData>(
      `${this.apiUrl}${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    )
  }
}
