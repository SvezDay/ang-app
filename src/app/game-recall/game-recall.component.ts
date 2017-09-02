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
  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
      this.route.queryParams
      .subscribe(params => {
        this.gameType = params.type;
      });
  }

}
