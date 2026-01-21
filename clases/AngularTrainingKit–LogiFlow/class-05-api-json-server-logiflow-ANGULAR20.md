# Clase 5 – Consumo de API con json-server y Flujo Listado → Detalle  
## LogiFlow · Angular 20+  
### Arquitectura, RxJS, Observables y frontend profesional (VERSIÓN INTEGRADA)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: Consumo de API real (mockeada), asincronía, RxJS y arquitectura limpia

---

## 🎯 Objetivo real de la Clase 5

En esta clase el frontend **deja definitivamente de usar mocks internos**  
y comienza a consumir una **API HTTP real**, simulada con **json-server**.

Al finalizar esta clase, el coder será capaz de:

- Entender **qué es una API desde el frontend**
- Usar **json-server** como backend simulado
- Consumir datos reales con **HttpClient**
- Comprender **RxJS y Observables desde cero**
- Aplicar **async pipe** correctamente
- Implementar el flujo **listado → detalle** con API real
- Mantener intacta la arquitectura de LogiFlow

---

## 🧠 Contexto: de mock interno a API real

En clases anteriores:
- Los datos venían de archivos `.ts`
- Se usaba `of(mock)` para simular asincronía

Eso fue pedagógico, pero **no es el flujo real de un producto**.

👉 En esta clase:
- El mock se convierte en **API**
- Angular consume HTTP real
- El frontend queda listo para backend real

---

## 1️⃣ ¿Qué es json-server? (definición clara)

**json-server** es una herramienta que:

> Convierte un archivo JSON  
> en una **API REST completa**  
> sin escribir backend.

Desde Angular:
- json-server se comporta **igual que un backend real**

---

## 2️⃣ Preparación del proyecto para json-server

### 📁 Estructura recomendada

```
logiflow/
├── mock-api/
│   └── db.json
├── src/
└── package.json
```

- `src/` → frontend Angular
- `mock-api/` → backend simulado

---

## 3️⃣ Archivo db.json (base de datos simulada)

### Código completo

```json
{
  "shipments": [
    {
      "id": "SHP-001",
      "origin": "Bogotá",
      "destination": "Medellín",
      "status": "In Transit"
    },
    {
      "id": "SHP-002",
      "origin": "Cali",
      "destination": "Barranquilla",
      "status": "Delivered"
    }
  ]
}
```

### Explicación conceptual

- Cada propiedad raíz (`shipments`)
  → se convierte en un **endpoint**
- Este archivo **simula la base de datos del backend**

---

## 4️⃣ Levantar la API mock

### Script en package.json

```json
{
  "scripts": {
    "api": "json-server --watch mock-api/db.json --port 3000"
  }
}
```

Ejecutar:

```bash
npm run api
```

La API queda disponible en:

```
http://localhost:3000/shipments
```

---

## 5️⃣ Preparar Angular 20 para consumir HTTP

### Código completo – main.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient()
  ]
});
```

### Explicación detallada

- `provideHttpClient()`
  - Registra HttpClient en Angular 20
  - Reemplaza `HttpClientModule`
- Angular ahora puede hacer HTTP real

---

## 6️⃣ Conceptos clave: RxJS y Observables (bien definidos)

### ¿Qué es RxJS?

**RxJS** es una librería de **programación reactiva** basada en:

> Trabajar con **flujos de datos en el tiempo**

Angular usa RxJS para:
- HTTP
- Routing
- Formularios
- Signals (internamente)

---

### ¿Qué es un Observable?

Un **Observable** es:

> Un objeto que representa  
> un valor que **llega en el tiempo**

Un Observable puede:
- Emitir datos
- Emitir errores
- Completar

👉 No es el dato, es **el flujo del dato**.

---

## 7️⃣ ShipmentsService – consumo de API real

### Código completo

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipmentsService {

  private readonly API_URL = 'http://localhost:3000/shipments';

  constructor(private http: HttpClient) {}

  getShipments(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getShipmentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}
```

---

## 8️⃣ Refactor de ShipmentsPage (listado)

### Código completo

```ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipmentsService } from './shipments.service';
import { ShipmentsListComponent } from './shipments-list.component';

@Component({
  standalone: true,
  imports: [ShipmentsListComponent],
  template: `
    <h2>Shipments</h2>

    @if (shipments$ | async; as shipments) {
      <app-shipments-list [shipments]="shipments" />
    } @else {
      <p>Loading shipments...</p>
    }
  `
})
export class ShipmentsPage implements OnInit {

  shipments$!: Observable<any[]>;

  constructor(private shipmentsService: ShipmentsService) {}

  ngOnInit() {
    this.shipments$ = this.shipmentsService.getShipments();
  }
}
```

---

## 9️⃣ Routing al detalle

```ts
{
  path: 'shipments/:id',
  loadComponent: () =>
    import('./shipments/shipment-detail.page')
      .then(m => m.ShipmentDetailPage)
}
```

---

## 🔟 ShipmentDetailPage – consumo de API por ID

### Código completo

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ShipmentsService } from './shipments.service';

@Component({
  standalone: true,
  template: `
    @if (shipment$ | async; as shipment) {
      <h2>Shipment {{ shipment.id }}</h2>
      <p>{{ shipment.origin }} → {{ shipment.destination }}</p>
      <p>Status: {{ shipment.status }}</p>
    } @else {
      <p>Loading shipment...</p>
    }
  `
})
export class ShipmentDetailPage implements OnInit {

  shipment$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private shipmentsService: ShipmentsService
  ) {}

  ngOnInit() {
    this.shipment$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.shipmentsService.getShipmentById(
          params.get('id')!
        )
      )
    );
  }
}
```

---

## 1️⃣1️⃣ Definition of Done – Clase 5 (json-server)

- json-server funcionando
- API REST real
- Angular consume HTTP
- Uso correcto de RxJS
- Uso de async pipe
- Flujo listado → detalle completo
- Arquitectura intacta

---

## 🧠 Resultado final

Al finalizar esta clase:

- LogiFlow consume una API real
- El frontend es completamente asíncrono
- El mock se comporta como backend
- El proyecto está listo para producción real

👉 **Aquí el coder ya piensa como frontend profesional.**
