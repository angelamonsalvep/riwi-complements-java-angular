# Clase 2 – Main Layout (Sidebar + Header) en LogiFlow (Angular 20+)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: Arquitectura, layouts y criterio frontend

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Entender **qué es un layout** y por qué es clave en aplicaciones profesionales
- Diferenciar claramente entre **layout** y **vista (page)**
- Implementar un **Main Layout** usando Angular moderno
- Comprender el rol del **router-outlet**
- Separar correctamente **estructura**, **navegación** y **contenido**
- Evitar duplicación de HTML y deuda técnica

Esta clase transforma el proyecto LogiFlow de una estructura técnica
a una **aplicación con experiencia de usuario coherente**.

---

## 1️⃣ ¿Qué es un Layout? (concepto fundamental)

Un **layout** es la **estructura visual y funcional persistente** de una aplicación.

Es todo aquello que:
- Se mantiene visible al navegar
- Da contexto al usuario
- No depende de la funcionalidad específica de una vista

Ejemplos de elementos de layout:
- Sidebar
- Header
- Footer
- Contenedor principal

👉 El layout **no representa una funcionalidad**,  
representa la **experiencia base del sistema**.

---

## 2️⃣ Diferencia entre Layout y Vista (Page)

Este es uno de los conceptos más importantes del frontend profesional.

### Vista (Page)
- Cambia con la navegación
- Representa una funcionalidad concreta
- Depende del dominio de negocio

Ejemplos:
- Dashboard
- Shipments
- Customers

---

### Layout
- Permanece fijo
- Envuelve a las vistas
- Define la estructura general

👉 Una vista **vive dentro** de un layout.

---

## 3️⃣ ¿Por qué el Layout NO debe repetirse?

Un error común es copiar el HTML del layout en cada página.

❌ Problemas de este enfoque:
- Código duplicado
- Cambios costosos
- Inconsistencias visuales
- Mayor riesgo de bugs

✅ Un layout centralizado:
- Se define una sola vez
- Se mantiene fácilmente
- Escala sin esfuerzo

---

## 4️⃣ Cómo Angular resuelve layouts (concepto clave)

Angular utiliza el **Router** y el **router-outlet** para manejar layouts.

La idea es:
- El layout se renderiza una vez
- El router decide qué vista mostrar dentro

Estructura conceptual:

```
MainLayout
 ├── Sidebar
 ├── Header
 └── router-outlet → Vista activa
```

---

## 5️⃣ router-outlet explicado desde cero

`router-outlet` es un **marcador de posición**.

Angular lo utiliza para:
- Insertar el componente de la ruta activa
- Cambiar vistas sin recargar la página

NO es:
- Un componente visual
- Un contenedor de lógica
- Un lugar para escribir HTML arbitrario

👉 Es el **punto de renderizado dinámico** de la app.

---

## 6️⃣ MainLayoutComponent (rol y responsabilidad)

El `MainLayoutComponent` es un **componente estructural**.

Su responsabilidad es:
- Organizar la estructura
- Componer otros componentes
- Definir dónde se renderizan las vistas

NO debe:
- Cargar datos
- Conocer el negocio
- Implementar lógica compleja

```ts
@Component({
  selector: 'app-main-layout',
  standalone: true,
  template: `
    <app-sidebar></app-sidebar>

    <div class="layout-content">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class MainLayoutComponent {}
```

---

## 7️⃣ SidebarComponent (concepto de navegación)

El Sidebar representa la **navegación principal** del sistema.

Responsabilidades:
- Mostrar opciones de navegación
- Cambiar de ruta

No debe:
- Manejar estado de negocio
- Consumir servicios
- Tomar decisiones complejas

```ts
@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/shipments">Shipments</a>
      <a routerLink="/customers">Customers</a>
      <a routerLink="/reports">Reports</a>
      <a routerLink="/settings">Settings</a>
    </nav>
  `
})
export class SidebarComponent {}
```

---

## 8️⃣ HeaderComponent (rol funcional)

El Header es un componente de **contexto global**.

Puede mostrar:
- Nombre del producto
- Usuario activo
- Acciones globales

```ts
@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header>
      <strong>LogiFlow</strong>
      <span>User</span>
    </header>
  `
})
export class HeaderComponent {}
```

---

## 9️⃣ Ubicación de los componentes de layout

Siguiendo la arquitectura definida en la Clase 1:

```
core/
└── layout/
    ├── main-layout.component.ts
    ├── sidebar.component.ts
    └── header.component.ts
```

👉 Viven en `core` porque:
- Son únicos
- Se cargan una sola vez
- Son parte de la infraestructura

---

## 🔟 Integración del layout con el Router

El router define que todas las vistas del MVP
se renderizan dentro del layout.

```ts
export const APP_ROUTES = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../dashboard/dashboard.page')
            .then(m => m.DashboardPage)
      }
    ]
  }
];
```

---

## 1️⃣1️⃣ Separación de responsabilidades (principio clave)

| Elemento | Responsabilidad |
|--------|----------------|
| Layout | Estructura |
| Sidebar | Navegación |
| Header | Contexto |
| Page | Funcionalidad |

Este principio:
- Reduce acoplamiento
- Facilita cambios
- Mejora legibilidad

---

## 1️⃣2️⃣ Errores comunes a evitar

❌ Cargar datos en el layout  
❌ Repetir sidebar en cada página  
❌ Hacer el layout dependiente de una vista  
❌ Mezclar navegación con lógica de negocio  

---

## 1️⃣3️⃣ Definition of Done – Clase 2

La clase está completa cuando:

- Existe un MainLayoutComponent
- Sidebar y Header son componentes independientes
- El layout se renderiza una sola vez
- Las vistas se cargan vía router-outlet
- No hay duplicación de estructura

---

## 1️⃣4️⃣ Revisión TL

El TL valida:

✔ Uso correcto de router-outlet  
✔ Layout desacoplado  
✔ Componentes bien separados  
✔ Arquitectura coherente con Clase 1  

---

## 1️⃣5️⃣ Resultado final

Al finalizar esta clase:

- LogiFlow tiene un layout profesional
- La navegación es consistente
- El proyecto está listo para implementar vistas reales
- El frontend empieza a verse como un producto B2B real

👉 A partir de aquí, **se construyen las vistas del MVP**.
