# Clase 2 – Angular Moderno y Arquitectura SPA

## Objetivo
Comprender Angular moderno (17+) y arquitectura SPA.

## ¿Qué es Angular?
Framework frontend basado en TypeScript para construir SPA.

## Standalone Components
```ts
@Component({
  standalone: true,
  selector: 'app-home',
  template: '<h1>Home</h1>'
})
export class HomeComponent {}
```

## Estructura recomendada
src/app/core
src/app/shared
src/app/features
