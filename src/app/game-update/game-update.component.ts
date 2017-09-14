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
    private errorService: ErrorService,
    private router: Router
  ) { }


  toggleInToRecall(course){
    this.gameService.query('post', '/game_toggle_in_to_recallable', course)
    .subscribe(
      () => {
        this.courseRecallable.push(course);
        let newList = [];
        this.courseWait.map( c => {
            c.id != course.id ? newList.push(c): null
        });
        this.courseWait = newList;
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
        let newList = [];
        this.courseRecallable.map( c => {
            c.id != course.id ? newList.push(c): null
        });
        this.courseRecallable = newList;

      },
      error => {
        console.log(error);
        this.errorService.handler(error);
      });
  };


  recallable(){
    this.gameService.query('get', '/game_course_recallable')
    .subscribe( response => {
      this.courseRecallable = response.data;
      console.log('recallable')
      console.log(this.courseRecallable);
    }, error => {
      console.log(error);
      this.errorService.handler(error);
    });
  };


  detail(item){
    console.log('detail plus item:', item);
    // this.router.navigate(['/course_detail'], {queryParams:{id:item.id}});
  };


  ngOnInit() {
    this.gameService.query('get', '/course_wait_recall')
    .subscribe( response => {
      this.courseWait = response.data;
      console.log('course wait')
      console.log(this.courseWait);
      this.recallable();
    }, error => {
      console.log(error);
      this.errorService.handler(error);
    });

  };

}
