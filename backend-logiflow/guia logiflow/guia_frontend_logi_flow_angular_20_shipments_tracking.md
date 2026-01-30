# 🧭 Guía Paso a Paso – Frontend LogiFlow con Angular 20

> **Objetivo de esta guía**  
Esta guía está pensada para que *cualquier developer del equipo* (junior, trainee o semi) pueda **entender el porqué y el cómo** del frontend de LogiFlow, no solo copiar código.

Aquí no solo verás *qué hacer*, sino **por qué se hace así**, cómo se conecta con el backend y cómo encaja dentro de una **arquitectura limpia y escalable**.

Esta guía explica **cómo construir el frontend en Angular 20** para consumir los microservicios **Shipment** y **Tracking**, incluyendo **SSE (Server-Sent Events)** y visualización preparada para mapa.

---

## 1️⃣ Arquitectura Frontend

### 🎯 Propósito del Frontend

El frontend **NO contiene lógica de negocio**. Su responsabilidad es:

- Capturar acciones del usuario
- Mostrar información del backend
- Mantener sincronización en tiempo real (tracking)

Toda regla de negocio vive en el backend (Shipment y Tracking Service).

---

### 🧱 Capas del Frontend

Aunque Angular no obliga, **imitamos Clean Architecture**:

```text
UI (Componentes)
│
├── Servicios (HTTP / SSE)
│
├── Modelos (DTOs / Interfaces)
│
└── Configuración (rutas, environment)
```

👉 Esto hace que el frontend sea:
- Testeable
- Fácil de mantener
- Independiente del backend concreto

---

### 🔗 Relación con el Backend

| Frontend Angular | Backend |
|------------------|---------|
| Crear shipment | Shipment Service |
| Listar shipments | Shipment Service |
| Cambiar estado | Shipment Service |
| Registrar eventos | Tracking Service |
| Consultar historial | Tracking Service |
| Streaming en tiempo real | Tracking Service (SSE) |

El frontend **nunca accede directamente a la base de datos**.


### Responsabilidades del Frontend

- Crear envíos (Shipments)
- Listar envíos
- Consultar estado actual
- Visualizar historial de tracking
- Escuchar eventos en tiempo real (SSE)

### Relación con Backend

| Frontend | Backend |
|--------|--------|
| Angular 20 | Shipment Service |
| Angular 20 | Tracking Service |
| SSE | `/tracking/stream/{shipmentId}` |

---

## 2️⃣ Crear el proyecto Angular 20

### 📌 ¿Por qué Angular 20?

Usamos Angular 20 porque:
- Standalone Components (menos boilerplate)
- Mejor rendimiento
- Mejor integración con RxJS
- Ideal para arquitecturas reactivas (como WebFlux + SSE)

---

### 🔧 Requisitos

- Node.js **20+**
- npm **10+**
- Navegador moderno (Chrome / Edge)

Verifica:
```bash
node -v
npm -v
```

---

### 🚀 Creación del proyecto

```bash
npm install -g @angular/cli
ng new logiflow-frontend --standalone --routing --style=scss
cd logiflow-frontend
ng version
```

Selecciona:
- Standalone Components ✅
- Routing ✅
- SCSS (mejor escalabilidad de estilos)

👉 **¿Por qué standalone?**

Evita módulos gigantes (`AppModule`) y hace el proyecto:
- Más simple
- Más fácil de escalar
- Más cercano a micro-frontends


> Requisitos:
- Node 20+
- npm 10+

```bash
npm install -g @angular/cli
ng new logiflow-frontend --standalone --routing --style=scss
cd logiflow-frontend
ng version
```

Selecciona:
- Standalone components ✅
- Routing ✅

---

## 3️⃣ Estructura recomendada

```text
src/app/
├── core/                 # Código transversal
│   ├── models/           # Interfaces (Shipment, TrackingEvent)
│   ├── services/         # Comunicación con backend
│   └── config/           # URLs, constantes
│
├── features/             # Casos de uso del negocio
│   ├── shipments/        # Crear / listar shipments
│   └── tracking/         # Visualizar tracking
│
├── shared/               # Componentes reutilizables
│   ├── components/
│   └── pipes/
│
└── app.routes.ts         # Rutas principales
```

### 🧠 Regla de oro

- **core**: no depende de nadie
- **features**: depende de core
- **shared**: reusable, sin lógica de negocio

Esto evita dependencias circulares.


```text
src/app/
├── core/
│   ├── models/
│   ├── services/
│   └── config/
├── features/
│   ├── shipments/
│   └── tracking/
├── shared/
│   ├── components/
│   └── pipes/
└── app.routes.ts
```

---

## 4️⃣ Modelos de Dominio (Frontend)

### Shipment
```ts
export interface Shipment {
  id: string;
  originCity: string;
  originAddress: string;
  destinationCity: string;
  destinationAddress: string;
  status: 'IN_TRANSIT' | 'DELIVERED' | 'INCIDENT';
}
```

### TrackingEvent
```ts
export interface TrackingEvent {
  shipmentId: string;
  latitude: number;
  longitude: number;
  description: string;
  timestamp: string;
}
```

---

## 5️⃣ Servicios HTTP

### 📌 ¿Por qué usar servicios?

Nunca llamamos `HttpClient` directamente desde un componente.

Ventajas:
- Separación de responsabilidades
- Testeo sencillo
- Cambio de backend sin tocar la UI

---

### 🚚 ShipmentService

```bash
ng generate service core/services/shipment
```

```ts
@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private baseUrl = 'http://localhost:8080/api/shipments';

  constructor(private http: HttpClient) {}

  create(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }

  list() {
    return this.http.get<Shipment[]>(this.baseUrl);
  }
}
```

👉 **Nota importante**: el frontend NO genera reglas de negocio. Solo envía datos.


### ShipmentService
```bash
ng generate service core/services/shipment
```

```ts
@Injectable({ providedIn: 'root' })
export class ShipmentService {
  private baseUrl = 'http://localhost:8080/api/shipments';

  constructor(private http: HttpClient) {}

  create(payload: any) {
    return this.http.post(this.baseUrl, payload);
  }

  list() {
    return this.http.get<Shipment[]>(this.baseUrl);
  }
}
```

---

### TrackingService (SSE incluido)

Aquí está la parte más importante del frontend.

👉 **SSE = Server-Sent Events**
- Conexión persistente
- El backend empuja eventos
- Ideal para tracking en tiempo real

```bash
ng generate service core/services/tracking
```

```ts
@Injectable({ providedIn: 'root' })
export class TrackingService {
  private baseUrl = 'http://localhost:8081/tracking';

  history(shipmentId: string) {
    return this.http.get<TrackingEvent[]>(`${this.baseUrl}/shipments/${shipmentId}/history`);
  }

  current(shipmentId: string) {
    return this.http.get<TrackingEvent>(`${this.baseUrl}/shipments/${shipmentId}/current`);
  }

  stream(shipmentId: string): Observable<TrackingEvent> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${this.baseUrl}/stream/${shipmentId}`);

      eventSource.onmessage = event => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = error => {
        observer.error(error);
        eventSource.close();
      };

      return () => eventSource.close();
    });
  }
}
```

⚠️ **Importante**: siempre cerrar el `EventSource` para evitar fugas de memoria.

```bash
ng generate service core/services/tracking
```

```ts
@Injectable({ providedIn: 'root' })
export class TrackingService {
  private baseUrl = 'http://localhost:8081/tracking';

  history(shipmentId: string) {
    return this.http.get<TrackingEvent[]>(`${this.baseUrl}/shipments/${shipmentId}/history`);
  }

  current(shipmentId: string) {
    return this.http.get<TrackingEvent>(`${this.baseUrl}/shipments/${shipmentId}/current`);
  }

  stream(shipmentId: string): Observable<TrackingEvent> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${this.baseUrl}/stream/${shipmentId}`);
      eventSource.onmessage = event => observer.next(JSON.parse(event.data));
      eventSource.onerror = error => observer.error(error);
      return () => eventSource.close();
    });
  }
}
```

---

## 6️⃣ Feature: Shipments

```bash
ng generate component features/shipments/shipment-list --standalone
ng generate component features/shipments/shipment-create --standalone
```

### Listar envíos
```ts
this.shipmentService.list().subscribe(data => this.shipments = data);
```

---

## 7️⃣ Feature: Tracking

```bash
ng generate component features/tracking/tracking-view --standalone
```

```ts
this.trackingService.stream(this.shipmentId)
  .subscribe(event => this.events.push(event));
```

Este componente será el que:
- Escuche eventos SSE
- Actualice mapa
- Muestre estado en tiempo real

---

## 8️⃣ Preparar integración con mapa

Recomendado:
- Leaflet

```bash
npm install leaflet
```

```ts
L.marker([event.latitude, event.longitude]).addTo(map);
```

---

## 9️⃣ Rutas

```ts
export const routes: Routes = [
  { path: '', redirectTo: 'shipments', pathMatch: 'full' },
  { path: 'shipments', loadComponent: () => import('./features/shipments/shipment-list.component') },
  { path: 'tracking/:id', loadComponent: () => import('./features/tracking/tracking-view.component') }
];
```

---

## 🔟 Flujo completo

1. Usuario crea Shipment
2. Backend devuelve ID
3. Front navega a tracking
4. SSE transmite eventos
5. Mapa se actualiza en tiempo real

---

## ✅ Resultado Final

✔ Angular 20 moderno
✔ Standalone Components
✔ SSE en tiempo real
✔ Listo para mapas
✔ 100% alineado con Clean Architecture

---

## 🚀 Siguientes pasos

- Animación del recorrido
- WebSockets opcionales
- Autenticación
- Dashboard en tiempo real

---

📌 **Esta guía está diseñada para integrarse perfectamente con los microservicios que ya construiste con Scaffold Clean Architecture.**

