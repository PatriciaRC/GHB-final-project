import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Genre } from '../genre/genre.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  genres: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const movieId = params.get('id');
      if (movieId) {
        this.moviesService.getMovie(movieId).subscribe((movie) => {
          this.movie = movie;
        });
      }
    });
  }

  

  getGenreNames(genres: Genre[]): string {
    if (!genres) {
      return '';
    }

    return genres.map((genre) => genre.name).join(', ');
  }
}