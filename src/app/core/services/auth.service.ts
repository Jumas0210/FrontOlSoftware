import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development'
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API_URL = environment.API_URL;

  constructor() { }

  login(email: string,password : string): Observable<any>{
    return this.http.post(`${this.API_URL}/Acces/Login`, {email,password});
  }

  decodeToken(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;
  }

  getUserName(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] : null;
  }

  getUserRole(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;
  }

}
