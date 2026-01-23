import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ShipmentsService } from './shipments.service';

describe('ShipmentsService (Angular 20)', () => {
  let service: ShipmentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });

    service = TestBed.inject(ShipmentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch shipments list', () => {
    const mockData = [{ id: 'SHP-001' }];

    service.getShipments().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe('SHP-001');
    });

    const req = httpMock.expectOne('http://localhost:3000/shipments');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
