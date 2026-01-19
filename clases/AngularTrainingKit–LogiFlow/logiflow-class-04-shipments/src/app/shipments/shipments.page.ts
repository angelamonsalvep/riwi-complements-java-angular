import { Component } from '@angular/core';
import { ShipmentsListComponent } from './shipments-list.component';
import { SHIPMENTS_MOCK } from './shipments.mock';

@Component({
  standalone: true,
  imports: [ShipmentsListComponent],
  template: `
    <h2>Shipments</h2>
    <app-shipments-list [shipments]="shipments"></app-shipments-list>
  `
})
export class ShipmentsPage {
  shipments = SHIPMENTS_MOCK;
}
