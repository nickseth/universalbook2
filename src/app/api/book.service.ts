import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getBooks(){
    return  this.http.get('https://universalbooks.wpengine.com/wp-json/wc/v3/products?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb');


}
getCategory(){
return   this.http.get('https://universalbooks.wpengine.com/wp-json/wc/v3/products/categories?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb');
}
getBookone(id){
return this.http.get("https://universalbooks.wpengine.com/wp-json/wc/v3/products/"+id+"?consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb");
}
getCategoryOnes(id){
  return this.http.get("https://universalbooks.wpengine.com/wp-json/wc/v3/products?category="+id+"&consumer_key=ck_97758e7f0f2e208f8cf639f7129755391f0a0e19&consumer_secret=cs_685bdd86613cb687337e13237872c831478d32bb");
}

}
