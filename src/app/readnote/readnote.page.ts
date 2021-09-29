import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { FormGroup, FormBuilder} from "@angular/forms";
import { NotesService } from './../api/notes.service';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from './../api/authentication.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
declare var $;
@Component({
  selector: 'app-readnote',
  templateUrl: './readnote.page.html',
  styleUrls: ['./readnote.page.scss'],
})
export class ReadnotePage implements OnInit {
title1:any='';
notes_text:any='';
dataone:any;
notes_id:any;
datarecieve:any;
updationReturn:any;
// public Editor = ClassicEditor;
public config = {
  placeholder: 'Type the content here!'
}
ionicForm: FormGroup;
requestOptions: any;
token:any;
loading:any;
  constructor(public notesService: NotesService,
    private route:ActivatedRoute,
    private storage:Storage,
    public router:Router,
    public sqdatabaseService:SqdatabaseService,
    public authenticationService:AuthenticationService,
    public loadingController: LoadingController
    ) { 

 
  }
  ngOnInit() {

    document.addEventListener('cut', this.cutCopyHandler);
    document.addEventListener('copy', this.cutCopyHandler);
    this.authenticationService.getToken().then(val => {
      let id = this.route.snapshot.paramMap.get('index');
      let notesid = this.route.snapshot.paramMap.get('notes_id');
      this.dataFetch(notesid,val.value);
      ;
  });
  }
  async dataFetch(id,token){
  


    // this.storage.get('notes').then(val=>{
    //   if(id != null){
    //  this.title1 = val[id].title;
    //  this.notes_text = val[id].note_text;
    //  } 
    // })
     this.loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await this.loading.present();
this.notes_id = id;
  this.token = token;
  let notes_todata = {'token':token,'notes_id':id};
this.notesService.getoneNotes(notes_todata).subscribe(val => {
      this.dataone = val;

    
 this.title1 = this.dataone.title;
 this.notes_text = this.dataone.desc;
this.loading.dismiss();
});

  }
  cutCopyHandler(e){
    e.preventDefault();
    const selection = document.getSelection();
    e.clipboardData.setData(
      'text/plain',
      'hello'
    );
    // if (e.type === 'cut') selection.deleteFromDocument();
    // const selection = document.getSelection();
    // e.clipboardData.setData(
    //   'text/plain',
    //   'hello'
    // );
  }
  async createNew(token){
    let title = document.getElementById('newtitle').innerHTML;
    let description = document.getElementById('newcontent').innerHTML;
    var notesData = { 'token': token, 'title': title, 'description': description };
    await this.notesService.addNotes(notesData);

    // this.sqdatabaseService.createNotes('12',val1,title1);
  //   setTimeout(() => {
  //     this.dataFetch();
  //   }, 1000);
  }

  updateNotes(token,id){
    let title = document.getElementById('updatetitle').innerHTML;
    let description = document.getElementById('updatecontent').innerHTML;
    let data = {'token':token,'notes_id':id,'title':title,'description':description};
    this.notesService.updateNotes(data).subscribe(val=>{
      this.updationReturn = val;
      alert(this.updationReturn.success);
      this.router.navigate(['/notes']);
    });
  }
  deleteNotes(token,id){
let data = {'token':token,'notes_id':id};
    this.notesService.deleteNotes(data).subscribe(val=>{
   this.datarecieve = val;
   alert(this.datarecieve.success);
this.router.navigate(['/notes']);
    })
  }
} 