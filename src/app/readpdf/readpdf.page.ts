import { Component, OnInit} from '@angular/core';
// import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { File } from '@ionic-native/file/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import $ from "jquery";
import "turn.js"; 
import { Platform } from '@ionic/angular';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// import { PDFPageProxy, PDFPageViewport, PDFRenderTask } from 'pdfjs-dist';

@Component({
  selector: 'app-readpdf',
  templateUrl: './readpdf.page.html',
  styleUrls: ['./readpdf.page.scss'],
})
export class ReadpdfPage{

  wvInstance: any;
  urlfirst:any;
  pdf_doc:any;
  countPages:any;
  pdfDoc:any = null;
  scale:any = 1.5;
   pageNum:any = 1;
   pagerendering:any = false;
  pageNumPending:any = null;
  canvas:any;
  ctx:any;
  currentpage:any;
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
//       // autoCenter: true, 
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
   
    // await this.pdf_doc.promise.then((pdf)=>{
    //   let total_pages = pdf.numPages;
    //   let page =  pdf.getPage(4);
     
//      page.then(val=>{
//       var pdf_original_width = val.getViewport(1).width;
//       var scale_required = this._CANVAS.width / pdf_original_width;
//  let scl = val.getViewport({scale:1});
//  var canvas = document.getElementById('pdf-canvas');
//  var ctx = canvas.getContext("2d");
//  var render_context = {
//   canvasContext: this._CANVAS.cc('2d'),
//   viewport: scl
// };
    //  })
    // })
this.getconntent();

  }
  async getconntent(){
   
   
    // var ctx = canvas.getContext('2d');
    this.pdf_doc = await pdfjsLib.getDocument({ url:'../../assets/firstone.pdf'}).promise.then((doc)=>{
      this.pdfDoc = doc;
      this.countPages = doc.numPages;
      
      // for(let i=1;i<=this.countPages;i++){
        this.renderPage(this.pageNum);
      // }
   
    });

  }
renderPage(num){
  this.canvas = document.getElementById("pdf_canvas");
  this.ctx = this.canvas.getContext('2d');
  this.pagerendering = true;
  this.pdfDoc.getPage(num).then((page)=>{
    var viewport = page.getViewport({scale:this.scale});
    this.canvas.height = viewport.height;
    this.canvas.width = viewport.width;
    var renderContext = {
      canvasContext:this.ctx,
      viewport:viewport
    }
    var renderTask = page.render(renderContext)
    renderTask.promise.then(()=>{
      this.pagerendering = false;
     
      if(this.pageNumPending != null){
        this.renderPage(this.pageNumPending)
        this.pageNumPending = null;
      }
    })
  })
  this.currentpage = num;
}
queueRenderingPage(num){
  if(this.pagerendering){
    this.pageNumPending = num;

  } else{
this.renderPage(num);
  }
}
onPrevPage(){
  if(this.pageNum <= 1){
    return
  }
  this.pageNum--;
  this.queueRenderingPage(this.pageNum);
  $('#flipbook').turn('previous');
}
onNextPage(){
  if(this.pageNum >= this.countPages){
    return
  }
  this.pageNum++;
  this.queueRenderingPage(this.pageNum);
  $('#flipbook').turn('next');
}
onzoomOut(){
  this.scale -=0.1;
  this.renderPage(this.pageNum);
}
onzoomIn(){
  this.scale +=0.1;
  this.renderPage(this.pageNum);
}
}
