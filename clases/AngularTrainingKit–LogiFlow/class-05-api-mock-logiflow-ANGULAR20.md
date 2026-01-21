# Clase 5 – Consumo de API (Mockeada) y Flujo Listado → Detalle  
## LogiFlow · Angular 20+  
### Arquitectura, asincronía y frontend profesional (VERSIÓN ULTRA EXPLICADA)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: Servicios, asincronía, Observables y navegación real

---

## 🎯 Objetivo real de la Clase 5

Esta clase marca el punto donde el frontend **empieza a comportarse como una aplicación real**.

Al finalizar esta clase, el coder será capaz de:

- Entender **qué es una API desde el punto de vista del frontend**
- Comprender **por qué la asincronía es obligatoria**
- Usar **Services** como capa de acceso a datos
- Trabajar correctamente con **Observables**
- Usar el **async pipe** sin fugas de memoria
- Implementar el flujo real **listado → detalle**
- Mantener una **arquitectura limpia y escalable**

---

## 🧠 Contexto: por qué esta clase es necesaria

En la Clase 4 los datos se cargaban así:

```ts
shipments = SHIPMENTS_MOCK;
```

Esto fue intencional, pero tiene limitaciones:

- ❌ No hay asincronía
- ❌ No hay simulación de red
- ❌ No hay separación UI / datos
- ❌ No prepara para APIs reales

👉 En esta clase **corregimos esto de forma profesional**.

---

## 1️⃣ ¿Qué es una API para el frontend?

Para el frontend, una API es:

> Un **origen de datos externo**  
> que responde **en el tiempo**, no inmediatamente.

Características:
- Puede tardar
- Puede fallar
- No depende del frontend

👉 Por eso el frontend **no puede asumir datos inmediatos**.

---

## 2️⃣ Qué es asincronía (bien definido)

Asincronía significa:

> “Solicito datos ahora,  
> los recibo después.”

Mientras tanto:
- La UI sigue viva
- El usuario puede interactuar
- Angular sigue funcionando

👉 Sin asincronía, no hay SPA real.

---

## 3️⃣ Por qué Angular usa Observables

Angular usa **Observables** porque:

- Representan flujos de datos
- Permiten cancelar operaciones
- Manejan múltiples emisiones
- Se integran con todo el framework

👉 El frontend moderno es **reactivo**.

---

## 4️⃣ Qué es un Service en Angular

Un **Service** es una clase que:

- Maneja datos
- Encapsula lógica
- No renderiza UI
- Se reutiliza en múltiples vistas

Regla de oro:

> **Los componentes muestran datos.  
> Los servicios los obtienen.**

---

## 5️⃣ Arquitectura del dominio Shipments (Clase 5)

```
src/app/shipments
├── shipments.page.ts
├── shipment-detail.page.ts
├── shipments-list.component.ts
├── shipment-card.component.ts
├── shipments.service.ts
├── shipments.mock.ts
```

👉 El dominio crece sin romper lo anterior.

---

## 6️⃣ Mockeando una API de forma profesional

### shipments.mock.ts

```ts
export const SHIPMENTS_MOCK = [
  {
    id: 'SHP-001',
    origin: 'Bogotá',
    destination: 'Medellín',
    status: 'In Transit'
  },
  {
    id: 'SHP-002',
    origin: 'Cali',
    destination: 'Barranquilla',
    status: 'Delivered'
  }
];
```

👉 Este archivo **simula la base de datos** del backend.

---

## 7️⃣ ShipmentsService explicado en detalle

```ts
@Injectable({ providedIn: 'root' })
export class ShipmentsService {
```

- `@Injectable` → clase inyectable
- `providedIn: 'root'` → singleton global

---

### Obtener listado (API simulada)

```ts
getShipments(): Observable<any[]> {
  return of(SHIPMENTS_MOCK).pipe(
    delay(800)
  );
}
```

Conceptos:
- `Observable<any[]>` → datos que llegan en el tiempo
- `of()` → convierte datos síncronos en flujo
- `delay()` → simula latencia real

---

### Obtener detalle

```ts
getShipmentById(id: string): Observable<any | undefined> {
  const shipment = SHIPMENTS_MOCK.find(s => s.id === id);
  return of(shipment).pipe(delay(500));
}
```

👉 El frontend **no asume que el dato existe**.

---

## 8️⃣ Refactor de ShipmentsPage (consumo real de API)

```ts
shipments$!: Observable<any[]>;

ngOnInit() {
  this.shipments$ = this.shipmentsService.getShipments();
}
```

- `$` indica flujo
- No hay datos inmediatos

---

### Template con async pipe

```html
@if (shipments$ | async; as shipments) {
  <app-shipments-list [shipments]="shipments" />
} @else {
  <p>Loading shipments...</p>
}
```

#### Qué hace `async`

- Se suscribe
- Espera el valor
- Actualiza la vista
- Se desuscribe automáticamente

👉 Evita memory leaks.

---

## 9️⃣ Flujo listado → detalle (conceptual)

Desde el producto:
1. Usuario ve lista
2. Hace click
3. Navega
4. Ve detalle

Desde Angular:
- URL cambia
- Router lee params
- Service obtiene datos
- Vista se actualiza

👉 **La URL es el estado.**

---

## 🔟 ActivatedRoute explicado

```ts
this.route.paramMap
```

- Es un Observable
- Emite cuando cambia la URL
- Contiene parámetros dinámicos

Ejemplo:
```
/shipments/SHP-001
```

Emite:
```
{ id: 'SHP-001' }
```

---

## 1️⃣1️⃣ switchMap explicado

```ts
switchMap(params =>
  this.shipmentsService.getShipmentById(
    params.get('id')!
  )
)
```

`switchMap`:
- Cancela flujos anteriores
- Evita condiciones de carrera
- Mantiene el flujo limpio

---

## 1️⃣2️⃣ Definition of Done – Clase 5

- Datos vienen de Services
- Uso correcto de Observables
- Uso de async pipe
- Mock simula API real
- Flujo listado → detalle funcional
- Arquitectura intacta

---

## 🚀 Resultado final

Al finalizar esta clase:

- El frontend es asíncrono
- El mock actúa como API
- El flujo del producto es real
- El coder piensa como frontend profesional

👉 **Aquí el proyecto LogiFlow cruza a nivel profesional.**
