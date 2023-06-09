import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Genre } from '../components/genre/genre.component';


@Injectable({
  providedIn: 'root',
})
export class TvshowsService {
  apiUrl: string;
  apiKey: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'f494762045d9808e3c1b48a600b2eff3';
  }

  getTvCatalog(): Observable<TvCatalog> {
    return this.http.get(`${this.apiUrl}tv_series/top_rated?api_key=${this.apiKey}&page=1`) as Observable<TvCatalog>;
  }

  getTvshow(id: string): Observable<Tvshow> {
    const tvshowUrl = `${this.apiUrl}tv/${id}?api_key=${this.apiKey}&append_to_response=keywords`;
  
    return this.http.get<any>(tvshowUrl).pipe(
      map((response) => {
        const tvshow: Tvshow = {
          title: response.name,
          id: response.id,
          overview: response.overview,
          original_title: response.original_name,
          poster_path: response.poster_path,
          release_date: response.first_air_date,
          genre_ids: response.genre_ids,
          genres: Array.isArray(response.keywords?.keywords)
            ? response.keywords.keywords.map((keyword: any) => ({
                id: keyword.id,
                name: keyword.name,
              }))
            : [],
          vote_count: response.vote_count !== undefined ? response.vote_count : 0,
        };
        return tvshow;
      })
    );
  }
  
  

  searchTvshows(query: string): Observable<any> {
    const url = `${this.apiUrl}search/tv?api_key=${this.apiKey}&query=${query}`;
    return this.http.get<any>(url);
  }

  getTopRatedTvshows(): Observable<Tvshow[]> {
    return this.http
      .get<TvCatalog>(`${this.apiUrl}tv_series/top_rated?api_key=${this.apiKey}&page=1`)
      .pipe(map((response: TvCatalog) => response.results.slice(0, 10)));
  }
  

  getTvshowGenres(): Observable<Genre[]> {
    const url = `${this.apiUrl}genre/tv_series/list?api_key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(map((response) => response.genres));
  }
}

export interface TvCatalog {
  page: number;
  results: Tvshow[];
  total_pages: number;
  total_results: number;
}

export interface Tvshow {
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
