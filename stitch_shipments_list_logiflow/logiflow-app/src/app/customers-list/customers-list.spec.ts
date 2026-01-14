import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersList } from './customers-list';

describe('CustomersList', () => {
  let component: CustomersList;
  let fixture: ComponentFixture<CustomersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
