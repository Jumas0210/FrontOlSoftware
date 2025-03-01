import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);
  private API_URL = environment.API_URL;
  private userService = inject(UserService);

    private getAuthHeaders() {
      const token = this.userService.getUserInfo().token;
      console.log(token);
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }

  constructor() { }

  getDepartments() :Observable<IResponse<string[]>> {
    return this.http.get<IResponse<string[]>>(`${this.API_URL}/Department/Departments` , {
      headers : this.getAuthHeaders()
    });
  }

  getMunicipalitiesByDepartment(department : string) :Observable<IResponse<string[]>> {
    return this.http.get<IResponse<string[]>>(`${this.API_URL}/Department/municipalities/${department}` , {
      headers : this.getAuthHeaders()
    });
  }

}
