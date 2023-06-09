import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Movie, MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalog: Movie[];
  topRatedMovies: Movie[];

  constructor(
    private moviesService: MoviesService,
  ) { }

ngOnInit() {
    this.moviesService.getTopRatedMovies().pipe(take(1)).subscribe(res => {
      this.topRatedMovies = res;
      console.log("Top rated movies:", this.topRatedMovies);
    });
  }
}
