import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegisterRequestInterface } from '../auth/types/registerRequest.interface';
import { CurrentUserInterface } from '../types/currentUser.interface';
import { environment } from '../../../environments/environment.prod';
import { AuthResponseInterface } from '../auth/types/authResponse.interface';
import { LoginRequestInterface } from '../auth/types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private htpp: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.htpp
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.htpp
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }
}
