# Clase 3 – Routing del Producto LogiFlow (Angular 20+)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: Routing como arquitectura, navegación real y modelo mental Angular

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Comprender el **routing en Angular 20** como parte del core del framework
- Entender el Router como **infraestructura**, no como simple navegación
- Diseñar el **mapa de navegación del producto LogiFlow**
- Usar correctamente **layout + rutas hijas**
- Entender en profundidad **router-outlet**
- Aplicar **lazy loading** con criterio arquitectónico
- Entender y justificar la **ruta comodín (`**`)**
- Leer, explicar y modificar un archivo de rutas con seguridad

Esta clase busca que el coder **razone el routing**, no que lo copie.

---

## 1️⃣ ¿Qué problema resuelve el routing? (desde el producto)

Antes de Angular, pensemos en el problema real.

En LogiFlow:
- El usuario entra al sistema
- Navega entre secciones (Dashboard, Shipments, etc.)
- Puede refrescar el navegador
- Puede compartir URLs

👉 El sistema debe:
- Mostrar la vista correcta
- Mantener la URL sincronizada
- No recargar la página
- Mantener el layout visible

Eso **no lo resuelve el HTML**,  
lo resuelve el **Router**.

---

## 2️⃣ ¿Qué es el Router en Angular 20?

En Angular 20, el **Router** es un subsistema oficial que:

- Escucha cambios en la URL del navegador
- Compara la URL con un conjunto de reglas (`Routes`)
- Decide qué componente corresponde
- Crea y destruye componentes de página
- Coordina el ciclo de vida de las vistas
- Trabaja junto con `router-outlet`

👉 El Router **no pinta HTML**.  
Decide **qué componente debe existir**.

---

## 3️⃣ Routing ≠ Navegación (aclaración clave)

Un error común es pensar:

❌ “Routing es usar links”

En realidad:

- El **routing** define qué vistas existen
- La **navegación** es solo una forma de activar rutas

El Sidebar **usa** el routing,  
pero **no lo define**.

---

## 4️⃣ La URL como estado de la aplicación

En Angular (y en SPAs en general):

> **La URL representa el estado de navegación del sistema**

Ejemplos:
- `/dashboard` → estado “vista general”
- `/shipments` → estado “gestión de envíos”

Esto permite:
- Refresh sin perder contexto
- Deep links
- Compartir URLs
- Debugging real

---

## 5️⃣ El routing como mapa del producto LogiFlow

En LogiFlow, el routing representa las **vistas oficiales del MVP**.

| Ruta | Vista | Dominio |
|---|---|---|
| `/dashboard` | Dashboard | Operaciones |
| `/shipments` | Shipments | Envíos |
| `/customers` | Customers | Clientes |
| `/reports` | Reports | Reportes |
| `/settings` | Settings | Configuración |

👉 Si una vista no tiene ruta, **no existe para el usuario**.

---

## 6️⃣ Routing moderno en Angular 20

Angular 20 introduce un enfoque más explícito:

- Standalone Components
- Sin `NgModule`
- Archivo plano de rutas
- Router configurado en el bootstrap

Esto separa:
- **Definición** de rutas
- **Inicialización** del router

---

## 7️⃣ Archivo plano de rutas (app.routes.ts)

```ts
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [];
```

Este archivo:
- No es una clase
- No tiene decorators
- No ejecuta lógica

👉 Solo **describe el mapa de navegación**.

---

## 8️⃣ Bootstrap y activación del Router

En `main.ts`:

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES)
  ]
});
```

Esto significa:
- Angular arranca la app
- Se registra el Router
- Se cargan las rutas
- El Router queda activo globalmente

---

## 9️⃣ Implementación completa del routing del MVP 

```ts
export const APP_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page')
            .then(m => m.DashboardPage)
      },
      {
        path: 'shipments',
        loadComponent: () =>
          import('./shipments/shipments.page')
            .then(m => m.ShipmentsPage)
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.page')
            .then(m => m.CustomersPage)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./reports/reports.page')
            .then(m => m.ReportsPage)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.page')
            .then(m => m.SettingsPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
```

---

## 🔟 Layout como raíz del routing

LogiFlow tiene un layout persistente.

```ts
{
  path: '',
  component: MainLayoutComponent,
  children: []
}
```

Esto modela que:
- El layout se renderiza una sola vez
- Todas las vistas viven dentro
- El `router-outlet` del layout recibe las páginas

---

## 1️⃣1️⃣ router-outlet (recordatorio clave)

`router-outlet` es:
- El punto donde Angular renderiza la vista activa
- El lugar donde el Router inserta el componente

Sin `router-outlet`:
- El Router funciona
- La URL cambia
- No hay vista visible

---

## 1️⃣2️⃣ Rutas hijas (children) explicadas

Las rutas hijas permiten:

- Anidar vistas dentro de un layout
- Compartir estructura
- Escalar la app

```ts
children: [
  { path: 'dashboard', loadComponent: ... }
]
```

Sin rutas hijas:
- Habría que repetir el layout
- El routing sería plano
- La app crecería mal

---

## 1️⃣3️⃣ Lazy Loading explicado en profundidad (Angular 20)

### ¿Qué es realmente Lazy Loading?

Lazy loading es una **estrategia de carga de código**, no de datos.

Angular **no descarga todo el código al inicio**,  
lo divide en partes que se cargan cuando se necesitan.

---

### ¿Qué pasa sin lazy loading?

- Bundle inicial grande
- Peor tiempo de carga
- Código innecesario descargado

---

### ¿Qué pasa con lazy loading?

- App arranca más rápido
- Cada vista es un chunk independiente
- Mejor performance real

---

### Lazy loading en Angular 20

```ts
{
  path: 'shipments',
  loadComponent: () =>
    import('./shipments/shipments.page')
      .then(m => m.ShipmentsPage)
}
```

Esto significa:

1. El componente NO se carga al inicio
2. Angular guarda una referencia
3. Al navegar:
   - Descarga el archivo
   - Crea el componente
   - Lo renderiza en el router-outlet

---

### Importación dinámica (`import()`)

- Es JavaScript estándar
- Devuelve una promesa
- Permite dividir el bundle

Angular se apoya en esto para el lazy loading.

---

### Lazy loading NO hace

❌ No carga datos  
❌ No reemplaza servicios  
❌ No gestiona estado  

Solo controla **carga de código**.

---

### Regla mental

> Lazy loading protege el **performance** del frontend.

---

## 1️⃣4️⃣ Ruta comodín (`**`) explicada

```ts
{
  path: '**',
  redirectTo: 'dashboard'
}
```

Esta ruta:
- Captura cualquier URL no reconocida
- Protege la experiencia del usuario
- Evita pantallas rotas

Debe:
- Ir siempre al final
- Redirigir a un estado seguro

---

## 1️⃣5️⃣ Orden de evaluación de rutas

Angular evalúa rutas **de arriba hacia abajo**.

Por eso:
- Rutas específicas primero
- Ruta comodín al final

---

## 1️⃣6️⃣ Definition of Done – Clase 3

- Todas las vistas del MVP tienen ruta
- Layout único y persistente
- Rutas hijas correctamente usadas
- Lazy loading aplicado
- Ruta comodín configurada
- URLs alineadas al negocio

---

## 1️⃣7️⃣ Resultado final

Al finalizar esta clase:

- LogiFlow es una SPA real
- El routing refleja el producto
- La navegación es estable
- El frontend está listo para UI + datos

👉 La base de navegación está completa.
