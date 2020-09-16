import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  HttpClient,
  HttpErrorResponse, HttpEventType, HttpHeaders, HttpRequest
} from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FileUploadComponent implements OnInit {
  /** Link text */
  @Input() text = 'Image';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'image';
  /** Target URL for file uploading. */
  //@Input() target = 'https://file.io';
  @Input() target = 'https://api.imgbb.com/1/upload?key=a70a592df33f6445fadef89c9b8f366b';
  /** File extension that accepted, same as 'accept' of <input type="file" />.
      By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  @Input() clearFileAfterUpload = false;

  images = [];

  @Input() set selectedImage(url: string) {
    console.log(">>>>>>"+url);
   
    this.images = [];
    if(url&&url!="")
    this.images.push(url);
  }



  public files: Array<FileUploadModel> = [];



  addImage(url: string) {
   
    this.images=[];
  
    this.images.push(url);
  }

  removeImage(index: number,img:string) {
    this.images.splice(index, 1);
    this.images=[];
    this.remove.emit(img);
  }


  constructor(private _http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
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
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    let headers = new HttpHeaders();
    headers = headers.append("skip", "true");
    const req = new HttpRequest('POST', this.target, fd, {
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
          this.complete.emit(event.body);
          this.addImage(event.body.data.display_url);
          if (this.clearFileAfterUpload) {
            this.removeFileFromArray(file);
          }
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  uploaded: boolean;
  sub?: Subscription;
}
