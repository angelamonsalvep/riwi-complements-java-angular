# 🅰️ Angular Moderno – Decoradores esenciales (`@`)
## De JavaScript puro a Angular con TypeScript y Componentes

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Entender qué son los decoradores y por qué Angular los necesita
- Comparar JavaScript puro vs Angular
- Crear componentes usando `@Component`
- Comunicar componentes con `@Input()` y `@Output()`
- Acceder al DOM de forma segura con `@ViewChild` y `Renderer2`
- Entender el ciclo de vida de un componente
- Aplicar TypeScript desde conocimientos previos de JavaScript

---

## 🧠 1. De JavaScript puro a Angular

Antes de Angular, la manipulación del DOM y los eventos se hacía manualmente.

### 🔴 JavaScript puro

```js
const button = document.querySelector('button');

button.addEventListener('click', () => {
  alert('Hola');
});
```

Problemas comunes en aplicaciones grandes:
- Código difícil de mantener
- Mucha manipulación directa del DOM
- Poco escalable

---

### 🟢 Angular

```html
<button (click)="sayHello()">Click</button>
```

```ts
sayHello() {
  alert('Hola');
}
```

Angular separa:
- Vista (HTML)
- Lógica (TypeScript)

Angular no reemplaza JavaScript, lo organiza.

---

## 🧠 2. ¿Qué es un decorador?

Un decorador es una función especial que agrega **metadata** a una clase, propiedad o método.

Angular usa esta metadata para saber:
- Qué es un componente
- Qué es un input
- Qué es un servicio
- Cómo deben conectarse las partes de la aplicación

Todos los decoradores comienzan con `@`.

---

## 🧩 3. Decoradores principales en Angular

| Decorador | Uso |
|---------|-----|
| `@Component` | Crear componentes |
| `@Input()` | Recibir datos |
| `@Output()` | Emitir eventos |
| `@ViewChild()` | Acceder al DOM |
| `@Injectable()` | Crear servicios |

---

## 🧱 4. `@Component` – El corazón de Angular

Un componente define:
- Un selector (etiqueta HTML personalizada)
- Un template
- Una clase con lógica

### Ejemplo

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ title }}</h3>
    </div>
  `
})
export class CardComponent {
  title: string = 'Envío #123';
}
```

Uso:

```html
<app-card></app-card>
```

---

## 📥 5. `@Input()` – Comunicación de padre a hijo

Permite enviar datos desde un componente padre a un componente hijo.

### Componente hijo

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: `<p>Hola {{ name }}</p>`
})
export class GreetingComponent {
  @Input() name!: string;
}
```

### Componente padre

```html
<app-greeting [name]="'Angela'"></app-greeting>
```

---

## 📤 6. `@Output()` – Comunicación de hijo a padre

Permite que un componente hijo emita eventos al padre.

### Componente hijo

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button (click)="handleClick()">Click</button>`
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
```

### Componente padre

```html
<app-button (clicked)="onClick()"></app-button>
```

```ts
onClick() {
  console.log('Botón presionado');
}
```

---

## 👀 7. `@ViewChild()` – Acceder al DOM

Permite acceder a un elemento del template después de que la vista se renderiza.

### Template

```html
<input #myInput />
```

### Componente

```ts
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-focus',
  template: `<input #myInput />`
})
export class FocusComponent implements AfterViewInit {
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
}
```

---

## 🛡️ 8. `Renderer2` – Manipular el DOM de forma segura

No se recomienda modificar el DOM directamente.

### ❌ No recomendado
```ts
this.input.nativeElement.style.background = 'red';
```

### ✅ Recomendado
```ts
constructor(private renderer: Renderer2) {}

changeColor() {
  this.renderer.setStyle(
    this.input.nativeElement,
    'background',
    'lightblue'
  );
}
```

---

## 🔁 9. Ciclo de vida del componente

Angular ejecuta métodos en diferentes momentos.

```ts
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-example',
  template: `<p>Ejemplo</p>`
})
export class ExampleComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    console.log('Componente inicializado');
  }

  ngAfterViewInit() {
    console.log('Vista lista');
  }
}
```

---

## 🧪 10. TypeScript aplicado (desde JavaScript)

```ts
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: 'Angela'
};
```

Ventajas:
- Menos errores
- Código tipado
- Mejor autocompletado

---

## 🧪 11. Ejercicio práctico

Crear `UserProfileComponent` que:

- Reciba un nombre con `@Input`
- Emita un evento con `@Output`
- Enfoque un input con `@ViewChild`
- Cambie estilos usando `Renderer2`

Bonus: usar `@if` para mostrar el nombre solo si existe.

---

## 🧠 12. Cierre conceptual

Angular no reemplaza JavaScript.
Angular estructura JavaScript para aplicaciones grandes.

Decoradores = reglas claras
Componentes = bloques reutilizables
TypeScript = seguridad y orden

