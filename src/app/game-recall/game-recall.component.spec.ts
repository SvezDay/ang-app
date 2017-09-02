import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecallComponent } from './game-recall.component';

describe('GameRecallComponent', () => {
  let component: GameRecallComponent;
  let fixture: ComponentFixture<GameRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
