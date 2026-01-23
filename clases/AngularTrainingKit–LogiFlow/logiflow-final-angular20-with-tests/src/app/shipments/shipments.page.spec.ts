import { TestBed } from '@angular/core/testing';
import { ShipmentsPage } from './shipments.page';
import { ShipmentsService } from './shipments.service';
import { of } from 'rxjs';

describe('ShipmentsPage (Angular 20)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShipmentsPage],
      providers: [
        {
          provide: ShipmentsService,
          useValue: {
            getShipments: () => of([{ id: 'SHP-001' }])
          }
        }
      ]
    });
  });

  it('should create the page', () => {
    const fixture = TestBed.createComponent(ShipmentsPage);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
