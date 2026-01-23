import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDemoComponent } from './signal-demo';

describe('SignalDemo', () => {
  let component: SignalDemoComponent;
  let fixture: ComponentFixture<SignalDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
