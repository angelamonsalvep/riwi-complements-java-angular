# Clase 1 – Fundamentos de TypeScript para Angular (Actualizada 2025)

## 🎯 Objetivo
Dominar los fundamentos de TypeScript necesarios para trabajar con Angular moderno.

## ¿Por qué Angular usa TypeScript?
Angular utiliza TypeScript por su tipado estático, escalabilidad y mantenibilidad.

## Tipos de datos
```ts
let nombre: string = "Angela";
let edad: number = 28;
let activo: boolean = true;
let habilidades: string[] = ["HTML", "CSS", "Angular"];
```

## Union Types
```ts
let id: number | string;
```

## Interfaces
```ts
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
}
```

## Clases
```ts
class Persona {
  constructor(public nombre: string, private edad: number) {}
  saludar() {
    return `Hola soy ${this.nombre}`;
  }
}
```

## Ejercicio
Crear una interfaz Curso y una clase CursoOnline.
