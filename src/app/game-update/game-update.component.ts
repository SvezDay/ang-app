import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { GameService }                 from '../_core/game.service';

@Component({
  moduleId: module.id,
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.css'],
  providers: [GameService]
})
export class GameUpdateComponent implements OnInit {
  courseWait = [];
  courseRecallable = [];
  constructor(
    private gameService: GameService
  ) { }

  recallable(){
    this.gameService
    .query('get', '/game_course_recallable')
    .subscribe( response => {
      this.courseRecallable = response;
      console.log(this.courseRecallable);
    }, error => {
      console.log(error);
    });
  };

  ngOnInit() {
    this.gameService
    .query('get', '/course_wait_recall')
    .subscribe( response => {
      this.courseWait = response;
      console.log(this.courseWait);
    }, error => {
      console.log(error);
    });
  };

}
