import { Component, OnInit} from '@angular/core';
// import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { File } from '@ionic-native/file/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import $ from "jquery";
import "turn.js"; 
import { Platform } from '@ionic/angular';
import * as pdfjsLib from 'pdfjs-dist';
import  pdfjs  from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// import { PDFPageProxy, PDFPageViewport, PDFRenderTask } from 'pdfjs-dist';

@Component({
  selector: 'app-readpdf',
  templateUrl: './readpdf.page.html',
  styleUrls: ['./readpdf.page.scss'],
})
export class ReadpdfPage{
  // private document: DocumentViewer
  _PDF_DOC:any;
  _CURRENT_PAGE:any;
  _TOTAL_PAGES:any;
  _PAGE_RENDERING_IN_PROGRESS:any = 0;
  _CANVAS:any;
  wvInstance: any;

  urlfirst:any;
  constructor(
    private sqdatabaseService:SqdatabaseService
    ,private file:File
    ,private route:ActivatedRoute,
    public platform: Platform) { }
  
  async ngOnInit() {
// $(document).ready(()=>{
//   $("#flipbook").turn({
//     width: '100%',
//     height: '100%',
//       autoCenter: true, 
//       turncorner:true,

//     });
// })
  

    var urlbook = this.route.snapshot.paramMap.get('id');
    // const options: DocumentViewerOptions = {
    //   title: 'My PDF',
     
    // }
    // this.document.viewDocument(urlfirst, 'application/pdf', options);

    // this.sqdatabaseService.getDownloadedBookLocation().then(val => {
    //   val.forEach(element => {
    //     if (element.id == urlbook) {
    //       let urls = element.book_location;
    //   this.urlfirst= this.file.externalRootDirectory+"Universal-Book/"+urls;

    //     }
    //   });

    // });
    
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    // pdfjsLib.getDocument({ url: pdf_url })
    let pdf_doc = await pdfjsLib.getDocument({ url:'../../assets/firstone.pdf'});
 
    await pdf_doc.promise.then((pdf)=>{
      let total_pages = pdf.numPages;
      let page =  pdf.getPage(4);
    //   var render_context = {
    //     canvasContext: document.querySelector('#pdf-canvas').getContext('2d'),
     
    // };
      // console.log(page.view(0))
    })

    // document.querySelector('#pdf-canvas');
  
  }


}
