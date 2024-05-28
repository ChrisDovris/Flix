import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable, map } from 'rxjs';
import { MoviesData } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { ShowItemComponent } from '../../components/show-item/show-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ActivatedRoute } from '@angular/router';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMoviesData } from '../../types/tvshow';

@Component({
  selector: 'app-shows-list',
  standalone: true,
  imports: [CommonModule, ShowItemComponent,InputTextModule,FormsModule,PaginatorModule],
  templateUrl: './shows-list.component.html',
  styleUrl: './shows-list.component.scss'
})
export class ShowsListComponent implements OnInit{

  showsList$: Observable<MoviesData> | null = null;
  searchValue = '';
  first: number  = 0;
  rows: number  = 0;
  showsType : 'movie' | 'tv' = 'movie';

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute,
              private tvShowsService: TvshowsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.showsType = params['type']
      this.getPagedShows(this.showsType, 1);
    })
    
  }

  getPagedShows(
    showsType : 'movie' | 'tv',
    page: number, 
    searchKeyword?: string){
      if(showsType === 'movie') {
    this.showsList$ = this.moviesService.searchMovies(page, searchKeyword);
      }
      if (showsType === 'tv') {
        this.showsList$ = this.tvShowsService.searchTvShows(page, searchKeyword)
        .pipe(map(mapToMoviesData));
      }
  }

  onSearchChanged() {
    this.getPagedShows(this.showsType, 1, this.searchValue);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ? event.first : 0
    this.rows = event.rows ? event.rows : 20
    const pageNum = event.page ? event.page + 1 : 1; 
    this.getPagedShows(this.showsType, pageNum, this.searchValue);
  }
}
