import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  baseUrl:any='https://universalbooks.wpengine.com/';
  addreturndata:any;
  constructor(private http: HttpClient) { }

  addNotes(addnotesdata){
    let headers = new HttpHeaders({
      "Content-type": "application/json",
     });
  
     let options = {
        headers: headers
     }
    this.http.post(this.baseUrl+ `wp-json/mobileapi/v1/add_notes`, JSON.stringify(addnotesdata),options)
    .subscribe(data => {
this.addreturndata = data;
if(this.addreturndata.status == 'success'){
  alert(this.addreturndata.errormsg);
} else{
  alert(this.addreturndata.errormsg);
}
     }, error => {
      console.log(error.error.message);
 
        
    });
  }

  getNotes(token_val){
    let headers = new HttpHeaders({
      "Content-type": "application/json",
     });
  
     let options = {
        headers: headers
     }
    return this.http.post(this.baseUrl+ `wp-json/mobileapi/v1/view_notes`,JSON.stringify(token_val),options);
    }

    deleteNotes(data){
      let headers = new HttpHeaders({
        "Content-type": "application/json",
       });
    
       let options = {
          headers: headers
       }
    return  this.http.post(this.baseUrl+ 'wp-json/mobileapi/v1/delete_notes',JSON.stringify(data),options);
    }

    getoneNotes(data){
      let headers = new HttpHeaders({
        "Content-type": "application/json",
       });
    
       let options = {
          headers: headers
       }
      
      return this.http.post(this.baseUrl+ `wp-json/mobileapi/v1/edit_notes`,JSON.stringify(data),options);
    }
updateNotes(data){
  let headers = new HttpHeaders({
    "Content-type": "application/json",
   });

   let options = {
      headers: headers
   }
  
  return this.http.post(this.baseUrl+ `wp-json/mobileapi/v1/update_notes`,JSON.stringify(data),options);
}

}
