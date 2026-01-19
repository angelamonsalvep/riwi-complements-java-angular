# Clase 4 – Vista de Listado (Shipments)  
## LogiFlow · Angular 20+  
### Versión ULTRA DETALLADA (Templates, conceptos y modelo mental)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Objetivo pedagógico: entender *qué escribe el coder*, *qué interpreta Angular* y *por qué existe cada línea*.

---

## 🎯 Qué hace diferente esta clase

Esta clase **no asume conocimiento implícito**.

Aquí se explica:
- Qué es cada archivo
- Qué es cada componente
- Qué significa cada cosa que aparece en un template
- Qué hace Angular internamente cuando renderiza la vista

Si esta clase se entiende,  
👉 **Angular deja de sentirse “mágico”**.

---

## 🧠 Punto de partida (estado del proyecto)

Al iniciar esta clase ya existe:

- Layout persistente (Clase 2)
- Routing funcionando (Clase 3)
- URL `/shipments` activa

Lo que NO existe todavía:
- Contenido real
- Componentes de dominio
- Datos visibles

---

## 1️⃣ Qué es una Vista de Listado (concepto base)

Una **vista de listado** es una vista que:

- Representa **muchas entidades**
- Muestra información resumida
- Permite elegir una entidad para continuar el flujo

En LogiFlow:
- Entidad: Shipment
- Vista: Shipments List

Angular **no sabe** qué es un shipment.  
Eso es **responsabilidad del desarrollador**.

---

## 2️⃣ Arquitectura por dominio (por qué aquí es crítica)

Estructura usada:

```
src/app/shipments
├── shipments.page.ts
├── shipments-list.component.ts
├── shipment-card.component.ts
├── shipments.mock.ts
```

### Por qué no usamos `pages/`

Porque:
- El dominio *Shipments* es una unidad completa
- Página, lista y tarjeta pertenecen al mismo contexto
- Angular no impone carpetas, el producto sí

---

## 3️⃣ ShipmentsPage: la Page explicada al 100 %

### Qué es técnicamente

- Un **Standalone Component**
- Cargado directamente por el Router
- Punto de entrada del dominio

---

### Código completo

```ts
import { Component } from '@angular/core';
import { ShipmentsListComponent } from './shipments-list.component';
import { SHIPMENTS_MOCK } from './shipments.mock';

@Component({
  selector: 'app-shipments-page',
  standalone: true,
  imports: [ShipmentsListComponent],
  template: `
    <h2>Shipments</h2>

    <app-shipments-list
      [shipments]="shipments">
    </app-shipments-list>
  `
})
export class ShipmentsPage {
  shipments = SHIPMENTS_MOCK;
}
```

---

### Explicación del decorator `@Component`

| Propiedad | Qué significa |
|--------|----------------|
| `selector` | Nombre del elemento HTML del componente |
| `standalone` | No depende de NgModule |
| `imports` | Componentes que este template puede usar |
| `template` | HTML del componente |

---

### Explicación del template (línea por línea)

```html
<h2>Shipments</h2>
```
- HTML estándar
- Angular no hace nada especial aquí

---

```html
<app-shipments-list
  [shipments]="shipments">
</app-shipments-list>
```

#### Qué significa esto en Angular

- `<app-shipments-list>`  
  👉 Es un **componente Angular**, no HTML nativo

- `[shipments]="shipments"`  
  👉 **Property Binding**
  👉 Se pasa un valor desde la clase al componente hijo

Angular conecta:
```
ShipmentsPage.shipments
↓
ShipmentsListComponent.shipments
```

---

## 4️⃣ Mock Data: explicado a nivel profesional

### Archivo: `shipments.mock.ts`

```ts
export const SHIPMENTS_MOCK = [
  {
    id: 'SHP-001',
    origin: 'Bogotá',
    destination: 'Medellín',
    status: 'In Transit'
  }
];
```

### Qué representa

- Simula respuesta de backend
- Define estructura de datos
- Permite avanzar sin depender de APIs

👉 **Esto es un contrato**, no un parche.

---

## 5️⃣ ShipmentsListComponent: entender la iteración

### Código

```ts
import { Component, Input } from '@angular/core';
import { ShipmentCardComponent } from './shipment-card.component';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [ShipmentCardComponent],
  template: `
    @for (shipment of shipments; track shipment.id) {
      <app-shipment-card
        [shipment]="shipment" />
    }
  `
})
export class ShipmentsListComponent {
  @Input() shipments: any[] = [];
}
```

---

### ¿Qué es `@Input()`?

- Permite que un componente **reciba datos**
- El componente **no controla el valor**
- Lo recibe desde su padre

---

### Explicación del template `@for`

```html
@for (shipment of shipments; track shipment.id) {
```

Angular interpreta esto como:

- Itera sobre `shipments`
- Crea una instancia por cada elemento
- Usa `shipment.id` como identificador

👉 Es equivalente moderno a `*ngFor`.

---

```html
<app-shipment-card [shipment]="shipment" />
```

- Se crea un componente por cada item
- Se pasa **una sola entidad**
- No se pasa la lista completa

---

## 6️⃣ ShipmentCardComponent: entender el binding

### Código

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shipment-card',
  standalone: true,
  template: `
    <div class="card">
      <strong>{{ shipment.id }}</strong>
      <div>
        {{ shipment.origin }} → {{ shipment.destination }}
      </div>
      <span>Status: {{ shipment.status }}</span>
    </div>
  `
})
export class ShipmentCardComponent {
  @Input() shipment!: any;
}
```

---

### ¿Qué es `{{ }}`?

- **Interpolación**
- Angular evalúa la expresión
- Inserta el valor en el DOM

Ejemplo:
```
{{ shipment.id }}
→ "SHP-001"
```

---

### Flujo completo de datos (modelo mental)

```
ShipmentsPage (mock)
  ↓
ShipmentsListComponent (itera)
  ↓
ShipmentCardComponent (representa)
```

Cada nivel **tiene menos contexto** y **más enfoque visual**.

---

## 7️⃣ Qué hace Angular internamente (simplificado)

Cuando navegas a `/shipments`:

1. El Router carga `ShipmentsPage`
2. Angular evalúa el template
3. Crea `ShipmentsListComponent`
4. Itera con `@for`
5. Crea múltiples `ShipmentCardComponent`
6. Renderiza el DOM final

---

## 8️⃣ Errores comunes que esta clase evita

❌ Componente gigante  
❌ Lógica en templates  
❌ Mezclar dominio con layout  
❌ `ngFor` sin track  
❌ Mock sin sentido  

---

## 9️⃣ Definition of Done – Clase 4

- Vista `/shipments` renderiza correctamente
- Cada componente tiene una sola responsabilidad
- Uso correcto de bindings (`[]`, `{{}}`)
- Uso de `@for`
- Código explicable sin leerlo

---

## 🔟 Resultado final

Al finalizar esta clase:

- Angular deja de sentirse abstracto
- El coder entiende qué pasa en el template
- El dominio Shipments está bien construido
- El proyecto está listo para el detalle

👉 **Aquí se consolida el frontend profesional.**
