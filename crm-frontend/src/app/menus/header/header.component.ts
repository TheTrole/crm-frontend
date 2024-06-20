import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../../shared-styles/shared.css']
})
export class HeaderComponent {

  constructor(private router:Router,private route:ActivatedRoute){
    
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigate([this.route]);
  }

  navigate(path:string){
    this.router.navigate(["home",path])
  }
}
