import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsList } from './shipments-list';

describe('ShipmentsList', () => {
  let component: ShipmentsList;
  let fixture: ComponentFixture<ShipmentsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
