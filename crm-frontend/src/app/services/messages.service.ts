import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PipeType } from '../models/utils';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  apiUrl = 'http://localhost:3000/messages/'

  constructor(private http: HttpClient) { }

  bulkSendMessages(type:PipeType){
    console.log(type);
    return this.http.get<any>(this.apiUrl+type)
    .pipe(timeout(100000)) 
    .subscribe({
      next: (res)=>{
        alert(`Succesfully sent email (${type})`);
      },
      error: (err)=>{
        console.log(err);
        alert("Failed");
      }
    })
  }
}
