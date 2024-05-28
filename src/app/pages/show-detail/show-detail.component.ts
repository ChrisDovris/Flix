import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Observable, map } from 'rxjs';
import { Movie } from '../../types/movie';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { SliderComponent } from '../../components/slider/slider.component';
import { TabViewModule } from 'primeng/tabview';
import { IMAGES_SIZE } from '../../constants/images-url';
import { Video } from '../../types/video';
import { VideoEmbedComponent } from '../../components/video-embed/video-embed.component';
import { Image } from '../../types/photos';
import { ImageModule } from 'primeng/image';
import { Actor } from '../../types/cast';
import { CarouselModule } from 'primeng/carousel';
import { BannerComponent } from '../../components/banner/banner.component';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovie, mapToMovies } from '../../types/tvshow';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [JsonPipe,
    AsyncPipe,
    SliderComponent,
    CommonModule,
    TabViewModule,
    VideoEmbedComponent,
    ImageModule,
    CarouselModule,
    BannerComponent,
  ],
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss'
})
export class ShowDetailComponent implements OnInit {
  showId = '';
  showType : 'tv' | 'movie' = 'movie';

  show$ : Observable<Movie> | null = null;
  showVideos$ : Observable<Video[]> | null = null;
  showImages$ : Observable<Image[]> | null = null;
  showCast$ : Observable<Actor[]> | null = null;
  similarShows$ : Observable<Movie[]> | null = null;


  responsiveOptions: any[] =[
    { breakpoint: '850px',
      numVisible : 5,
      numScroll: 3
  } ,
  { breakpoint: '760px',
      numVisible : 4,
      numScroll: 2
  },
  { breakpoint: '530px',
      numVisible : 3,
      numScroll: 1
  },
  { breakpoint: '370px',
      numVisible : 2,
      numScroll: 1
  }
]


  imagesSizes = IMAGES_SIZE;
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private moviesService: MoviesService,
              private tvShowService: TvshowsService) {}

ngOnInit() { 
    this.route.params.subscribe(params => {
    this.showId = params['id'];
    this.showType = params['type'];
  }) 
  

if (this.showType === 'movie'){
  this.show$ = this.moviesService.getMovieById(this.showId);
  this.showVideos$ = this.moviesService.getMovieVideos(this.showId);
  this.showImages$ = this.moviesService.getMovieImages(this.showId);
  this.showCast$ = this.moviesService.getMovieCast(this.showId);
  this.similarShows$ = this.moviesService.getSimilarMovies(this.showId);
}


if(this.showType === 'tv') {
  this.show$ = this.tvShowService
  .getTvShowById(this.showId)
  .pipe(map(mapToMovie));
  this.showVideos$ = this.tvShowService.getTvShowsVideos(this.showId);
  this.showImages$ = this.tvShowService.getTvShowImages(this.showId);
  this.showCast$ = this.tvShowService.getTvShowCast(this.showId);
  this.similarShows$ = this.tvShowService
    .getTvShowsSimilar(this.showId)
    .pipe(map(mapToMovies))
}
  }

  reloadPage() {
    window.location.reload();
  }
}




