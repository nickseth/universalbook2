import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from './../api/notes.service';
import { AuthenticationService } from './../api/authentication.service';
import { LoadingController } from '@ionic/angular';

// NotesService
@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes_data: any;
  token: any;
  data1: any;
  loading:any;
  constructor(private storage: Storage,
    private route: Router,
    private alertController: AlertController,
    public notesService: NotesService,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController
    ) { 

    
    }

  ngOnInit() {

    this.authenticationService.getToken().then(val => {
      this.dataRetrieve(val.value);
      this.token = val.value;
    });
  }
 async dataRetrieve(token_val) {
   
    let token1 = { 'token': token_val };
     this.loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        });
        await this.loading.present();
    this.notesService.getNotes(token1).subscribe(data => {
      this.notes_data = data;
     this.loading.dismiss();
    }, error => {
    });

    // this.storage.get('notes').then(val=>{
    //   this.notes_data = val;

    // })
  }

   getUsersList(event,token1) {
     
    var token2 = { 'token': token1 };
    return  this.notesService.getNotes(token2).subscribe(data => {
      this.notes_data = data;
        if (event)
          event.target.complete();
      }, error => {
        console.log(error);
        if (event)
          event.target.complete();
      })
  }
  viewItem(index,id) {

    this.route.navigate(['/readnote', { index: index,notes_id:id }]);

  }

  deleteItem(index,id) {
    let notes_array = this.storage.get('notes');
    notes_array.then(val => {
      val.splice(index, 1);
      this.storage.set('notes', notes_array);
      setTimeout(() => {
        this.dataRetrieve(this.token)
      }, 1000);

    })
  }

  async editNotesModel(index, title, text, location, book_id) {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'notesName',
          value: title,
          placeholder: 'Notes Title'
        },
        {
          name: 'text1',
          type: 'textarea',
          value: text,
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'update',
        handler: data => {
          this.updateNotes(index, data.notesName, data.text1, location, book_id);
        }
      }
      ]

    });
    await alert.present();
  }


  updateNotes(index, title, text, location, book_id) {
    let notes1 = this.storage.get('notes');
    let list_notes = { book_id: book_id, location: location, note_text: text, title: title }

    notes1.then(val => {

      val[index] = list_notes;
      this.storage.set('notes', notes1);
    })
    setTimeout(() => {
      this.dataRetrieve(this.token)
    }, 1000);
  }

}
