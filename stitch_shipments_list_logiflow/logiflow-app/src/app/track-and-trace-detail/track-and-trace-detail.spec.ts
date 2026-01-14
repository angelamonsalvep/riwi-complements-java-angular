import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAndTraceDetail } from './track-and-trace-detail';

describe('TrackAndTraceDetail', () => {
  let component: TrackAndTraceDetail;
  let fixture: ComponentFixture<TrackAndTraceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackAndTraceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackAndTraceDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
