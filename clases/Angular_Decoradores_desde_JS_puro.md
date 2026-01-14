
# 🅰️ Angular Moderno – Decoradores esenciales (@)
## De JavaScript puro a Angular con TypeScript y Componentes

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Entender qué son los decoradores en Angular
- Comparar JavaScript puro vs Angular
- Crear componentes usando @Component
- Comunicar componentes con @Input() y @Output()
- Manipular el DOM de forma segura
- Aplicar TypeScript desde conocimientos previos de JS

---

## 🧠 De JavaScript puro a Angular

### JavaScript puro

```js
const button = document.querySelector('button');
button.addEventListener('click', () => {
  alert('Hola');
});
```

### Angular

```html
<button (click)="sayHello()">Click</button>
```

```ts
sayHello() {
  alert('Hola');
}
```

---

## 🧠 ¿Qué es un decorador?

Un decorador es una función que agrega metadata a una clase, propiedad o método.
Angular usa esta metadata para saber cómo debe comportarse el componente.

Todos los decoradores comienzan con `@`.

---

## 🧩 Decoradores principales

- @Component
- @Input()
- @Output()
- @ViewChild()
- @Injectable()

---

## 🧱 @Component

```ts
@Component({
  selector: 'app-card',
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

## 📥 @Input()

```ts
@Input() name!: string;
```

```html
<app-greeting [name]="'Angela'"></app-greeting>
```

---

## 📤 @Output()

```ts
@Output() clicked = new EventEmitter<void>();

handleClick() {
  this.clicked.emit();
}
```

```html
<app-button (clicked)="onClick()"></app-button>
```

---

## 👀 @ViewChild()

```ts
@ViewChild('myInput') input!: ElementRef<HTMLInputElement>;

ngAfterViewInit() {
  this.input.nativeElement.focus();
}
```

```html
<input #myInput />
```

---

## 🛡️ Renderer2

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

## 🔁 Ciclo de vida

```ts
export class ExampleComponent implements OnInit, AfterViewInit {
  ngOnInit() {
    console.log('Init');
  }

  ngAfterViewInit() {
    console.log('DOM listo');
  }
}
```

---

## 🧪 TypeScript

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

---

## 🧪 Ejercicio práctico

Crear un componente UserProfileComponent que:

- Use @Input para recibir un nombre
- Use @Output para emitir un evento
- Use @ViewChild para enfocar un input
- Use Renderer2 para cambiar estilos

---

## 🧠 Cierre

Angular no reemplaza JavaScript.
Angular organiza JavaScript para aplicaciones grandes.
