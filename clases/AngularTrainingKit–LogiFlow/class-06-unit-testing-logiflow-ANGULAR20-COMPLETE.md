# Clase 6 – Pruebas Unitarias en Angular 20  
## LogiFlow · Angular 20+  
### Testing profesional explicado paso a paso (CLASE FINAL – VERSIÓN COMPLETA)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: comprender testing, crear criterio técnico y cerrar el frontend con calidad de industria

---

## 🎯 Objetivo REAL de la clase

Esta es la **clase final del entrenamiento LogiFlow**.

Aquí el objetivo **no es aprender sintaxis**, sino:

- Entender **por qué existen las pruebas**
- Saber **qué probar y qué no**
- Comprender **cada herramienta de testing**
- Aprender **cómo pensar un caso de prueba**
- Escribir tests alineados con **Angular 20 moderno**
- Cerrar el frontend con **confianza y estabilidad**

Un frontend **no está terminado** si no puede cambiar sin miedo.

---

## 🧠 El problema real que resuelven las pruebas

Escenario común en proyectos reales:

- El frontend funciona hoy
- Mañana hay un cambio
- Nadie sabe qué se puede romper
- Nadie se atreve a tocar el código

👉 Eso no es un problema de Angular  
👉 Es un problema de **confianza**

Las pruebas unitarias existen para **proteger el futuro del código**.

---

## 1️⃣ ¿Qué es una prueba unitaria? (definición profunda)

Una **prueba unitaria** es:

> Un programa pequeño  
> que valida automáticamente  
> el comportamiento de una **unidad aislada**  
> sin depender del mundo exterior

### Palabras clave
- **Automática** → no depende de personas
- **Unidad** → pieza pequeña
- **Comportamiento** → qué hace, no cómo lo hace
- **Aislada** → sin backend, sin UI real

---

## 2️⃣ ¿Qué es una “unidad” en Angular?

En Angular, normalmente una unidad es:

- Un **Service**
- Un **Component**
- Una **función pura**

NO es:
- La app completa
- El backend
- El navegador

👉 Angular se prueba **por piezas**, no como un todo.

---

## 3️⃣ Tipos de pruebas (ubicación mental)

| Tipo | Qué validan |
|---|---|
| Unitarias | Lógica aislada |
| Integración | Varias piezas juntas |
| E2E | Flujo completo de usuario |

👉 En LogiFlow **solo hacemos pruebas unitarias**.

---

## 4️⃣ Stack de testing en Angular 20 (explicado)

### 🧪 Jasmine – el lenguaje del testing

Jasmine define:
- `describe` → contexto
- `it` → comportamiento esperado
- `expect` → afirmación

👉 Jasmine **no conoce Angular**, solo evalúa condiciones.

---

### 🏃 Karma – el ejecutor

Karma:
- Ejecuta los tests
- Lanza el navegador
- Reporta resultados

👉 Karma **no valida lógica**, solo ejecuta.

---

### 🧰 TestBed – Angular en laboratorio

TestBed:
- Crea un Angular falso
- Inyecta dependencias
- Simula providers
- Respeta standalone components

👉 Es **Angular en modo pruebas**.

---

## 5️⃣ Cambio clave en Angular 20 (MUY IMPORTANTE)

Angular moderno es **standalone-first**.

Por eso:
- `NgModule` se evita
- APIs basadas en módulos se deprecán
- Testing sigue el mismo patrón

❌ `HttpClientTestingModule` → deprecated  
✅ `provideHttpClientTesting()` → Angular 20

---

## 6️⃣ ¿Qué hace `provideHttpClientTesting()`?

Este provider:

- Reemplaza `HttpClient`
- Evita llamadas HTTP reales
- Permite interceptar requests
- Funciona sin módulos

👉 Simula el **contrato HTTP**, no el backend.

---

## 7️⃣ Anatomía de un test (regla AAA)

Todo test profesional sigue:

1. **Arrange** → preparar escenario
2. **Act** → ejecutar acción
3. **Assert** → verificar resultado

Si no puedes ver estas 3 partes, el test está mal diseñado.

---

## 8️⃣ Métodos clave de testing (explicados)

### `describe()`
Agrupa pruebas relacionadas.

👉 Piensa: *¿qué unidad estoy probando?*

---

### `it()`
Define un comportamiento esperado.

👉 Un `it` = una expectativa clara.

---

### `beforeEach()`
Prepara el entorno antes de cada test.

👉 Garantiza aislamiento.

---

### `TestBed.configureTestingModule()`
Declara dependencias del test.

👉 Aquí vive todo lo que la unidad necesita.

---

### `TestBed.inject()`
Obtiene instancias usando DI.

👉 Nunca instancies manualmente servicios.

---

### `HttpTestingController`
Espía requests HTTP.

👉 Permite validar contrato API.

---

### `expectOne()`
Busca una request específica.

👉 Valida URL y cantidad de llamadas.

---

### `flush()`
Simula respuesta backend.

👉 Libera el Observable.

---

## 9️⃣ Test de Service con HTTP (Angular 20)

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

## 🔟 Test de componente standalone

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

## 1️⃣1️⃣ Cómo pensar un caso de prueba

Antes de escribir código, pregúntate:

1. ¿Qué unidad pruebo?
2. ¿Qué comportamiento valido?
3. ¿Qué dependencia debo mockear?
4. ¿Qué afirmo al final?

---

## 1️⃣2️⃣ Qué NO probar (criterio profesional)

❌ No pruebes:
- CSS
- Angular internamente
- Librerías externas
- Detalles irrelevantes

👉 Prueba **tus decisiones y tu lógica**.

---

## 1️⃣3️⃣ Buenas prácticas clave

- Un test = una idea
- Tests pequeños
- Nombres claros
- Sin dependencias reales
- Tests rápidos

---

## 1️⃣4️⃣ Definition of Done – Clase 6

- Services críticos testeados
- Componentes principales probados
- Sin APIs deprecated
- Tests en verde
- Código refactorizable

---

## 🏁 Cierre del Kit LogiFlow

Al finalizar esta clase:

- LogiFlow está completo
- El frontend es confiable
- El coder entiende testing profesional
- El código puede evolucionar sin miedo

👉 **Aquí se cierra el entrenamiento frontend de LogiFlow.**
