# Clase 6 – Pruebas Unitarias en Angular 20 (ACTUALIZADA)  
## LogiFlow · Angular 20+  
### Testing moderno, sin APIs deprecadas y con enfoque standalone

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: pruebas unitarias modernas, criterio profesional y Angular 20 puro

---

## 🎯 Propósito real de esta clase

Esta es la **clase final del kit LogiFlow** y está **100 % alineada con Angular 20**.

Aquí no solo aprendemos a escribir tests, sino a:
- Leer warnings del framework
- Entender cambios de API
- Adaptar el código al Angular moderno
- Evitar deuda técnica desde el inicio

---

## 🧠 Cambio importante en Angular 20 (contexto)

En Angular 20:

- El enfoque es **standalone-first**
- Se eliminan gradualmente los `NgModule`
- Muchas APIs basadas en módulos están **deprecated**
- El testing sigue el mismo camino

👉 Por eso **NO usamos `HttpClientTestingModule`**.

---

## 1️⃣ Qué es una prueba unitaria (recordatorio)

Una **prueba unitaria** es:

> Un código automático  
> que valida el comportamiento  
> de una unidad aislada

En Angular:
- Service
- Component
- Función

---

## 2️⃣ Herramientas de testing en Angular 20 (actualizadas)

### 🧪 Jasmine

- Define expectativas (`expect`)
- Agrupa pruebas (`describe`, `it`)
- No sabe nada de Angular

---

### 🏃 Karma

- Ejecuta los tests
- Muestra resultados
- No decide si algo está bien o mal

---

### 🧰 TestBed

- Crea un entorno Angular de pruebas
- Inyecta dependencias
- Respeta el enfoque standalone

---

## 3️⃣ HTTP Testing en Angular 20 (FORMA CORRECTA)

### ❌ Forma antigua (deprecated)

```ts
imports: [HttpClientTestingModule]
```

Esto genera warnings en Angular 20.

---

### ✅ Forma moderna (Angular 20)

```ts
import { provideHttpClientTesting } from '@angular/common/http/testing';

TestBed.configureTestingModule({
  providers: [provideHttpClientTesting()]
});
```

👉 Esta es la API **oficial y futura**.

---

## 4️⃣ Qué hace `provideHttpClientTesting()`

Este provider:

- Reemplaza `HttpClient`
- Evita llamadas HTTP reales
- Permite usar `HttpTestingController`
- Funciona sin módulos

---

## 5️⃣ Test de Service (Angular 20 puro)

### Código completo

```ts
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
```

---

## 6️⃣ Explicación paso a paso del test

- `provideHttpClientTesting()`
  - Inyecta un HttpClient falso
- `HttpTestingController`
  - Intercepta requests
- `expectOne`
  - Verifica URL
- `flush`
  - Simula respuesta del backend

👉 Probamos **contrato**, no backend.

---

## 7️⃣ Test de componente standalone

### Código completo

```ts
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
```

---

## 8️⃣ Por qué importar el componente

- Es standalone
- No hay NgModule
- El componente se prueba como se usa en la app

---

## 9️⃣ Probar asincronía con Observables

```ts
it('should emit data', (done) => {
  service.getShipments().subscribe(data => {
    expect(data).toBeDefined();
    done();
  });
});
```

- `done()` controla el fin del test
- Evita falsos positivos

---

## 🔟 Qué NO probar (Angular moderno)

❌ No pruebes:
- Angular internamente
- CSS
- Librerías externas
- Detalles irrelevantes

---

## 1️⃣1️⃣ Buenas prácticas finales

- Tests pequeños
- Sin dependencias reales
- Un comportamiento por test
- Nombres claros
- Sin APIs deprecated

---

## 1️⃣2️⃣ Definition of Done – Clase 6

- Tests en verde
- Sin warnings
- APIs modernas
- Código future-proof
- Confianza para refactorizar

---

## 🏁 Cierre del Kit LogiFlow

Con esta clase:

- El proyecto queda **100 % Angular 20**
- El testing es moderno
- No hay deuda técnica
- El coder entiende **por qué** testea

👉 **Aquí se cierra el kit LogiFlow.**
