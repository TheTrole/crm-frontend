import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../shared-styles/common-styles.css']
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    admin: false,
  }

  constructor(private authService: AuthService,private router:Router){

  }

  onSubmit(form :NgForm){
    console.log(form.form.controls.username.value)
    console.log(form.form.controls.password.value)
    console.log(form.form.controls.name.value)

    this.user.email = form.form.controls.username.value;
    this.user.password = form.form.controls.password.value;
    this.user.name = form.form.controls.name.value;

    this.authService.register(this.user).subscribe(
      {
        next: (res)=>{
          localStorage.setItem("token",res.token);
          this.router.navigate(["home"]);
        },
        error: (err:HttpErrorResponse)=>{
          alert("Email already exists");
          console.log(err.error);
        }
      }
    )
  }

  navigateToLogin(){
    this.router.navigate(["/login"])
  }
}
