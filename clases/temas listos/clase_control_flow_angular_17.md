# 🅰️ Clase: @if y @for en Angular 17+

## Control Flow moderno explicado paso a paso

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Entender para qué sirven `@if` y `@for`
- Diferenciar control flow moderno vs `*ngIf` y `*ngFor`
- Usar `@if`, `@else`, `@for` y `@empty`
- Integrar `@if` y `@for` con Signals
- Evitar errores comunes

---

## 🧠 1. ¿Qué es Control Flow en Angular?

El **Control Flow** permite decidir:
- Qué HTML se muestra
- Cuándo se muestra
- Cuántas veces se repite

En Angular 17+, el control flow moderno se hace con:
- `@if`
- `@for`

---

## 🔁 Comparación rápida

| Angular antiguo | Angular moderno |
|---------------|----------------|
| `*ngIf` | `@if` |
| `*ngFor` | `@for` |
| Sintaxis con `*` | Sintaxis tipo JavaScript |
| Menor rendimiento | Mejor rendimiento |

---

## 🔷 2. @if – Mostrar u ocultar contenido

### 🧠 ¿Para qué sirve?

`@if` permite mostrar HTML **solo si una condición es verdadera**.

---

### ❌ Antes (Angular clásico)
```html
<p *ngIf="nombre">Hola {{ nombre }}</p>
```

---

### ✅ Ahora (Angular 17+)
```html
@if (nombre()) {
  <p>Hola {{ nombre() }}</p>
}
```

📌 Se lee como JavaScript
📌 Más claro y mantenible

---

## 🔷 3. @else y @else if

```html
@if (edad() >= 18) {
  <p>Mayor de edad</p>
} @else if (edad() >= 13) {
  <p>Adolescente</p>
} @else {
  <p>Niño</p>
}
```

---

## 🧪 Ejemplo completo con Signal

```ts
nombre = signal('');
```

```html
<input
  [value]="nombre()"
  (input)="nombre.set($any($event.target).value)"
>

@if (nombre()) {
  <p>Hola {{ nombre() }} 👋</p>
} @else {
  <p>Escribe tu nombre</p>
}
```

---

## 🔷 4. @for – Repetir contenido

### 🧠 ¿Para qué sirve?

`@for` permite mostrar una lista de elementos uno por uno.

---

### ❌ Antes
```html
<li *ngFor="let skill of skills">{{ skill }}</li>
```

---

### ✅ Ahora
```html
@for (skill of skills(); track skill) {
  <li>{{ skill }}</li>
}
```

📌 `track` mejora el rendimiento

---

## 🧪 Ejemplo con array y Signal

```ts
skills = signal(['HTML', 'CSS', 'Angular']);
```

```html
<ul>
  @for (skill of skills(); track skill) {
    <li>{{ skill }}</li>
  }
</ul>
```

---

## 🔁 5. track – Identificador único

`track` le dice a Angular **cómo identificar cada elemento**.

### Ejemplo recomendado

```ts
skills = signal([
  { id: 1, nombre: 'HTML' },
  { id: 2, nombre: 'CSS' }
]);
```

```html
@for (skill of skills(); track skill.id) {
  <li>{{ skill.nombre }}</li>
}
```

---

## 🧠 6. @empty – Lista vacía

```html
<ul>
  @for (skill of skills(); track skill) {
    <li>{{ skill }}</li>
  } @empty {
    <li>No hay skills registradas</li>
  }
</ul>
```

---

## 🧠 7. @if + @for juntos

```html
@if (skills().length > 0) {
  <ul>
    @for (skill of skills(); track skill) {
      <li>{{ skill }}</li>
    }
  </ul>
} @else {
  <p>No hay habilidades</p>
}
```

---

## 🚫 8. Errores comunes

❌ Olvidar paréntesis con Signals
```html
@if (nombre) ❌
@if (nombre()) ✅
```

❌ No usar track
```html
@for (item of items()) ❌
```

---

## 🎯 9. ¿Cuándo usar @if y @for?

✔ Mostrar u ocultar contenido
✔ Renderizar listas
✔ Trabajar con Signals
✔ Proyectos Angular modernos

❌ No mezclar con `*ngIf` y `*ngFor` en proyectos nuevos

---

## 🧪 10. Ejercicio propuesto

Crea un componente que:

1. Tenga un signal `skills`
2. Un input para agregar skills
3. Use `@for` para listarlas
4. Use `@empty` si no hay skills
5. Use `@if` para mostrar un mensaje de bienvenida

---

## 🔥 Conclusión

`@if` y `@for` son:
- Más claros
- Más rápidos
- Más modernos

Son el **control flow recomendado en Angular 17+**.

