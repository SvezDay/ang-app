import { Component, OnInit }           from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';

import { AlertService }                from '../_core/alert.service';
import { GameService }                 from '../_core/game.service';
import { ErrorService }                from '../_core/error.service';

@Component({
  moduleId: module.id,
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.css'],
  providers: [GameService, ErrorService]
})
export class GameUpdateComponent implements OnInit {
  courseWait = [];
  courseRecallable = [];
  constructor(
    private gameService: GameService,
    private errorService: ErrorService
  ) { }


  toggleInToRecall(course){
    this.gameService.query('post', '/game_toggle_in_to_recallable', course)
    .subscribe(
      () => {
        this.courseRecallable.push(course);
        this.courseWait.map( c => {
          return c.id != course.id ? c : null
        });
      },
      error => {
        console.log(error);
        this.errorService.handler(error);
      });
  };


  toggleOutFromRecall(course){
    this.gameService.query('post', '/game_toggle_out_from_recallable', course)
    .subscribe(
      () => {
        this.courseWait.push(course);
        this.courseRecallable.map( c => {
          return c.id != course.id ? c : null
        });
      },
      error => {
        console.log(error);
        this.errorService.handler(error);
      });
  };


  recallable(){
    this.gameService.query('get', '/game_course_recallable')
    .subscribe( response => {
      this.courseRecallable = response;
      console.log(this.courseRecallable);
    }, error => {
      console.log(error);
      this.errorService.handler(error);
    });
  };

  ngOnInit() {
    this.gameService.query('get', '/course_wait_recall')
    .subscribe( response => {
      this.courseWait = response;
      console.log(this.courseWait);
      this.recallable();
    }, error => {
      console.log(error);
      this.errorService.handler(error);
    });
  };

}
