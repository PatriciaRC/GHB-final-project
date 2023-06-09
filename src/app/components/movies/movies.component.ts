import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Catalog, Movie, MoviesService } from 'src/app/services/movies.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movie : Movie;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id") as string;
    this.moviesService.getMovie(id).pipe(take(1)).subscribe(res =>{
      this.movie = res;
      console.log("this movie dentro del observable", this.movie);
    });
  
  }

}
