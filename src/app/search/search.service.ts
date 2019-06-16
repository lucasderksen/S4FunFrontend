import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) { }

  getSeriesByName(searchTitle){
    return this.http.get('https://api.themoviedb.org/3/search/multi?api_key=b057c318f970d5e7fee5eecbcf4ac56d&query='+searchTitle)
  }
  getSerieDetailsById(id){
    return this.http.get('https://api.themoviedb.org/3/tv/'+id+'?api_key=b057c318f970d5e7fee5eecbcf4ac56d')
  }
  getMovieDetailsById(id){
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=b057c318f970d5e7fee5eecbcf4ac56d')
  }

}


