import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { Genre } from '../genre/genre.component';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-tvshow-detail',
  templateUrl: './tvshow-detail.component.html',
  styleUrls: ['./tvshow-detail.component.css'],
})
export class TvshowdetailComponent implements OnInit {
  tvshow: any;
  genres: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private tvshowService: TvshowsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const tvshowId = params.get('id');
      if (tvshowId) {
        this.tvshowService.getTvshow(tvshowId).subscribe((tvshow) => {
          this.tvshow = tvshow;
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
