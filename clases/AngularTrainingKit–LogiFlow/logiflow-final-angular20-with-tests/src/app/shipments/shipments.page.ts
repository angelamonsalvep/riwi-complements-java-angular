import { Component } from '@angular/core';
import { ShipmentsService } from './shipments.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-shipments-page',
  template: '<p>Shipments Page</p>'
})
export class ShipmentsPage {
  shipments$: Observable<any[]>;

  constructor(service: ShipmentsService) {
    this.shipments$ = service.getShipments();
  }
}
