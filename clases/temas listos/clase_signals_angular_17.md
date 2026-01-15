# 🅰️ Clase: Signals en Angular 17+

## Estado reactivo moderno

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Entender qué es un **Signal**
- Reemplazar `ngModel` usando Signals
- Manejar estado reactivo en Angular moderno
- Usar `signal`, `computed` y `effect`
- Trabajar con arrays y objetos
- Integrar Signals con `@if` y `@for`

---

## 🧠 1. ¿Qué es un Signal?

Un **Signal** es una **variable reactiva** que Angular observa automáticamente.

Cuando el valor de un signal cambia:
- Angular sabe qué partes del template dependen de él
- Solo se actualiza esa parte de la vista

Esto hace que Angular sea:
- Más rápido ⚡
- Más predecible 🧠
- Más fácil de mantener 🧱

---

## 🔄 Comparación mental

### ❌ Antes (Angular clásico)
```ts
nombre = 'Carlos';
```

- Angular no sabe cuándo cambia
- Revisa todo el componente

### ✅ Ahora (Angular moderno)
```ts
nombre = signal('Carlos');
```

- Angular vigila el valor
- Solo se actualiza lo necesario

---

## 🧩 2. Crear y usar un Signal

### Importación
```ts
import { signal } from '@angular/core';
```

### Declarar un signal
```ts
nombre = signal('Carlos');
```

### Regla de oro

| Acción | Cómo se hace |
|------|--------------|
| Leer valor | `nombre()` |
| Cambiar valor | `nombre.set()` |
| Actualizar según anterior | `nombre.update()` |

---

## 👀 3. Leer un Signal

### En TypeScript
```ts
console.log(nombre());
```

### En HTML
```html
<h2>{{ nombre() }}</h2>
```

🚨 Error común:
```html
{{ nombre }} ❌
{{ nombre() }} ✅
```

---

## ✏️ 4. Cambiar el valor de un Signal

### `.set()` – reemplaza el valor
```ts
nombre.set('Ana');
```

### `.update()` – usa el valor anterior
```ts
contador.update(c => c + 1);
```

---

## 🧪 5. Ejemplo 1 – Contador con Signals

```ts
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-contador',
  template: `
    <h2>Contador: {{ contador() }}</h2>
    <button (click)="incrementar()">+</button>
  `
})
export class ContadorComponent {
  contador = signal(0);

  incrementar() {
    this.contador.update(c => c + 1);
  }
}
```

---

## 🔁 6. Signals como reemplazo de `ngModel`

### ❌ Antes
```html
<input [(ngModel)]="nombre">
```

### ✅ Ahora (Signals)
```html
<input
  [value]="nombre()"
  (input)="nombre.set($any($event.target).value)"
>

<p>Hola {{ nombre() }}</p>
```

```ts
nombre = signal('');
```

---

## 📦 7. Signals con arrays

### ❌ MAL (no reactivo)
```ts
this.skills().push('Angular');
```

### ✅ BIEN (reactivo)
```ts
this.skills.update(list => [...list, 'Angular']);
```

### Ejemplo completo
```ts
skills = signal(['HTML', 'CSS']);
nuevaSkill = signal('');

agregar() {
  this.skills.update(list => [...list, this.nuevaSkill()]);
  this.nuevaSkill.set('');
}
```

```html
<input
  [value]="nuevaSkill()"
  (input)="nuevaSkill.set($any($event.target).value)"
>

<ul>
  @for (skill of skills(); track skill) {
    <li>{{ skill }}</li>
  }
</ul>
```

---

## 🧠 8. `computed()` – Signals derivados

Un `computed` es un signal que depende de otros signals.

```ts
import { computed } from '@angular/core';

nombre = signal('Carlos');

nombreMayus = computed(() =>
  nombre().toUpperCase()
);
```

```html
<p>{{ nombreMayus() }}</p>
```

---

## ⚡ 9. `effect()` – Reaccionar a cambios

```ts
import { effect } from '@angular/core';

effect(() => {
  console.log('El nombre cambió:', nombre());
});
```

Usos comunes:
- Logs
- LocalStorage
- Llamadas a APIs

---

## 🧭 10. Signals + Control Flow moderno

### `@if`
```html
@if (nombre()) {
  <p>Hola {{ nombre() }}</p>
}
```

### `@for`
```html
@for (skill of skills(); track skill) {
  <li>{{ skill }}</li>
}
```

---

## 🚫 11. Errores comunes

❌ Olvidar paréntesis
```html
{{ contador }} ❌
{{ contador() }} ✅
```

❌ Mutar arrays
```ts
skills().push('JS') ❌
```

❌ Usar signal como variable
```ts
if (nombre) ❌
if (nombre()) ✅
```

---

## 🎯 12. ¿Cuándo usar Signals?

✔ Estado de UI
✔ Inputs
✔ Listas
✔ Toggles
✔ Contadores

❌ Formularios grandes → Reactive Forms

---

## 🧪 13. Ejercicio propuesto

Crea un componente que:

1. Tenga un signal `nombre`
2. Un input que lo actualice
3. Un `computed` que lo muestre en mayúscula
4. Un botón para limpiar el nombre
5. Use `@if` para mostrar el saludo solo si hay nombre

---

## 🔥 Conclusión

Signals hacen que Angular sea:
- Más claro
- Más moderno
- Más predecible
- Más profesional

