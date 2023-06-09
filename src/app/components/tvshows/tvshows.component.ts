import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { TvCatalog, Tvshow, TvshowsService } from 'src/app/services/tvshows.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowComponent implements OnInit {

  tvshow : Tvshow;

  constructor(
    private tvshowsService: TvshowsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id") as string;
    this.tvshowsService.getTvshow(id).pipe(take(1)).subscribe(res =>{
      this.tvshow = res;
      console.log("this movie dentro del observable", this.tvshow);
    });
  
  }

}
