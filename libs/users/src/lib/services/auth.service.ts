import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiURL + 'users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) : Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`,{email: email, password: password} );
  }
}