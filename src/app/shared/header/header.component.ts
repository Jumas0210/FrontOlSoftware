import { DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  public userName: string | null = null;
  public userRole: string | null = null;
  private localStorage : Storage | undefined;
  
  constructor() {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    const userInfo = this.userService.getUserInfo();
    this.userName = userInfo.name;
    this.userRole = userInfo.role;
  }

  public isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  public listNav(){
    this.router.navigate(['/dashboard/list']);
  }

  public formNav(){
    this.router.navigate(['/dashboard/form']);
  }

  public logout() {
    localStorage.clear();
    this.userService.setUserInfo('','','','');
    this.router.navigate(['/login']);
  }
  
}
