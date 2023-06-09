import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Genre } from '../components/genre/genre.component';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'f494762045d9808e3c1b48a600b2eff3';
  }

  getCatalog(): Observable<Catalog> {
    return this.http.get(`${this.apiUrl}movie/top_rated?api_key=${this.apiKey}&page=1`) as Observable<Catalog>;
  }

  getMovie(id: string): Observable<Movie> {
    const movieUrl = `${this.apiUrl}movie/${id}?api_key=${this.apiKey}&append_to_response=keywords`;
  
    return this.http.get<any>(movieUrl).pipe(
      map((response) => {
        const movie: Movie = {
          title: response.title,
          id: response.id,
          overview: response.overview,
          original_title: response.original_title,
          poster_path: response.poster_path,
          release_date: response.release_date,
          genre_ids: response.genre_ids,
          genres: Array.isArray(response.keywords?.keywords)
            ? response.keywords.keywords.map((keyword: any) => ({
                id: keyword.id,
                name: keyword.name,
              }))
            : [],
          vote_count: response.vote_count !== undefined ? response.vote_count : 0,
        };
        return movie;
      })
    );
  }
  
  

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie`;
    const params = {
      api_key: this.apiKey,
      query: query,
    };
    return this.http.get<any>(url, { params });
  }

  getTopRatedMovies(): Observable<Movie[]> {
    return this.http
      .get<Catalog>(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&page=1`)
      .pipe(map((response: Catalog) => response.results.slice(0, 10)));
  }

  getMovieGenres(): Observable<Genre[]> {
    const url = `${this.apiUrl}genre/movie/list?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(map((response) => response.genres));
  }
}

export interface Catalog {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  title: string;
  id: number;
  overview: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
  genres?: Genre[];
  vote_count: number;
}
