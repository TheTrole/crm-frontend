import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Enviroment } from "../enviroment/enviroment";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { Token } from "../models/toke.model";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private backUrl: String = Enviroment.backUrl + "/auth"

    constructor(private httpClient: HttpClient) {

    }

    login(user: User): Observable<Token> {
        return this.httpClient.post<Token>(`${this.backUrl}/login`, user);
    }

    register(user:User): Observable<Token>{
        return this.httpClient.post<Token>(`${this.backUrl}/register`,user)
    }

    validate():Observable<any>{
        let token = localStorage.getItem("token");

        let httpHeader = new HttpHeaders({
          "Authorization": `Bearer ${token}`
        });
    
        return this.httpClient.get<any>(`${this.backUrl}/validate-jwt`, { headers: httpHeader });
    }
}