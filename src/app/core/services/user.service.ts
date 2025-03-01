import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private name: string = '';
  private role: string = '';
  private token: string = '';
  private userId: string = '';
  
  constructor() {
    this.loadSessionData()
   }

  public setUserInfo(name: string, role: string, token: string, userId: string): void {
    this.name = name;
    this.role = role;
    this.token = token;
    this.userId = userId;

    this.setDataLocalStorage("name", name);
    this.setDataLocalStorage("role", role);
    this.setDataLocalStorage("token", token);
    this.setDataLocalStorage("userId", userId);

  }

  private loadSessionData(): void {
    this.name = this.getDataLocalStorage("name") || '';
    this.role = this.getDataLocalStorage("role")|| '';
    this.token = this.getDataLocalStorage("token") || '';
    this.userId = this.getDataLocalStorage("userId") || '';
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

  setDataLocalStorage(key : any, value : string){
    if(typeof(window) !== "undefined"){
      if(window.localStorage){
        window.localStorage.setItem(key, value)
      }
    }
  }

  getDataLocalStorage(key : any){
    if(typeof(window) !== "undefined"){
      if(window.localStorage){
        const value : any = window.localStorage.getItem(key)
        return value
      }
    }    
  }
}
