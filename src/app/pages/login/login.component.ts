import { Component, inject, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export  class LoginComponent implements OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  private ngUnsubscribe = new Subject<void>();

  public loginForm: FormGroup = new FormGroup({
    user : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(false, [Validators.requiredTrue])
  });

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public login(){

    if(this.loginForm.valid){
      const {user, password} = this.loginForm.value;


      this.authService.login(user,password).subscribe({
        next:(resp) =>{
          localStorage.setItem('token', resp.token);


          const userId = this.authService.getUserId();
          const userName = this.authService.getUserName();
          const userRole = this.authService.getUserRole();

          this.userService.setUserInfo(userName!, userRole!, resp.token, userId!);
          
          this.router.navigate(['/dashboard'])

        },
        error:(err) => {
            console.log('authentication error')
        },
      })
    }


   
  }
}
