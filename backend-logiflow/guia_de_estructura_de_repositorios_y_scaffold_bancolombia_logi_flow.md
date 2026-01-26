# 🗂️ Guía de Estructura de Repositorios y Scaffold Bancolombia – LogiFlow

## Cómo crear y organizar correctamente los microservicios

---

## 🎯 Objetivo del Documento

Este documento define **cómo deben crearse, estructurarse y organizarse** los microservicios del backend de LogiFlow utilizando el **Scaffold Clean Architecture de Bancolombia**.

Su propósito es:

- Evitar estructuras improvisadas
- Asegurar coherencia entre microservicios
- Aplicar correctamente **arquitectura hexagonal**
- Facilitar lectura, mantenimiento y evaluación

> ⚠️ Este documento define la **estructura esperada**, no es opcional.

---

## 📘 Glosario esencial

- **Scaffold**: herramienta que genera la estructura base de un proyecto.
- **Arquitectura limpia / hexagonal**: estilo que separa dominio de infraestructura.
- **Puerto (Port)**: contrato que define una dependencia del dominio.
- **Adaptador (Adapter)**: implementación concreta de un puerto.
- **Microservicio**: unidad independiente con responsabilidad clara.

---

## 1️⃣ Regla fundamental de repositorios

> **Un microservicio = un repositorio**

Esto significa:

- ❌ No múltiples microservicios en un solo repo
- ❌ No carpetas por dominio dentro de un monolito
- ✅ Un repo por responsabilidad

Ejemplos correctos:

- `logiflow-shipment-service`
- `logiflow-tracking-service`
- `logiflow-customer-service`

---

## 2️⃣ Scaffold Clean Architecture de Bancolombia

El proyecto utiliza el scaffold oficial de Bancolombia:

- Repositorio: https://github.com/bancolombia/scaffold-clean-architecture
- Documentación: https://bancolombia.github.io/scaffold-clean-architecture/docs/intro/

Este scaffold:

- Fuerza separación de capas
- Evita acoplamientos tempranos
- Facilita pruebas
- Estándar enterprise

---

## 3️⃣ Creación de un microservicio (flujo esperado)

Para cada microservicio:

1. Crear repositorio nuevo
2. Generar proyecto con scaffold
3. Seleccionar:
   - Lenguaje: Java
   - Build tool: Gradle
   - Arquitectura limpia
4. Nombrar correctamente el proyecto

📌 El nombre del proyecto debe reflejar el dominio.

---

## 4️⃣ Estructura general generada

El scaffold genera una estructura base como:

```
logiflow-*-service
│
├── domain
│   ├── model
│   ├── exceptions
│   └── events
│
├── usecase
│
├── application
│   └── config
│
├── infrastructure
│   ├── entry-points
│   └── driven-adapters
│
└── build.gradle
```

---

## 5️⃣ Qué va en cada capa (explicado)

### 🔵 domain

Contiene:
- Entidades
- Value Objects
- Reglas de negocio
- Eventos de dominio

❌ No usar anotaciones de Spring

---

### 🟢 usecase

Contiene:
- Casos de uso
- Orquestación

❌ No lógica de persistencia

---

### 🟣 application

Contiene:
- Configuración
- Beans
- Wiring

📌 Punto de unión de la aplicación.

---

### 🟠 infrastructure

Contiene:

#### entry-points
- Controllers HTTP
- SSE
- Mensajería

#### driven-adapters
- Repositorios
- Clientes externos

📌 Aquí vive la tecnología.

---

## 6️⃣ Ejemplo aplicado: Shipment Service

Repositorio:
```
logiflow-shipment-service
```

Responsabilidad:
- Ciclo de vida del envío
- Reglas de estado

Endpoints:
- `/shipments`
- `/shipments/{id}/status`

---

## 7️⃣ Reglas estrictas de uso del scaffold

- ❌ No mover carpetas
- ❌ No saltarse capas
- ❌ No acceder a DB desde dominio
- ❌ No usar controllers como servicios

---

## 8️⃣ Cómo se evaluará esta parte

Un microservicio será evaluado por:

- Correcta estructura
- Uso real del dominio
- Casos de uso claros
- Separación de capas
- Cumplimiento del checklist de pruebas

---

## 🧠 Frase de Cierre

> **“La estructura no es burocracia, es protección del diseño.”**

---

📄 *Guía oficial de estructura de repositorios y uso del Scaffold Bancolombia – Backend LogiFlow.*

