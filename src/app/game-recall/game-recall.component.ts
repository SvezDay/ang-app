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
  question: any;
  response: any;
  toggle = false;


  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  recall(){
    this.gameService.query('get', `/game_${this.gameType}`)
      .subscribe((response)=>{
        this.question = response.data.startNode;
        this.response = response.data.endNode;
        console.log(this.response.properties);
        console.log(this.question.properties.value)
      },(error)=>{
        error.status == 401 ? this.router.navigate(['/authenticate']) : null
        // console.log(error);
      });
  };


  answering(bool){
    console.log(bool)
    this.gameService.query('post', '/game_answering', {bool:bool})
    .subscribe(
      resp => {
        console.log(resp);
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
