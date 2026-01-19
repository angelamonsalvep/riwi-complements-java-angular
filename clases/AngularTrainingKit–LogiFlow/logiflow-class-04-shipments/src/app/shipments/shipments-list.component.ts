import { Component, Input } from '@angular/core';
import { ShipmentCardComponent } from './shipment-card.component';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [ShipmentCardComponent],
  template: `
    @for (shipment of shipments; track shipment.id) {
      <app-shipment-card [shipment]="shipment" />
    }
  `
})
export class ShipmentsListComponent {
  @Input() shipments: any[] = [];
}
