import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/response.model';
import { IMerchant } from '../../models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private http = inject(HttpClient);
  private API_URL = environment.API_URL;
  private userService = inject(UserService);

  private getAuthHeaders() {
    const token = this.userService.getUserInfo().token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  constructor() { }

  getPaginatedMerchants(limit: number) : Observable<IResponse<IMerchant[]>> {
    return this.http.get<IResponse<IMerchant[]>>(`${this.API_URL}/Merchant?pageSize=${limit}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateMerchantStatus(merchantId: number, newStatus: string) {
    return this.http.patch(`${this.API_URL}/Merchant/${merchantId}/status`, { status: newStatus }, {
      headers: this.getAuthHeaders()
    });
  }

  deleteMerchant(merchantId: number) {
    return this.http.delete(`${this.API_URL}/Merchant/${merchantId}`, {
      headers : this.getAuthHeaders()
    });
  }

  downloadCSVReport() {
    return this.http.get(`${this.API_URL}/Merchant/report`, {headers : this.getAuthHeaders() , responseType : 'blob'})
  }
}
