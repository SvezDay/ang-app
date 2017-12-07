import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorizeRecallComponent } from './memorize-recall.component';

describe('MemorizeRecallComponent', () => {
  let component: MemorizeRecallComponent;
  let fixture: ComponentFixture<MemorizeRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorizeRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorizeRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
