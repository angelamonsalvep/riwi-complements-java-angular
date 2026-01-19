import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDemo } from './signal-demo';

describe('SignalDemo', () => {
  let component: SignalDemo;
  let fixture: ComponentFixture<SignalDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
