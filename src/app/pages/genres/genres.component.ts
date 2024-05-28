import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable, map } from 'rxjs';
import { Genre, Movie, MoviesData } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TvshowsService } from '../../services/tvshows.service';


@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule,ShowItemComponent,RouterLink,InputTextModule,FormsModule,PaginatorModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent implements OnInit {

  genres$: Observable<Genre[]> | null = null;
  showsList$: Observable<MoviesData> | null = null;
  genreId = '';
  first: number  = 0;
  rows: number  = 0;


  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private tvShowsService : TvshowsService) {}

              
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.genreId = params['genreId']
      this.showsList$ = this.moviesService.getMoviesByGenre(this.genreId)
      this.genres$ = this.moviesService.getMoviesGenres();
    })
   
    
  }

  getPagedShows(page: number){ 
    this.showsList$ = this.moviesService.searchMovies(page);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ? event.first : 0
    this.rows = event.rows ? event.rows : 20
    const pageNum = event.page ? event.page + 1 : 1; 
    this.getPagedShows(pageNum);
   
  }

}
