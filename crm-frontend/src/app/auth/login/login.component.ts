import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared-styles/common-styles.css','../../shared-styles/shared.css']
})
export class LoginComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    admin: false,
  }

  constructor(private router: Router, private authService: AuthService) {

  }

  onSubmit(form: NgForm) {
    console.log(form.form.controls.username.value)
    console.log(form.form.controls.password.value)

    this.user.email = form.form.controls.username.value
    this.user.password = form.form.controls.password.value

    this.authService.login(this.user).subscribe(
      {
        next: (res) => {
          localStorage.setItem("token",res.token);
          this.router.navigate(["home"]);
        },
        error: (err:HttpErrorResponse)=>{
          alert("Wrong email or password")
          console.log(err.error);
        }
      }
    )
  }

  navigateToRegister() {
    this.router.navigate(["/register"])
  }
}
