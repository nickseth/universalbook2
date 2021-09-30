import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import Epub from 'epubjs';
import Book from 'epubjs/src/book';
import Rendition from 'epubjs/src/rendition';
import { NavItem } from 'epubjs/src/navigation';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NotesService } from './../api/notes.service';
import { AuthenticationService } from './../api/authentication.service';
import { ModalController } from '@ionic/angular';
import { CalculatorPage } from '../calculator/calculator.page';
import { GoogleSearchPage } from '../search/google-search.page';
import { Themes } from 'epubjs/src/themes';
import { SqdatabaseService } from './../api/sqdatabase.service';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-bookreader',
  templateUrl: './bookreader.page.html',
  styleUrls: ['./bookreader.page.scss'],
})
export class BookreaderPage implements OnInit {
  book_id: any;
  data: any;
  darkValue: any;
  fontSize: any;
  font_family: any;
  line_height: any;
  description1 = null;
  showShortDesciption = true;
  bookTitle = '';
  chapterTitle = '';
  book: Book;
  rendition: Rendition;
  chapters: NavItem[];
  themes: Themes;
  navOpen: Boolean;
  currentChapter: any;
  sessionId: string;
  pollInterval: any;
  theme_color: any;
  curr_location: any;
  bookmarkTitle: any;
  bookmarks: any;
  spine1: any;
  csrf_csrf: any;
  book_bookmark_highlight: any;
  bookmarkData: any;
  bookmarks_index: any;
  bookmark_highlightData: any;
  token: any;
  selctedtext: any = '';
  list22: string[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
    , public actionSheetController: ActionSheetController,
    public alertController: AlertController
    , public notesService: NotesService,
    private authenticationService: AuthenticationService,
    public sqdatabaseService: SqdatabaseService,
    public modalController: ModalController,
    public file:File,
    private androidPermissions:AndroidPermissions
  ) {


    this.storage.create();
    this.authenticationService.getToken().then(val => {
      this.token = val.value;
    })
    setTimeout(() => {
      document.getElementById("defaultOpen").click();
      this.openCity(event, 'chapter');
    }, 100);
  }

  async presentActionSheet(cfiurl, text, index) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Action',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Add Highlight',
        icon: 'add',
        handler: () => {
          this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
          let list_bookmarks = { book_id: 12, type: "highlight", location: cfiurl, bookChapter: this.currentChapter.label, text: text }

          this.book_bookmark_highlight.then(val => {

            if (val != null) {

              val.push(list_bookmarks);
              this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
            } else {

              this.book_bookmark_highlight = [];
              this.book_bookmark_highlight.push(list_bookmarks);
              this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
              setTimeout(() => {
                this.showbookmark();
              }, 1000);
            }
          })
        }
      },
      {
        text: 'Remove Highlights',
        role: 'destructive',
        icon: 'trash',
        handler: () => {

          if (index != null) {
            let book = this.storage.get('bookmark' + this.book_id);
            book.then(val => {
              val.splice(index, 1);
              this.storage.set('bookmark' + this.book_id, book);
              this.rendition.annotations.remove(cfiurl, "highlight");
              setTimeout(() => {
                this.showbookmark();
              }, 1000);
            })
          } else {
            this.rendition.annotations.remove(cfiurl, "highlight");
            setTimeout(() => {
              this.showbookmark();
            }, 1000);
            return this.rendition.display(cfiurl);
          }
        }
      },
      {
        text: 'Create Notes',
        icon: 'create',
        handler: () => {
          if (cfiurl) {

            this.Modelopener(text);
          }
        }
      }
        , {
        text: 'Google',
        icon: 'logo-google',
        handler: () => {
          this.presentModal2(text);
        }
      }, {
        text: 'Wikipedia',
        icon: 'globe-outline',
        handler: () => {
          this.presentModal3(text);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
  }
  book_highlight(cfiRange, text) {
    this.presentActionSheet(cfiRange, text, null);
    this.rendition.annotations.add('highlight', cfiRange, {}, (e) => {
      this.presentActionSheet(cfiRange, text, null);


    }, "hl", { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" });
  }

  getPermission(){
    let list: string[] = [
      this.androidPermissions.PERMISSION.MANAGE_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    ]
    return this.androidPermissions.requestPermissions(list).then(res => {
      console.log(res); // res = {hasPermission: false}
    });
  }

  ngOnInit() {

    this.book_id = this.route.snapshot.paramMap.get('id');
    if(this.getPermission()) {
      this.epubFileReader(this.book_id);
    }
  
   

  }
  epubFileReader(urlbook) {
    // 
    this.book = Epub('https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub');
      // this.book = Epub(this.file.externalRootDirectory+"Universal-Book/"+urls);
    // this.sqdatabaseService.getDownloadedBookLocation().then(val => {
    //   val.forEach(element => {
    //     if (element.id == urlbook) {
    //       // this.book = Epub('../../assets/robert-louis-stevenson_treasure-island.epub' , { replacements: "blobUrl" });
    //       // this.book = Epub('https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub');
    //       //          // "https://standardebooks.org/ebooks/robert-louis-stevenson/treasure-island/downloads/robert-louis-stevenson_treasure-island.epub"
    //       // this.webview.convertFileSrc()
    //       // let urlabc =  Filesystem.readFile({
    //       //   path: element.book_location
    //       // });
    //       let urls = element.book_location;
    //       // let filename1 = urls.substring(urls.lastIndexOf('/')+1);
    
    //      this.book = Epub(this.file.externalRootDirectory+"Universal-Book/"+urls);
        
    //     }
    //   });

    // });

    this.rendition = this.book.renderTo('viewer', { flow: 'auto', width: '100%', ignoreClass: 'annotator-hl', height: '100%', manager: "continuous" });
    let current_location2 = this.storage.get('current_location' + this.book_id);
    current_location2.then(val => {
      if (val != null) {
        setTimeout(() => {
          this.rendition.display(val);
        }, 1000);

      } else {
        this.rendition.display();
      }
    });
    this.rendition.display();
    this.navOpen = false;

    this.rendition.on('rendered', (section) => {
      this.currentChapter = this.book.navigation.get(section.href);
    });

    // let touchStart = 0;
    // let touchEnd = 0;

    // this.rendition.on('touchstart', event => {
    //   touchStart = event.changedTouches[0].screenX;
    // });

    // this.rendition.on('touchend', event => {
    //   touchEnd = event.changedTouches[0].screenX;
    //   if (touchStart < touchEnd) {

    //     this.showPrev();
    //   }
    //   if (touchStart > touchEnd) {
    //     this.showNext();
    //   }
    // });


    this.rendition.hooks.content.register((contents) => {

      var loaded = Promise.all([
        contents.addScript("../../assets/js/jquery.min.js"),
        // contents.addScript("../../assets/js/swipedetector.js"),
        contents.addClass("iframe-turn"),
        contents.addStylesheet('../../assets/css/theme.css')
      ]);

      return loaded;
    });
    this.rendition.on('relocated', (location) => {

      let locationCfi = location.start.cfi;
      let spineItem = this.book.spine.get(locationCfi);
      let navItem = this.book.navigation.get(spineItem.href);
      this.chapterTitle = navItem.label;
    });


    this.storage.get('dark2').then((ev) => {
      if (ev == null) {
        this.storage.set('dark2', 'light');
        this.rendition.themes.select("light1");
        document.querySelector('#main-book-section').classList.remove('lite_dark');
        document.querySelector('#main-book-section').classList.remove('dark2');
        document.querySelector('#main-book-section').classList.remove('blue');
        document.querySelector('#main-book-section').classList.remove('lite_white');
        document.querySelector('#main-book-section').classList.remove('lite_blue');

        document.querySelector('#main-book-section2').classList.remove('lite_dark');
        document.querySelector('#main-book-section2').classList.remove('dark2');
        document.querySelector('#main-book-section2').classList.remove('blue');
        document.querySelector('#main-book-section2').classList.remove('lite_white');
        document.querySelector('#main-book-section2').classList.remove('lite_blue');
      } else {
        if (ev == 'dark') {
          this.rendition.themes.select("dark1");

          document.querySelector('#main-book-section').classList.add('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        } else if (ev == 'lite_blue') {
          this.rendition.themes.select("lite_blue");
          document.querySelector('#main-book-section').classList.add('lite_blue');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        } else if (ev == 'blue1') {
          this.rendition.themes.select("blue");
          document.querySelector('#main-book-section').classList.add('blue');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('blue');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        } else if (ev == 'lite_white') {
          this.rendition.themes.select("lite_white");
          document.querySelector('#main-book-section').classList.add('lite_white');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_dark');

          document.querySelector('#main-book-section2').classList.add('lite_white');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_dark');

        } else if (ev == 'lite_dark') {
          this.rendition.themes.select("lite_dark");
          document.querySelector('#main-book-section').classList.add('lite_dark');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('lite_blue');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');

          document.querySelector('#main-book-section2').classList.add('lite_dark');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');

        } else {
          this.rendition.themes.select("light1");
          document.querySelector('#main-book-section').classList.remove('lite_dark');
          document.querySelector('#main-book-section').classList.remove('dark2');
          document.querySelector('#main-book-section').classList.remove('blue');
          document.querySelector('#main-book-section').classList.remove('lite_white');
          document.querySelector('#main-book-section').classList.remove('lite_blue');

          document.querySelector('#main-book-section2').classList.remove('lite_dark');
          document.querySelector('#main-book-section2').classList.remove('dark2');
          document.querySelector('#main-book-section2').classList.remove('blue');
          document.querySelector('#main-book-section2').classList.remove('lite_white');
          document.querySelector('#main-book-section2').classList.remove('lite_blue');
        }
      }

    });


    this.storage.get('fontSizefor').then((val) => {
      if (val != null) {
        this.fontSize = val;
        setTimeout(() => {
          document.getElementById("fsize" + this.fontSize).classList.add("fsizecol");
          this.rendition.themes.fontSize(this.fontSize + "pt");


        }, 1000);
      } else {
        this.storage.set('fontSizefor', 8);
        document.getElementById("fsize8").classList.add("fsizecol");
        this.rendition.themes.fontSize(8 + "pt");
      }
    });
    this.storage.get('font_family').then((val) => {
      if (val != null) {
        this.font_family = val;
        setTimeout(() => {
          document.getElementById("ffamily_" + this.font_family).classList.add("fsizecol");
          this.rendition.themes.font(this.font_family);
        }, 1000);
      } else {
        this.storage.set('font_family', 'times_new_roman');
        document.getElementById("ffamily_Arial").classList.add("fsizecol");
        this.rendition.themes.font("times_new_roman");
        this.font_family = "times_new_roman";

      }
    });
    this.storage.get('line_height').then((val) => {
      if (val != null) {
        this.line_height = val;
        setTimeout(() => {
          document.getElementById("linespacing" + this.line_height).classList.add("fsizecol");
          this.rendition.themes.default({ "body": { "line-height": this.line_height } });
        }, 1000);
      } else {
        this.storage.set('line_height', 1);
        document.getElementById("linespacing1").classList.add("fsizecol");
        this.rendition.themes.default({ "body": { "line-height": 1 } });
      }
    });
    this.book.loaded.spine.then(spine => {
      // console.log(spine);
      spine.each(item => {

        let i: any = "1";
        this.rendition.on("rendered", section => {
          var current = this.book.navigation.get(item.href);
          if (i <= 1) {
            var ion_item1 = document.createElement("ion-item");
            ion_item1.innerHTML = current.label;
            ion_item1.className = 'chapters';
            ion_item1.style.padding = "10px";
            ion_item1.onclick = () => {
              this.chapterTitle = current.label;
              this.storage.set('current_location' + this.book_id, item.href);
              this.rendition.display(item.href);
            }
            var cpt = document.querySelector('#chapter');
            cpt.append(ion_item1);
            i++;
          } else {
          }

        });

      });
    });

    this.storeChapters();
    this.book.loaded.metadata.then(meta => {
      // console.log(meta);
      this.bookTitle = meta.title;

    });
    this.rendition.on("selected", (cfiRange, contents) => {

      this.book.getRange(cfiRange).then(range => {

        if (range.toString()) {
          this.book_highlight(cfiRange, range.toString());
        }
      });
      contents.window.getSelection().removeAllRanges();

    });


    ///theme background change------------------------------------------
    this.rendition.themes.register("dark1",
      {
        "body": { "background-color": "#111111", "color": "#ffffff" }
      });

    this.rendition.themes.register("blue1",
      {
        "body": { "background-color": "rgb(51, 51, 51)", "color": "rgb(238, 238, 238)" }
      });

    this.rendition.themes.register("lite_white",
      {
        "body": { "background-color": "rgb(245, 222, 179)", "color": "rgb(0, 0, 0)" }
      });

    this.rendition.themes.register("lite_dark",
      {
        "body": { "background-color": "rgb(17, 17, 17)", "color": "rgb(245, 222, 179)" }
      });

    this.rendition.themes.register("lite_blue",
      {
        "body": { "background-color": "rgb(17, 27, 33)", "color": "rgb(232, 232, 232)" }
      });

    this.rendition.themes.register("light1",
      {
        "body": { "background-color": "#ffffff", "color": "#000000" }
      });

    this.rendition.on('relocated', (location) => {
      this.storage.get('bookmark' + this.book_id).then((val) => {

        if (val != null) {
          if (val.some(item => item.location === location.start.cfi)) {

            this.bookmarkData = true;
            this.bookmarks_index = location.start.cfi;

          } else {
            this.bookmarkData = false;
          }
        }
      });
    });

    this.storage.get('bookmark' + this.book_id).then((val) => {
      var result = val.filter(function (item) {
        return item.type == 'highlight';
      });
      result.forEach((element, index) => {

        this.rendition.annotations.add('highlight', element.location, {}, (e) => {

          this.presentActionSheet(element.location, element.text, index);


        }, "hl", { "fill": "yellow", "fill-opacity": "0.3", "mix-blend-mode": "multiply" });
      });
    })
  }

  setbookmark() {
    let current_location = this.rendition.currentLocation();
    // current_location.bookmark_chapter = this.currentChapter;
    this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
    let list_bookmarks = { book_id: 12, type: "bookmark", location: current_location.start.cfi, bookChapter: this.currentChapter.label }

    this.book_bookmark_highlight.then(val => {

      if (val != null) {

        val.push(list_bookmarks);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
      } else {

        this.book_bookmark_highlight = [];
        this.book_bookmark_highlight.push(list_bookmarks);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
      }
    })

    this.bookmarkData = true;

    setTimeout(() => {
      this.showbookmark();
    }, 1000);
  }
  async showbookmark() {

    var highlights = document.getElementById('highlights');
    await this.storage.get('bookmark' + this.book_id).then((val) => {
      this.bookmark_highlightData = val;
    });
  }
  deletehighlight(item) {

    this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
    this.book_bookmark_highlight.then(val => {
      let index = val.findIndex((rank, index) => rank.location === item && rank.type === "highlight");

      if (index >= 0) {

        val.splice(index, 1);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
        this.rendition.annotations.remove(item, "highlight");
        this.rendition.display(item);
        setTimeout(() => {
          this.showbookmark();
        }, 1000);
      }

    })

  }

  deletebookmark(item) {

    this.book_bookmark_highlight = this.storage.get('bookmark' + this.book_id);
    this.book_bookmark_highlight.then(val => {
      let index = val.findIndex((rank, index) => rank.location === item && rank.type === "bookmark");

      if (index >= 0) {
        val.splice(index, 1);
        this.storage.set('bookmark' + this.book_id, this.book_bookmark_highlight);
        this.bookmarkData = false;
        setTimeout(() => {
          this.showbookmark();
        }, 1000);
      } else {
        this.deletehighlight(item);

      }
    })

  }


  showNext() {
    this.rendition.on('relocated', (location) => {

      this.storage.set('current_location' + this.book_id, location.start.cfi);
    });
    this.rendition.next();
  }

  showPrev() {
    this.rendition.on('relocated', (location) => {

      this.storage.set('current_location' + this.book_id, location.start.cfi);
    });
    this.rendition.prev();
  }
  toggleNav() {
    this.navOpen = !this.navOpen;
    console.log(this.navOpen);
  }

  displayChapter(chapter: any) {
    this.currentChapter = chapter;
    console.log(this.currentChapter);
    this.rendition.display(chapter.href);
  }


  private storeChapters() {
    this.book.loaded.navigation.then(navigation => {
      this.chapters = navigation.toc;

    });
  }


  setFontSize(item) {
    this.storage.set('fontSizefor', item);

    this.storage.get('fontSizefor').then((val) => {

      if (item == val) {

        document.getElementById("fsize" + item).classList.add("fsizecol");

      } else {
        document.getElementById("fsize" + val).classList.remove("fsizecol");
        document.getElementById("fsize" + item).classList.add("fsizecol");
        // document.getElementById('item-description').style.setProperty(`font-size`, item+'px');
        this.rendition.themes.fontSize(item + "pt");
      }

    });
  }

  setFontFamily(family_item) {

    this.storage.set('font_family', family_item);

    this.font_family = family_item;
    this.storage.get('font_family').then((val) => {
      console.log("value" + val)
      if (family_item == val) {

        this.font_family = val;
        document.getElementById("ffamily_" + family_item).classList.add("ion-activated");
        this.rendition.themes.font(this.font_family);
      } else {
        console.log("click se" + family_item)
        document.getElementById("ffamily_" + val).classList.remove("ion-activated");
        document.getElementById("ffamily_" + family_item).classList.add("ion-activated");
        // alert(family_item);
        // this.rendition.themes.default({ "body": { "font-family": family_item}});
        // document.getElementById('item-description').style.setProperty(`font-family`, family_item);
        this.font_family = family_item;
        this.rendition.themes.font(family_item);
      }

    });
  }

  setlineSpacing(spacing) {

    this.storage.set('line_height', spacing);

    this.storage.get('line_height').then((val) => {

      if (spacing == val) {

        document.getElementById("linespacing" + spacing).classList.add("fsizecol");

      } else {
        document.getElementById("linespacing" + val).classList.remove("fsizecol");
        document.getElementById("linespacing" + spacing).classList.add("fsizecol");
        //  document.getElementById('item-description').style.setProperty(`line-height`, spacing);
        this.rendition.themes.default({ "body": { "line-height": spacing } });

      }

    });
  }
  openCity(evt, cityName) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {

      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      // tablinks[i].classList.remove("active");
    }
    document.getElementById(cityName).style.display = "block";
    // evt.currentTarget.classList += "active";
  }


  setTheme2(ev) {
    if (ev == 'dark') {
      this.rendition.themes.select("dark1");

      // document.body.classList.add('dark');
      document.querySelector('#main-book-section').classList.add('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_dark');

      document.querySelector('#main-book-section2').classList.add('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');

    } if (ev == 'lite_blue') {
      this.rendition.themes.select("lite_blue");
      document.querySelector('#main-book-section').classList.add('lite_blue');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_dark');

      document.querySelector('#main-book-section2').classList.add('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');

    } if (ev == 'blue') {
      this.rendition.themes.select("blue1");
      document.querySelector('#main-book-section').classList.add('blue');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_dark');

      document.querySelector('#main-book-section2').classList.add('blue');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');

    } if (ev == 'lite_white') {
      this.rendition.themes.select("lite_white");
      document.querySelector('#main-book-section').classList.add('lite_white');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_dark');


      document.querySelector('#main-book-section2').classList.add('lite_white');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_dark');

    } if (ev == 'lite_dark') {
      this.rendition.themes.select("lite_dark");
      document.querySelector('#main-book-section').classList.add('lite_dark');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('lite_blue');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');


      document.querySelector('#main-book-section2').classList.add('lite_dark');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
    }
    if (ev == 'light') {
      this.rendition.themes.select("light1");
      document.querySelector('#main-book-section').classList.remove('lite_dark');
      document.querySelector('#main-book-section').classList.remove('dark2');
      document.querySelector('#main-book-section').classList.remove('blue');
      document.querySelector('#main-book-section').classList.remove('lite_white');
      document.querySelector('#main-book-section').classList.remove('lite_blue');

      document.querySelector('#main-book-section2').classList.remove('lite_dark');
      document.querySelector('#main-book-section2').classList.remove('dark2');
      document.querySelector('#main-book-section2').classList.remove('blue');
      document.querySelector('#main-book-section2').classList.remove('lite_white');
      document.querySelector('#main-book-section2').classList.remove('lite_blue');
    }

    localStorage.test = ev;
    this.storage.set('dark2', ev);

  }

  async Modelopener(val) {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'notesName',
          placeholder: 'Notes Title'
        },
        {
          name: 'selected text',
          type: 'textarea',
          value: val,
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Ok',
        handler: data => {
          this.saveModal(val, data.notesName);
        }
      }
      ]

    });
    await alert.present();
  }
  saveModal(val, title) {
    if (this.token) {
      var notesData = { 'token': this.token, 'title': title, 'description': val };
      this.notesService.addNotes(notesData);
    } else {
      alert('Something Wrong');
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CalculatorPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      animated: true,
      presentingElement: await this.modalController.getTop()
    });
    return await modal.present();
  }

  async presentModal2(txt) {
    const modal = await this.modalController.create({
      component: GoogleSearchPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'googletext': txt,

      }
    });
    return await modal.present();
  }

  async presentModal3(txt) {
    const modal = await this.modalController.create({
      component: GoogleSearchPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'wikitext': txt,


      }
    });
    return await modal.present();
  }

}
