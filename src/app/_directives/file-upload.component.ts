import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../_core/api.service';
import { Observable } from 'rxjs/Rx'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component ({
  moduleId: module.id,
  selector: 'file-upload',
  template: `<input type="file" (change)="upload()" [multiple]="multiple" #fileInput>`,
  providers: [ApiService]
})

export class FileUploadComponent {
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  @Output() resp: EventEmitter<any> = new EventEmitter<any>();
  uploadInProgress: boolean = false;

  constructor(
    private http: Http,
    private api: ApiService ){ }

  upload(){
    let url = "http://localhost:3200/api/user_upload_data";
    // return Observable.create(observer => {
      console.log('chek')
      let files: HTMLInputElement = this.inputEl.nativeElement.files,
          fileCount: number = this.inputEl.nativeElement.files.length,
          formData: FormData = new FormData();

      // !fileCount ? this.resp.emit({error:'No file selected'}) : null
      // if(!fileCount){
      //   this.resp.emit({error:'No file selected'})
      //   console.log('check filecount')
      // }
      // for (let i = 0; i < fileCount; i++) {
      //     formData.append('upload[]', files[i]);
      // }
      console.log('fileCount', fileCount)
      console.log('files', files[0])
      formData.append('upload[]', files[0])
      // formData.append('upload[]', 'hello')
      // setTimeout(()=>{
      //
        console.log('formData', formData)
      // }, 1000)
      // this.api.query('post', '/user_upload_data', [{content: formData}])
      // .subscribe(
      //   res => { this.resp.emit(res) },
      //   err => { this.resp.emit(err) })
      let xhr = new XMLHttpRequest();
      // this.uploadInProgress = true;
      // xhr.onreadystatechange = () => {
      //     if (xhr.readyState === 4) {
      //         if (xhr.status === 200) {
      //             observer.next(JSON.parse(xhr.response));
      //             observer.complete();
      //         } else {
      //             observer.error(xhr.response);
      //         }
      //         this.uploadInProgress = false;
      //     }
      // }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-access-token', localStorage.getItem('auth_token'));
      xhr.send(formData);
    // });
  }

}
