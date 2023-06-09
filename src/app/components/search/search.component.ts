import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { TvshowsService } from 'src/app/services/tvshows.service';

interface SearchResult {
  media_type: string;
  id: number;
  title?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm: string;
  movieList: any[];
  searchResults: SearchResult[];

  constructor(
    private moviesService: MoviesService,
    private tvshowsService: TvshowsService
  ) {}

  search(): void {
    this.moviesService.searchMovies(this.searchTerm).subscribe(
      (movieResponse) => {
        const movieResults = movieResponse.results.map((movie) => ({
          media_type: 'movie',
          id: movie.id,
          title: movie.title,
        }));
        this.tvshowsService.searchTvshows(this.searchTerm).subscribe(
          (tvshowResponse) => {
            const tvshowResults = tvshowResponse.results.map((tvshow) => ({
              media_type: 'tv',
              id: tvshow.id,
              title: tvshow.name,
            }));
            this.searchResults = [...movieResults, ...tvshowResults];
          },
          (error) => {
            console.log('An error occurred:', error);
          }
        );
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
    console.log('Searching for:', this.searchTerm);
  }
}  
