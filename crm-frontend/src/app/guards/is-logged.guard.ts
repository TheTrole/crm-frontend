import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class IsLoggedGurad implements CanActivate{

    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        this.authService.validate().subscribe(
            {
                error:(err)=>{
                    this.router.navigate(["login"]);
                }
            }
        )
        return true;
    }
    
}