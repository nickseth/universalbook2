import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { FormGroup, FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  ionicForm_reset:any;
  constructor(public formBuilder: FormBuilder,public http: HttpClient,private router: Router) { 

    this.ionicForm_reset = this.formBuilder.group({
      user_login: [''],
    
   })
  }

  ngOnInit() {
  }

  async submitForm() {
    

    let headers = new HttpHeaders({
    "Content-type": "application/json"
   });

   let options = {
      headers: headers
   }
 
   await this.http.post(`https://universalbooks.wpengine.com/wp-json/mobileapi/v1/retrieve_password`, JSON.stringify(this.ionicForm_reset.value),options)
    .subscribe(data => {
      this.ionicForm_reset.reset();
    this.router.navigate(['/login']); 
     }, error => {
      console.log(error.error.message);
       this.ionicForm_reset.reset();
        
    });

    
  }

}
