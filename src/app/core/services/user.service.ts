import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private name: string = '';
  private role: string = '';
  private token: string = '';
  private userId: string = '';
  
  constructor() { }

  public setUserInfo(name: string, role: string, token: string, userId: string): void {
    this.name = name;
    this.role = role;
    this.token = token;
    this.userId = userId;
  }

  public getUserInfo() {
    return {
      name: this.name,
      role: this.role,
      token: this.token,
      userId: this.userId
    };
  }

  public isAuthenticated(): boolean {
    return this.token !== '';
  }
}
