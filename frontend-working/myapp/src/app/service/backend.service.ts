import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { value } from 'src/environments/environment';

const BACKEND_ENDPOINT = value.BACKEND_ENDPOINT;

@Injectable({
  providedIn: 'root'
})



export class BackendService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(BACKEND_ENDPOINT)
      
    }
}
