# Clase 6 – Pruebas Unitarias en Angular 20  
## LogiFlow · Angular 20+  
### Testing profesional explicado paso a paso (CLASE FINAL – EXPLICACIÓN LÍNEA POR LÍNEA)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: entender *qué hace cada línea* y *por qué existe*

---

## 🎯 Objetivo REAL de esta clase

Esta clase existe para resolver un problema muy concreto:

> “Veo tests en Angular, pero no entiendo **qué hace cada línea** ni **por qué está ahí**.”

Al finalizar esta clase, el coder será capaz de:
- Leer un test sin miedo
- Explicar cada línea en voz alta
- Escribir pruebas con criterio
- Corregir tests rotos entendiendo la causa

---

## 1️⃣ Test de Service con HTTP (Angular 20 puro)

### 📦 Código completo

```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ShipmentsService } from './shipments.service';
```

### 🔍 Explicación línea por línea

- `TestBed`  
  👉 Herramienta que crea un **Angular de laboratorio** para pruebas.

- `provideHttpClientTesting`  
  👉 Reemplaza `HttpClient` real por uno falso (no sale a internet).

- `HttpTestingController`  
  👉 Permite **inspeccionar y controlar** las requests HTTP.

- `ShipmentsService`  
  👉 La **unidad que vamos a probar**.

---

```ts
describe('ShipmentsService (Angular 20)', () => {
```

- `describe`  
  👉 Agrupa pruebas relacionadas.  
  👉 Aquí declaramos **qué archivo/unidad estamos probando**.

---

```ts
  let service: ShipmentsService;
  let httpMock: HttpTestingController;
```

- `service`  
  👉 Instancia del servicio bajo prueba.

- `httpMock`  
  👉 Espía que observará las llamadas HTTP.

---

```ts
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });
```

- `beforeEach`  
  👉 Se ejecuta **antes de cada test**, asegurando un entorno limpio.

- `configureTestingModule`  
  👉 Declara **qué dependencias necesita la unidad para vivir**.

- `providers: [provideHttpClientTesting()]`  
  👉 Inyecta un HttpClient falso para pruebas.

---

```ts
    service = TestBed.inject(ShipmentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
```

- `TestBed.inject(ShipmentsService)`  
  👉 Angular crea una instancia del servicio usando DI.

- `TestBed.inject(HttpTestingController)`  
  👉 Obtenemos el controlador para interceptar requests.

---

```ts
  it('should fetch shipments list', () => {
```

- `it`  
  👉 Define **un comportamiento esperado**.  
  👉 Se lee como una frase:  
  “debería traer la lista de envíos”.

---

```ts
    const mockData = [{ id: 'SHP-001' }];
```

- `mockData`  
  👉 Datos falsos que simulan la respuesta del backend.

---

```ts
    service.getShipments().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe('SHP-001');
    });
```

- `getShipments()`  
  👉 Ejecuta la lógica real del servicio.

- `subscribe`  
  👉 Activa el Observable (nada pasa sin suscripción).

- `expect(...)`  
  👉 Validamos que el resultado sea el esperado.

---

```ts
    const req = httpMock.expectOne('http://localhost:3000/shipments');
```

- `expectOne`  
  👉 Verifica que **exactamente una request** salga a esa URL.  
  👉 Si no sale o salen más → el test falla.

---

```ts
    expect(req.request.method).toBe('GET');
```

- Validamos el **método HTTP**, no solo la URL.

---

```ts
    req.flush(mockData);
  });
});
```

- `flush(mockData)`  
  👉 Simula la respuesta del backend.  
  👉 Libera el Observable para que el `subscribe` reciba datos.

---

## 2️⃣ Test de Componente Standalone (Angular 20)

### 📦 Código completo

```ts
import { TestBed } from '@angular/core/testing';
import { ShipmentsPage } from './shipments.page';
import { ShipmentsService } from './shipments.service';
import { of } from 'rxjs';
```

### 🔍 Explicación

- `ShipmentsPage`  
  👉 Componente standalone bajo prueba.

- `of()`  
  👉 Crea un Observable inmediato para testing.

---

```ts
describe('ShipmentsPage (Angular 20)', () => {
```

- Agrupa pruebas del componente.

---

```ts
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
```

### 🔍 Explicación línea por línea

- `imports: [ShipmentsPage]`  
  👉 Como es standalone, se importa directamente.

- `provide: ShipmentsService`  
  👉 Estamos **reemplazando el servicio real**.

- `useValue`  
  👉 Creamos un mock manual.

- `getShipments: () => of(...)`  
  👉 Simulamos el método devolviendo un Observable falso.

---

```ts
  it('should create the page', () => {
    const fixture = TestBed.createComponent(ShipmentsPage);
```

- `createComponent`  
  👉 Angular crea el componente como si fuera real.

---

```ts
    expect(fixture.componentInstance).toBeTruthy();
  });
});
```

- `componentInstance`  
  👉 Accedemos a la instancia del componente.

- `toBeTruthy()`  
  👉 Validamos que el componente existe y se creó bien.

---

## 3️⃣ Cómo pensar un test (regla mental FINAL)

Antes de escribir código, pregúntate:

1. ¿Qué unidad pruebo?
2. ¿Qué comportamiento valido?
3. ¿Qué dependencia debo mockear?
4. ¿Qué afirmación hago?

Si no puedes responder esto, **no escribas el test todavía**.

---

## 🏁 Cierre final del Kit LogiFlow

Al terminar esta clase:

- El coder entiende cada línea
- El testing deja de ser mágico
- El frontend queda protegido
- El proyecto está listo para industria

👉 **Aquí se cierra el entrenamiento frontend LogiFlow.**
