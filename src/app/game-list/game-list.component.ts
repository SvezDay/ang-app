import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { GameService }                 from '../_core/game.service';

@Component({
  moduleId: module.id,
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  providers:[GameService]
})
export class GameListComponent implements OnInit {
  // timer = require('./timer.jpg');
  list = {} as any;
  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  new_result(){
    this.gameService.query('post', '/api/new_result', {id:1})
    .subscribe((response)=>{
      console.log(response);
    },(error)=>{
      console.log(error);
    });
  };

  start(type){
    this.router.navigate(['/game_recall'], {queryParams:{type:type}})
  };

  ngOnInit() {
    this.gameService.query('get', '/api/get_all_course')
    .subscribe((response)=>{
      console.log(response);
    },(error)=>{
      console.log(error);
    });


  };

}
