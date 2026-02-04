# 🧭 LogiFlow – Frontend Tracking con Angular 20

## 1. Objetivo de la guía

Construir el **frontend de tracking** en Angular 20 para:

- Visualizar shipments en un mapa
- Ver el historial de tracking
- Ver la posición actual
- Escuchar eventos en tiempo real vía **Server-Sent Events (SSE)**

Conectado directamente al **Tracking Service** previamente definido.

---

## 2. Stack tecnológico

- Angular **20** (standalone, signals)
- RxJS
- HttpClient
- Leaflet (mapa)
- EventSource (SSE nativo)

---

## 3. Arquitectura Frontend

```text
src/app
 ├── core/
 │   ├── services/
 │   │   ├── tracking.service.ts
 │   │   └── shipment.service.ts
 │   └── models/
 │       ├── tracking-event.model.ts
 │       └── shipment.model.ts
 ├── features/
 │   └── tracking/
 │       ├── pages/
 │       │   └── tracking-page.component.ts
 │       ├── components/
 │       │   ├── tracking-map.component.ts
 │       │   ├── tracking-timeline.component.ts
 │       │   └── tracking-status.component.ts
 │       └── tracking.routes.ts
 └── app.routes.ts
```

---

## 4. Modelos

### 4.1 TrackingEvent

```ts
export interface TrackingEvent {
  id: string;
  shipmentId: string;
  latitude: number;
  longitude: number;
  status: 'DEPARTED' | 'IN_TRANSIT' | 'ARRIVED' | 'DELAYED';
  timestamp: string;
}
```

### 4.2 Shipment

```ts
export interface Shipment {
  id: string;
  originCity: string;
  destinationCity: string;
  status: string;
}
```

---

## 5. Servicios

### 5.1 TrackingService

```ts
@Injectable({ providedIn: 'root' })
export class TrackingService {

  private baseUrl = 'http://localhost:8081/tracking';

  constructor(private http: HttpClient) {}

  history(shipmentId: string) {
    return this.http.get<TrackingEvent[]>(`${this.baseUrl}/shipments/${shipmentId}/history`);
  }

  current(shipmentId: string) {
    return this.http.get<TrackingEvent>(`${this.baseUrl}/shipments/${shipmentId}/current`);
  }

  stream(shipmentId: string): EventSource {
    return new EventSource(`${this.baseUrl}/stream/${shipmentId}`);
  }
}
```

---

## 6. Tracking Page

### 6.1 tracking-page.component.ts

Responsable de **orquestar todo**:

```ts
@Component({
  standalone: true,
  selector: 'app-tracking-page',
  template: `
    <app-tracking-status [event]="current()"></app-tracking-status>
    <app-tracking-map [events]="events()"></app-tracking-map>
    <app-tracking-timeline [events]="events()"></app-tracking-timeline>
  `
})
export class TrackingPageComponent {

  events = signal<TrackingEvent[]>([]);
  current = signal<TrackingEvent | null>(null);

  constructor(private trackingService: TrackingService) {
    const shipmentId = 'UUID_AQUI';

    this.trackingService.history(shipmentId)
      .subscribe(e => this.events.set(e));

    this.trackingService.current(shipmentId)
      .subscribe(e => this.current.set(e));

    const source = this.trackingService.stream(shipmentId);
    source.onmessage = msg => {
      const event = JSON.parse(msg.data) as TrackingEvent;
      this.events.update(list => [...list, event]);
      this.current.set(event);
    };
  }
}
```

---

## 7. Mapa (Leaflet)

### 7.1 tracking-map.component.ts

```ts
@Component({
  standalone: true,
  selector: 'app-tracking-map',
  template: `<div id="map" class="map"></div>`
})
export class TrackingMapComponent implements OnInit {

  @Input() events: TrackingEvent[] = [];

  map!: L.Map;

  ngOnInit() {
    this.map = L.map('map').setView([4.5709, -74.2973], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  ngOnChanges() {
    if (this.events.length) {
      const last = this.events[this.events.length - 1];
      L.marker([last.latitude, last.longitude]).addTo(this.map);
      this.map.setView([last.latitude, last.longitude], 8);
    }
  }
}
```

---

## 8. Timeline

### tracking-timeline.component.ts

```ts
@Component({
  standalone: true,
  selector: 'app-tracking-timeline',
  template: `
    <ul>
      <li *ngFor="let e of events">
        {{ e.status }} - {{ e.timestamp }}
      </li>
    </ul>
  `
})
export class TrackingTimelineComponent {
  @Input() events: TrackingEvent[] = [];
}
```

---

## 9. Flujo completo Frontend ↔ Backend

```text
Tracking Device → POST /tracking/events
Tracking Service → SSE
Frontend → EventSource
Mapa + Timeline se actualizan
```

---

## 10. Resultado final

✔ Visualización en tiempo real
✔ Arquitectura limpia
✔ Angular moderno (signals + standalone)
✔ Backend reactivo desacoplado

---

## 11. Siguientes pasos

- Simular eventos automáticos
- Mostrar ruta completa
- Animar el marcador
- Integrar con Shipment Service

🚀

