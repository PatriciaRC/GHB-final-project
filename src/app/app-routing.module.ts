import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { TvshowComponent } from './components/tvshows/tvshows.component';
import { TvshowdetailComponent } from './components/tvshow-detail/tvshow-detail.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'tvshow/:id', component: TvshowdetailComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
