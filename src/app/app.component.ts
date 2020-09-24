import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditorInstance, EditorOption, MarkdownService } from 'ngx-markdown';
import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { FileUploadModel } from './components/file-upload/file-upload.component';
import { OverlayService } from './components/overlay/overlay.service';
import { UserService } from './services/api';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // variable-binding
  // put the text completely on the left to avoid extra white spaces
  markdownText: string =
    `### Markdown example
 ---
 This is an **example** where we bind a variable to the \`markdown\` component that is also bind to the editor.
 #### example.component.ts
 \`\`\`javascript
 function hello() {
   alert('Hello World');
 }
 \`\`\`
 #### example.component.html
 \`\`\`html
 <textarea [(ngModel)]="markdown"></textarea>
 <markdown [data]="markdown"></markdown>
 \`\`\``;



  title = 'flashsurvey';
  public displayProgressSpinner = false;
  constructor(private _http: HttpClient, private fb: FormBuilder, private markdownService: MarkdownService, private elementRef: ElementRef<HTMLElement>, overlayService: OverlayService, private userService: UserService) {
    this.userService.populate();
    overlayService.progressBarVisibility.subscribe((data) => {
      this.displayProgressSpinner = data;
    });

  }

  headings: Element[];



  onLoad(): void {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>");
    this.stripContent();
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
    console.log(headings);
  }

  private stripContent(): void {
    this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll('markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents')
      .forEach(x => x.remove());
  }


  templateForm: FormGroup;
  editorOptions: EditorOption;
  bsEditorInstance: EditorInstance;

  ngOnInit() {
    this.editorOptions = {
      autofocus: false,
      iconlibrary: 'fa',
      savable: false,
      onFullscreenExit: (e) => this.hidePreview(e),
      onShow: (e) => this.bsEditorInstance = e,
      parser: (val) => this.parse(val),
      enableDropDataUri: true,
      additionalButtons: [
        [{
          name: 'groupFont',
          data: [{
            name: 'cmdStrikethrough',
            toggle: false,
            title: 'Strikethrough',
            icon: {
              fa: 'fa fa-strikethrough',
              glyph: 'glyphicon glyphicon-minus'
            },
            callback: (e) => {
              // Give/remove ~~ surround the selection
              let chunk;
              let cursor;
              const selected = e.getSelection();
              const content = e.getContent();

              if (selected.length === 0) {
                // Give extra word
                chunk = e.__localize('strikethrough');
              } else {
                chunk = selected.text;
              }

              // transform selection and set the cursor into chunked text
              if (content.substr(selected.start - 2, 2) === '~~' &&
                content.substr(selected.end, 2) === '~~') {
                e.setSelection(selected.start - 2, selected.end + 2);
                e.replaceSelection(chunk);
                cursor = selected.start - 2;
              } else {
                e.replaceSelection('~~' + chunk + '~~');
                cursor = selected.start + 2;
              }

              // Set the cursor
              e.setSelection(cursor, cursor + chunk.length);
            }
          }]
        },
        {
          name: 'groupMisc',
          data: [{
            name: 'cmdTable',
            toggle: false,
            title: 'Table',
            icon: {
              fa: 'fa fa-table',
              glyph: 'glyphicon glyphicon-th'
            },
            callback: (e) => {
              // Replace selection with some drinks
              let chunk;
              let cursor;
              const selected = e.getSelection();
              let image = '![description](' + this.uploadImage() + ')';

              chunk = '\n| WOW        | Are           | Cool  | \n'
                + '| ------------- |:-------------:| -----:| \n'
                + '| col 3 is      | right-aligned | $1600 | \n'
                + '| col 2 is      | centered      |   $12 | \n'
                + '| zebra stripes | are neat      |    $1 |';

              // transform selection and set the cursor into chunked text
              e.replaceSelection(image);
              cursor = selected.start;

              // Set the cursor
              e.setSelection(cursor, cursor + image.length);
            }
          }]
        }]
      ]


    };

    this.buildForm(this.markdownText);
    this.onFormChanges();

    $(document).ready(function() {
      $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
          e.preventDefault();
          $(this).siblings('a.active').removeClass("active");
          $(this).addClass("active");
          var index = $(this).index();
          $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
          $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
      });
  });

  
    var copyid = 0;
    $(document).ready(function () {
      $('pre').each(function () {
        copyid++;
        $(this).attr('data-copyid', copyid).wrap('<div class="pre-wrapper"/>');
        $(this).parent().css('margin', $(this).css('margin'));
        $('<button class="copy-snippet">Copy</button>').insertAfter($(this)).data('copytarget', copyid);
      });

      $('.copy-snippet').click(function (e) {


        e.preventDefault();

        var $copyButton = $(this);

        let $pre = $(document).find('pre[data-copyid=' + $copyButton.data('copytarget') + ']');
        if ($pre.length) {
          var textArea = document.createElement("textarea");

          // Place in top-left corner of screen regardless of scroll position.
          textArea.style.position = 'fixed';
          // textArea.style.top = 0;
          // textArea.style.left = 0;

          // Ensure it has a small width and height. Setting to 1px / 1em
          // doesn't work as this gives a negative w/h on some browsers.
          textArea.style.width = '2em';
          textArea.style.height = '2em';

          // We don't need padding, reducing the size if it does flash render.
          // textArea.style.padding = 0;

          // Clean up any borders.
          textArea.style.border = 'none';
          textArea.style.outline = 'none';
          textArea.style.boxShadow = 'none';

          // Avoid flash of white box if rendered for any reason.
          textArea.style.background = 'transparent';

          //Set value to text to be copied
          textArea.value = $pre.text();

          document.body.appendChild(textArea);
          textArea.select();

          try {
            document.execCommand('copy');
            $copyButton.text('Copied').prop('disabled', true);;
          } catch (err) {
            $copyButton.text('FAILED: Could not copy').prop('disabled', true);;
          }
          setTimeout(function () {
            $copyButton.text('Copy').prop('disabled', false);;
          }, 3000);

        }

      });

    });



  }

  buildForm(markdownText) {
    this.templateForm = this.fb.group({
      body: [this.markdownText],
      isPreview: [true]
    });



  }

  onFormChanges(): void {
    this.templateForm.valueChanges.subscribe(formData => {
      if (formData) {
        this.markdownText = formData.body;

        // $(document).ready(function () {
        //   $('code, pre').append('<span class="command-copy" ><i class="fa fa-clipboard" aria-hidden="true"></i></span>');

        //   $('pre span.command-copy').click(function (e) {
        //     var text = $(this).parent().text().trim();
        //     var copyHex = document.createElement('input');
        //     copyHex.value = text
        //     document.body.appendChild(copyHex);
        //     copyHex.select();
        //     document.execCommand('copy');
        //     console.log(copyHex.value)
        //     document.body.removeChild(copyHex);
        //   });
        // });




      }
    });
  }



  /** highlight all code found, needs to be wrapped in timer to work properly */
  highlight() {
    setTimeout(() => {
      this.markdownService.highlight();
    });
  }

  hidePreview(e) {
    if (this.bsEditorInstance && this.bsEditorInstance.hidePreview) {
      this.bsEditorInstance.hidePreview();
    }
  }

  showFullScreen(isFullScreen: boolean) {
    if (this.bsEditorInstance && this.bsEditorInstance.setFullscreen) {
      this.bsEditorInstance.showPreview();
      this.bsEditorInstance.setFullscreen(isFullScreen);
    }
  }

  parse(inputValue: string) {
    const markedOutput = this.markdownService.compile(inputValue.trim());
    this.highlight();

    return markedOutput;
  }

  public files: Array<FileUploadModel> = [];

  uploadImage(): string {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {

      if (fileUpload.files.length > 2) {
        alert("You can only upload a maximum of 2 files");
        return;
      }

      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.pop();
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true, uploaded: false
        });
      }
      return this.uploadFiles();
    };
    fileUpload.click();
    return "";
  }

  private uploadFiles(): string {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      return this.uploadFile(file);
    });
    return "";
  }

  private uploadFile(file: FileUploadModel): string {
    const fd = new FormData();
    fd.append('image', file.data);

    let headers = new HttpHeaders();
    headers = headers.append("skip", "true");
    const req = new HttpRequest('POST', 'https://api.imgbb.com/1/upload?key=a70a592df33f6445fadef89c9b8f366b', fd, {
      reportProgress: true,
      headers: headers
    });


    file.inProgress = true;


    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          //this.removeFileFromArray(file);
          file.canCancel = false;
          file.uploaded = true;
          // this.complete.emit(event.body);
          // this.addImage(event.body.data.display_url);
          console.log(event.body.data.display_url);
          // if (this.clearFileAfterUpload) {
          //   this.removeFileFromArray(file);
          // }
          return event.body.data.display_url;
        }
      }
    );

    return "";
  }



}
