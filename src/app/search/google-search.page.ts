import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
declare var $;

@Component({
  selector: 'app-google-search',
  templateUrl: './google-search.page.html',
  styleUrls: ['./google-search.page.scss'],
})
export class GoogleSearchPage implements OnInit {
  url:any;
  @Input() googletext: string;
  @Input() wikitext: string;
 
  constructor(public modalController: ModalController) {
   
 
    
   }

  ngOnInit() {
   
    $(document).ready(()=> {
    if(this.googletext != null){
      this.url = "https://www.google.com/search?igu=1&q="+this.googletext;
    } else{
      this.url =  "https://en.wikipedia.org/wiki/Special:Search?search=" + this.wikitext;
    }
      
   
      $("#myIframe").attr("src", this.url);

});
    // document.getElementsByClassName('googlesearch').attachEvent("onload", this.cutCopyHandler);
    // document.getElementById('googlesearch').addEventListener('copy' , this.cutCopyHandler);
    // document.addEventListener('copy', this.cutCopyHandler);
    // document.querySelector("input").addEventListener('copy',this.cutCopyHandler);

  // $.ajax({
  //   url: "https://www.google.com/search?igu=1&q=redhat", // or any URL
  //   success: (result)=>{
  //     console.log(result)
  //   // $("#readhat").html(result);


  }
  cutCopyHandler(e){
   
    
    
    e.preventDefault();
    // const selection = document.getSelection();
    // e.clipboardData.setData(
    //   'text/plain',
    //   'hello'
    // ); 
    }

    dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalController.dismiss({
        'dismissed': true
      });
    }
    openURL(){
      console.log(this.url)
      return this.url;
    }

}


