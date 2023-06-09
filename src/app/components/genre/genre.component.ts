import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {
  @Input() movie: Movie;
}

export interface Genre {
  id: number;
  name: string;
}