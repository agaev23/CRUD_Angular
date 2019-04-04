import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerGetterService {
  constructor(private http: HttpClient) { }

  get(api) {
    return this.http.get(`http://localhost:3000/${api}`);
  }

  post(api, data) {
    return this.http.post(`http://localhost:3000/${api}`, data);
  }

  update(api, id, data) {
    return this.http.put(`http://localhost:3000/${api}${id}`, data);
  }


  remove(api, id) {
    return this.http.delete(`http://localhost:3000/${api}${id}`);
  }
}
