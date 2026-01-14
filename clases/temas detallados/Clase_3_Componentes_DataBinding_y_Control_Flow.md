# 📙 Clase 3 – Componentes, Data Binding y Control Flow
Complementos Frontend – Clan RIWI  
Nivel: Inicial → Intermedio  
Duración sugerida: 2 a 3 horas

## 🎯 Objetivo de la clase
Al finalizar esta clase, el coder será capaz de:
- Comprender qué es un componente en Angular
- Conectar lógica y vista usando Data Binding
- Manejar eventos desde el template
- Utilizar el Control Flow moderno de Angular (17+)
- Crear componentes interactivos y dinámicos

---

## 🧩 ¿Qué es un componente en Angular?
Un componente es la unidad básica de Angular.  
Representa una **parte de la interfaz** y contiene:
- Lógica (TypeScript)
- Vista (HTML)
- Estado

👉 En Angular **todo es un componente**.

---

## 🧠 Anatomía de un componente

```ts
@Component({
  standalone: true,
  selector: 'app-ejemplo',
  template: `<h1>Hola Angular</h1>`
})
export class EjemploComponent {}
```

### ¿Qué hace cada parte?
- `standalone: true` → componente moderno
- `selector` → etiqueta HTML personalizada
- `template` → vista del componente
- `class` → lógica y estado

---

## 🔗 Data Binding (conectar lógica ↔ vista)

Data Binding permite mostrar datos y reaccionar a eventos.

---

## 1️⃣ Interpolación
Mostrar datos del componente en el HTML.

```ts
export class SaludoComponent {
  nombre = 'Clan RIWI';
}
```

```html
<h1>Hola {{ nombre }}</h1>
```

---

## 2️⃣ Property Binding
Enviar valores desde el componente al HTML.

```ts
imagen = 'https://angular.io/assets/images/logos/angular/angular.svg';
```

```html
<img [src]="imagen">
```

---

## 3️⃣ Event Binding
Capturar eventos del usuario.

```ts
contador = 0;

incrementar() {
  this.contador++;
}
```

```html
<button (click)="incrementar()">+</button>
<p>Valor: {{ contador }}</p>
```

---

## 4️⃣ Two-way Binding
Sincroniza datos entre vista y lógica.

```ts
nombre = '';
```

```html
<input [(ngModel)]="nombre">
<p>Hola {{ nombre }}</p>
```

👉 Muy usado en formularios.

---

## 🧩 Control Flow moderno (Angular 17+)

Angular ahora usa una sintaxis más clara.

---

## @if (reemplaza *ngIf)

```ts
activo = true;
```

```html
@if (activo) {
  <p>Usuario activo</p>
} @else {
  <p>Usuario inactivo</p>
}
```

---

## @for (reemplaza *ngFor)

```ts
skills = ['HTML', 'CSS', 'Angular'];
```

```html
<ul>
  @for (skill of skills; track skill) {
    <li>{{ skill }}</li>
  }
</ul>
```

---

## 🧠 Ejemplo completo de componente interactivo

```ts
@Component({
  standalone: true,
  selector: 'app-perfil',
  template: `
    <h2>{{ nombre }}</h2>

    <input [(ngModel)]="nuevaSkill">
    <button (click)="agregarSkill()">Agregar</button>

    <ul>
      @for (skill of skills; track skill) {
        <li>{{ skill }}</li>
      }
    </ul>
  `
})
export class PerfilComponent {
  nombre = 'Carlos';
  nuevaSkill = '';
  skills = ['Angular', 'TypeScript'];

  agregarSkill() {
    if (this.nuevaSkill) {
      this.skills.push(this.nuevaSkill);
      this.nuevaSkill = '';
    }
  }
}
```

---

## ❌ Errores comunes
- Mezclar mucha lógica en el template
- No usar track en @for
- No entender qué viene del TS y qué del HTML

---

## 🧪 Ejercicio práctico (OBLIGATORIO)

### Parte 1
Crear un componente `Contador` que:
- Muestre un número
- Tenga botones + y –
- Use interpolación y eventos

---

### Parte 2
Crear un componente `ListaTareas` que:
- Permita agregar tareas
- Liste tareas con `@for`
- Use `@if` para mostrar mensaje cuando no haya tareas

---

## 🧠 Checklist de la clase
✔ Entiende componentes  
✔ Usa Data Binding  
✔ Maneja eventos  
✔ Usa @if y @for  
✔ Crea componentes dinámicos  

---

## 🚀 Próxima clase
👉 **Clase 4 – Servicios, Inyección de Dependencias y Buenas Prácticas**
