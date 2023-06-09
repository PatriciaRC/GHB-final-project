import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { CommonModule } from '@angular/common';
import { GenreComponent } from './components/genre/genre.component';
import { TvshowComponent } from './components/tvshows/tvshows.component';
import { TvshowdetailComponent } from './components/tvshow-detail/tvshow-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    MoviesComponent,
    SearchComponent,
    MovieDetailComponent,
    GenreComponent,
    TvshowComponent,
    TvshowdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
