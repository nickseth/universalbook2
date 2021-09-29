import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from "@angular/forms";
import { ModalController } from '@ionic/angular';
// import { ImageviewerPage } from '../imageviewer/imageviewer.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  ionicForm: FormGroup;
  requestOptions: any;
  username:any='';
  first_name:any='';
  last_name:any='';
  email:any='';
  croppedImagepath:any = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(public formBuilder: FormBuilder,
    public modalController: ModalController,
    private camera:Camera,
    public file:File,
    public actionSheetController: ActionSheetController,
    ) { 

    this.ionicForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      username:[''],
      email:[''],
      oldPassword:[''],
      ConfiPassword:[''],
      newPassword:['']
   })
  
  }

  ngOnInit() {
    this.username = 'BhupendraSingh';
    this.first_name='Bhupendra';
    this.last_name='Singh';
    this.email='bhupendra@gmail.com';
    this.croppedImagepath = '../assets/icon/cat.jpg';
  }
  
  submitForm(){
    console.log(this.ionicForm.value);
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
      // alert(this.croppedImagepath);
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

}
