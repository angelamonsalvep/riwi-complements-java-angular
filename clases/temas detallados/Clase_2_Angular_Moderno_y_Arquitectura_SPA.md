# 📗 Clase 2 – Angular Moderno y Arquitectura SPA
Complementos Frontend – Clan RIWI  
Nivel: Inicial → Intermedio  
Duración sugerida: 2 a 3 horas

## 🎯 Objetivo de la clase
Al finalizar esta clase, el coder será capaz de:
- Entender qué es Angular hoy (Angular 17+)
- Comprender el concepto de Single Page Application (SPA)
- Identificar los bloques principales de Angular
- Crear y entender Standalone Components
- Leer la estructura real de un proyecto Angular

---

## 🚀 ¿Qué es Angular?
Angular es un framework frontend basado en TypeScript, mantenido por Google, que permite crear aplicaciones web robustas y escalables.

Angular provee:
- Componentes
- Routing
- Servicios
- Inyección de dependencias
- Comunicación con APIs

---

## 🌐 ¿Qué es una SPA?
Una Single Page Application:
- Carga una sola vez
- Cambia vistas sin recargar
- Consume APIs
- Maneja estado en el frontend

### Ejemplo
HTML tradicional:
```html
<a href="usuarios.html">Usuarios</a>
```

Angular (SPA):
```html
<a routerLink="/usuarios">Usuarios</a>
```

---

## 🧱 Bloques principales de Angular
- Componentes → UI
- Templates → HTML dinámico
- Servicios → lógica de negocio
- Routing → navegación
- DI → inyección de dependencias

---

## 🧩 Standalone Components (Angular moderno)
```ts
@Component({
  standalone: true,
  selector: 'app-home',
  template: '<h1>Home</h1>'
})
export class HomeComponent {}
```

Ventajas:
- Menos configuración
- Código más limpio
- Aprendizaje más rápido

---

## 📁 Estructura moderna de proyecto
```text
src/
 └── app/
     ├── core/
     ├── shared/
     ├── features/
     ├── app.config.ts
     └── app.routes.ts
```

---

## 🧭 Routing básico
```ts
export const routes = [
  { path: '', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent }
];
```

---

## 🧪 Ejercicio
1. Explica con tus palabras qué es una SPA
2. ¿Qué ventaja tienen los Standalone Components?
3. Identifica las carpetas core, shared y features
