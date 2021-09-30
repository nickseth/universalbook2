import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {
  options:any;
  baseUrl:any='https://universalbooks.wpengine.com/';

  constructor(private http: HttpClient) {
    let headers = new HttpHeaders({
      "Content-type": "application/json",
     });
  
     this.options = {
        headers: headers
     }

   }
   getUserDeatils(data){
    return this.http.post(this.baseUrl+ `wp-json/mobileapi/v1/get_customer_profile`,JSON.stringify(data),this.options);
   }
}
