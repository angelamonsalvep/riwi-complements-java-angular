import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipment-card',
  standalone: true,
  template: `
    <div class="card">
      <strong>{{ shipment.id }}</strong>
      <div>{{ shipment.origin }} → {{ shipment.destination }}</div>
      <span>Status: {{ shipment.status }}</span>
    </div>
  `
})
export class ShipmentCardComponent {
  @Input() shipment!: any;
}
