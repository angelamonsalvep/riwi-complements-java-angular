# Clase 1 – Setup Inicial y Arquitectura Base del Proyecto LogiFlow (Angular 20+)

> **Kit de Entrenamiento LogiFlow – Frontend Angular**  
> Nivel: Fundamentos Profesionales  
> Enfoque: Arquitectura, criterio técnico y buenas prácticas reales

---

## 🎯 Objetivo de la clase

Al finalizar esta clase, el coder será capaz de:

- Entender **qué es realmente el setup inicial** de un proyecto Angular
- Comprender **por qué estas decisiones se toman antes de programar vistas**
- Reconocer cómo una buena base arquitectónica evita deuda técnica
- Dejar preparado el proyecto LogiFlow para crecer de forma ordenada

Esta clase **no busca construir funcionalidades**.  
Busca construir **criterio técnico**.

---

## 1️⃣ ¿Qué es el setup inicial? (explicación profunda)

El **setup inicial** es el conjunto de decisiones técnicas y estructurales que definen:

- Cómo se organiza el proyecto
- Cómo se navega la aplicación
- Qué reglas arquitectónicas se siguen
- Qué patrones están permitidos y cuáles no

👉 El setup inicial **no agrega valor visual inmediato**,  
pero **define la calidad de todo el proyecto**.

---

### 🧠 Diferencia clave: setup vs desarrollo

| Setup inicial | Desarrollo de features |
|--------------|-----------------------|
| Define reglas | Implementa pantallas |
| Define estructura | Implementa lógica |
| Se hace una vez | Se repite muchas veces |
| Difícil de cambiar luego | Fácil de iterar |

Un error en el setup se **paga durante todo el proyecto**.

---

## 2️⃣ Contexto real del proyecto LogiFlow

LogiFlow es un **Operations Dashboard B2B**, lo que implica:

- Usuarios expertos (no usuarios finales casuales)
- Información crítica de negocio
- Navegación constante entre vistas
- Evolución continua del producto

Esto obliga a que el frontend:

- Sea predecible
- Sea fácil de mantener
- Sea entendible por cualquier desarrollador nuevo

👉 Aquí **no sirve** una arquitectura improvisada.

---

## 3️⃣ Angular como framework (qué significa de verdad)

Angular es un **framework**, no una librería.

### ¿Qué implica esto?

Una librería:
- Te deja decidir todo
- No impone estructura

Un framework:
- Define cómo trabajar
- Impone convenciones
- Reduce decisiones incorrectas

Angular trae integrado:
- Router
- Inyección de dependencias
- Arquitectura de componentes
- Ciclo de vida claro

👉 Usar Angular correctamente significa **seguir su modelo mental**.

---

## 4️⃣ Single Page Application (SPA) en Angular

LogiFlow es una **SPA**.

### ¿Qué es una SPA?

- El navegador carga una sola vez la aplicación
- Angular controla qué vista se muestra
- La URL representa el estado de la app
- No hay recargas completas de página

Beneficios:
- Navegación fluida
- Mejor experiencia de usuario
- Control total del estado de la UI

---

## 5️⃣ Angular moderno (Angular 20+)

Angular 20 consolida un cambio importante:

- Standalone Components como estándar
- Menos boilerplate
- Arquitecturas más claras

👉 Este kit **no usa Angular antiguo**.

---

## 6️⃣ Standalone Components (explicación completa)

### ¿Qué es un Standalone Component?

Es un componente que:

- No depende de NgModules
- Declara explícitamente lo que usa
- Puede cargarse directamente por el router

```ts
@Component({
  standalone: true,
  selector: 'app-example',
  template: '<p>Example</p>'
})
export class ExampleComponent {}
```

### ¿Qué problema soluciona?

Antes:
- Dependencias ocultas
- Mucho boilerplate
- Arquitectura difícil de leer

Ahora:
- Dependencias visibles
- Componentes autosuficientes
- Código más predecible

---

## 🔒 Decisión Arquitectónica del Proyecto LogiFlow

Aunque Angular 20 ya usa standalone por defecto,  
en LogiFlow **esto es una regla explícita**.

> **Regla:**  
> El proyecto LogiFlow utiliza exclusivamente Standalone Components.  
> No se permite el uso de NgModules.

### ¿Por qué esto es importante?

Porque evita:
- Mezclar tutoriales antiguos
- Crear `SharedModule` innecesarios
- Confusión en equipos en formación

---

## 7️⃣ Creación del proyecto Angular

```bash
ng new logiflow-frontend --routing --style=scss
```

### ¿Por qué estas opciones?

- `--routing`: la navegación es parte central del producto
- `--style=scss`: mejor organización y escalabilidad de estilos

---

## 8️⃣ Arquitectura por dominios (concepto clave)

En proyectos reales, el código se organiza por **dominio de negocio**, no por tipo técnico.

### ❌ Incorrecto
```
components/
services/
```

### ✅ Correcto
```
dashboard/
shipments/
customers/
reports/
settings/
```

Cada dominio contiene:
- Sus páginas
- Sus componentes
- Sus servicios
- Sus modelos

---

## 9️⃣ Estructura base de LogiFlow (explicada)

```txt
src/
├── app/
│   ├── core/
│   ├── shared/
│   ├── dashboard/
│   ├── shipments/
│   ├── customers/
│   ├── reports/
│   ├── settings/
│   ├── app.component.ts
│   └── app.routes.ts
└── assets/
```

---

## 🔟 `core/` vs `shared/`

### core/
Contiene infraestructura única:
- Layout principal
- Servicios globales
- Configuración base

### shared/
Contiene piezas reutilizables:
- Componentes UI
- Pipes
- Modelos comunes

---

## 1️⃣1️⃣ AppComponent: responsabilidad mínima

```ts
@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet />'
})
export class AppComponent {}
```

Su única función:
👉 Renderizar el router.

---

## 1️⃣2️⃣ Routing como columna vertebral

```ts
export const APP_ROUTES = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page')
            .then(m => m.DashboardPage)
      }
    ]
  }
];
```

El routing:
- Define navegación
- Define layout
- Define experiencia de usuario

---

## 1️⃣3️⃣ Lazy Loading (por qué se define desde el inicio)

Lazy loading permite:
- Mejor performance
- Carga progresiva
- Escalabilidad real

Cambiar esto después es costoso.

---

## 1️⃣4️⃣ Reglas técnicas del proyecto

- Código en inglés
- Standalone obligatorio
- Arquitectura por dominios
- Componentes con una sola responsabilidad

---

## 1️⃣5️⃣ Qué NO hace esta clase

❌ No crea vistas  
❌ No consume datos  
❌ No implementa lógica  

Eso viene después.

---

## 1️⃣6️⃣ Definition of Done – Clase 1

- El proyecto compila
- La estructura existe
- El routing funciona
- No hay NgModules
- El equipo entiende el porqué del setup

---

## 1️⃣7️⃣ Resultado final

Al finalizar esta clase:
- El proyecto tiene cimientos sólidos
- El equipo entiende Angular moderno
- Se evita deuda técnica desde el inicio
- El frontend está listo para crecer
