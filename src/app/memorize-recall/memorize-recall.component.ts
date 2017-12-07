import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../_core/api.service';
import _ from 'lodash';
import * as $$ from '../_models/all.class';
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'app-memorize-recall',
  templateUrl: './memorize-recall.component.html',
  styleUrls: ['../app.component.css','./memorize-recall.component.css'],
  providers:[ApiService]
})
export class MemorizeRecallComponent implements OnInit {
  question: any;
  response: any;
  toggleRespBool: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.recall();
  }
  recall(){
    this.api.query('get', '/memorize_get_all_recallable')
    .subscribe(res=>{
        console.log('res.data.data', res.data.data);
        this.question = res.data.data.question;
        this.response = res.data.data.response;
      }, err => {
        console.log(err)});
  }
  toggleResponse(){
    this.toggleRespBool ? this.toggleRespBool = false : this.toggleRespBool = true
  }
  recordingResult(b:boolean):void{
    let params = {
      qid: this.question.identity, rid:this.response.identity, result:b };
    this.api.query('post','/memorize_record_result', params)
    .subscribe(res => {
      this.recall();
    }, err=>{ console.log(err) })
  }
}
