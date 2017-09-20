import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { GameService }                 from '../_core/game.service';

@Component({
  moduleId: module.id,
  selector: 'app-game-recall',
  templateUrl: './game-recall.component.html',
  styleUrls: ['./game-recall.component.css'],
  providers:[GameService]
})
export class GameRecallComponent implements OnInit {
  gameType: any;
  question = {labels: [] || "",properties: {} } as any;
  response = {labels: [] || "",properties: {} } as any;
  recall_id: any;
  toggle = false;
  empty = false;


  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  recall(){
    console.log('check')
    this.gameService.query('get', `/game_${this.gameType}`)
      .subscribe((sub)=>{
        console.log(sub.response)
        if(sub.response.status == 204){ // aka No content on response
          console.log('no more question');
          this.empty = true;
          // this.router.navigate(['/game_list']);
        }else{
          this.question = sub.data.data.startNode;
          this.response = sub.data.data.endNode;
          this.recall_id = sub.data.data.recall_id;
        };
      },(error)=>{
        console.log(error);
        // error.status == 401 ? this.router.navigate(['/authenticate']) : null
      });
  };


  answering(bool){
    console.log(bool)
    let params = {bool:bool, recall_id:this.recall_id};
    this.gameService.query('post', '/game_answering', params)
    .subscribe(
      () => {
        console.log('Answer done');
        this.recall();
      },
      error => {
        console.log(error);
      });
  };


  ngOnInit() {
    this.route.queryParams
    .subscribe(params =>{
      this.gameType = params.type;
      this.recall();
    });
  };

};
