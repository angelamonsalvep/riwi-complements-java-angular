# LogiFlow – Backend Reactivo por Microservicios (Guía de Objetivo Final)

## 🎯 Propósito de este Backend

Este backend será implementado siguiendo un **enfoque de microservicios**, donde cada servicio representa un **subdominio claro del negocio logístico**, manteniendo **arquitectura hexagonal interna** y comunicación reactiva.

El backend de **LogiFlow** tiene como objetivo modelar correctamente un **sistema logístico real**, aplicando **arquitectura hexagonal**, **programación reactiva** y **buenas prácticas de diseño de software**, priorizando siempre:

- Reglas de negocio protegidas
- Dominio independiente de frameworks
- Casos de uso claros y testeables
- Comunicación reactiva y no bloqueante
- Preparación para eventos y streams en tiempo real

Este backend **NO es un CRUD tradicional**. La API es una consecuencia del dominio, no el centro del sistema.

---

## 🧠 Enfoque Arquitectónico

El backend de LogiFlow se construirá como un **ecosistema de microservicios reactivos**, donde:

- Cada microservicio es **independiente y desplegable por separado**
- Cada microservicio usa **arquitectura hexagonal internamente**
- No existe un dominio compartido entre servicios
- La comunicación es asíncrona siempre que sea posible

Para la generación inicial de cada microservicio se usará el **plugin oficial de Scaffold de Bancolombia**, el cual permite crear proyectos basados en **Arquitectura Hexagonal (Clean Architecture)** de forma estandarizada.

🔗 **Repositorio oficial del scaffold**  
https://github.com/bancolombia/scaffold-clean-architecture

📘 **Documentación oficial**  
https://bancolombia.github.io/scaffold-clean-architecture/docs/intro/

Cada microservicio tendrá su propio repositorio, ciclo de vida y pruebas.

Para la generación inicial del proyecto se usará el **plugin oficial de Scaffold de Bancolombia**, el cual permite crear proyectos basados en **Arquitectura Hexagonal (Clean Architecture)** de forma estandarizada y alineada con buenas prácticas empresariales.

🔗 **Repositorio oficial del scaffold**  
https://github.com/bancolombia/scaffold-clean-architecture

📘 **Documentación oficial**  
https://bancolombia.github.io/scaffold-clean-architecture/docs/intro/

Es obligatorio que todos los coders revisen la documentación antes de comenzar a desarrollar.

Se usará **Arquitectura Hexagonal (Ports & Adapters)** generada mediante el **plugin de Scaffold de Bancolombia**, respetando estrictamente la separación de responsabilidades.

### Principios clave

- El **dominio no depende de Spring, WebFlux ni de la base de datos**
- Las reglas de negocio viven en el dominio
- Los casos de uso orquestan el flujo
- Los adapters solo traducen (HTTP, DB, eventos)
- Todo el backend es **reactivo** (Mono / Flux)

---

## 🧰 Tips para usar correctamente el Scaffold de Bancolombia en Microservicios

Antes de comenzar a desarrollar, ten en cuenta las siguientes recomendaciones específicas para microservicios:

### ✅ Tips prácticos

1️⃣ **Un scaffold por microservicio**  
Cada microservicio se genera como un proyecto independiente. No mezcles múltiples dominios en un solo scaffold.

2️⃣ **Un microservicio = un subdominio**  
Si el microservicio no se puede explicar en una frase clara de negocio, está mal definido.

3️⃣ **No compartas el dominio entre servicios**  
No se permite copiar entidades de un microservicio a otro. La integración se hace por eventos o contratos.

4️⃣ **Empieza siempre por el dominio del microservicio**  
Antes de endpoints:
- Define el dominio específico
- Define reglas propias
- Escribe pruebas de dominio

5️⃣ **Comunicación reactiva y asíncrona**  
Prioriza eventos y streams sobre llamadas síncronas.

6️⃣ **El scaffold no define límites de microservicio**  
El límite lo define el negocio, no la herramienta.

> ⚠️ Un microservicio con lógica débil es solo un CRUD distribuido.

---

Antes de comenzar a desarrollar, ten en cuenta las siguientes recomendaciones:

### ✅ Tips prácticos

1️⃣ **Usa el scaffold solo para generar la estructura inicial**  
El scaffold te da la base del proyecto (capas, módulos y configuración), pero **el valor real está en cómo modelas el dominio**, no en la cantidad de código generado.

2️⃣ **No rompas la separación de capas**  
- No importes Spring en el dominio
- No pongas lógica de negocio en controllers
- No accedas a repositorios desde los adapters de entrada

3️⃣ **Empieza siempre por el dominio**  
Antes de crear endpoints:
- Define entidades
- Define estados
- Define reglas
- Escribe pruebas de dominio

4️⃣ **Los casos de uso no son servicios CRUD**  
Un caso de uso representa una acción del negocio:
- ❌ createShipmentService
- ✅ CreateShipmentUseCase

5️⃣ **Todo debe ser reactivo**  
Si un método devuelve un objeto directo en lugar de `Mono` o `Flux`, está mal diseñado para este proyecto.

6️⃣ **El scaffold no decide el negocio**  
La herramienta organiza el proyecto, pero:
- Las reglas las defines tú
- Los estados los defines tú
- Los eventos los define el dominio

> ⚠️ Si el proyecto funciona pero el dominio es débil, el backend NO cumple el objetivo.

---

## 🧱 Capas del Backend

### 1️⃣ Dominio (`domain`)

Es el corazón del sistema.

Contiene:
- Entidades del negocio (ej: Shipment)
- Value Objects
- Reglas de negocio
- Estados y transiciones válidas
- Excepciones del dominio

📌 **Restricciones importantes**:
- No importa clases de Spring
- No conoce WebFlux
- No conoce bases de datos
- No usa anotaciones de framework

Ejemplo de responsabilidades:
- Validar cambios de estado de un envío
- Evitar transiciones inválidas
- Proteger reglas no negociables

---

### 2️⃣ Casos de Uso (`usecase`)

Los casos de uso representan **acciones del negocio**.

Ejemplos:
- Crear envío
- Cambiar estado de un envío
- Registrar evento de tracking
- Consultar tracking de un envío

Responsabilidades:
- Orquestar el flujo
- Invocar el dominio
- Coordinar puertos de salida

📌 **No hacen**:
- Validaciones de negocio profundas
- Manejo de HTTP
- Lógica de persistencia directa

Todos los casos de uso:
- Son reactivos
- Retornan `Mono` o `Flux`

---

### 3️⃣ Puertos (`ports`)

Definen **contratos**, no implementaciones.

#### Puertos de entrada
- Invocados por controllers o listeners
- Representan lo que el sistema puede hacer

#### Puertos de salida
- Persistencia
- Publicación de eventos
- Streams

📌 Permiten cambiar infraestructura sin tocar el dominio.

---

### 4️⃣ Adapters de Entrada (`entrypoints`)

Son los responsables de **exponer el sistema al mundo exterior**.

Ejemplos:
- Controllers WebFlux
- Endpoints REST
- SSE (Server-Sent Events)

Características:
- Traducción request → caso de uso
- Traducción response → HTTP
- No contienen reglas de negocio

---

### 5️⃣ Adapters de Salida (`adapters`)

Implementan los puertos de salida.

Ejemplos:
- Repositorios reactivos
- Persistencia en base de datos
- Emisión de eventos

Características:
- Totalmente reemplazables
- No contienen lógica de negocio

---

## 🔄 Modelo Reactivo

Todo el backend es **no bloqueante**.

Se utilizan:
- `Mono<T>` para respuestas únicas
- `Flux<T>` para flujos de datos o streams

Casos típicos:
- Consultar un envío → `Mono<Shipment>`
- Listar eventos de tracking → `Flux<TrackingEvent>`
- Stream en tiempo real → `Flux<TrackingEvent>` continuo

---

## 📦 Modelo de Dominio (Referencia)

### Entidad principal: Shipment

Un envío representa una unidad logística que evoluciona en el tiempo.

Estados esperados:
- CREATED
- IN_TRANSIT
- DELIVERED
- CANCELLED

Reglas clave:
- Un envío no puede saltarse estados
- Un envío entregado no puede cancelarse
- Los cambios de estado generan eventos

---

## 📡 Eventos de Negocio

El sistema registra **eventos reales del negocio**, no simples logs.

Ejemplos:
- ShipmentCreated
- ShipmentStatusChanged
- ShipmentDelivered

Los eventos:
- Son coherentes con el dominio
- Pueden persistirse
- Pueden exponerse vía stream

---

## 🌐 Streams en Tiempo Real

El backend expone **Server-Sent Events (SSE)** para tracking en tiempo real.

Objetivo:
- Permitir que clientes se suscriban a eventos
- Visualizar el estado de un envío en vivo

---

## 🧪 Estrategia de Pruebas

### Pruebas obligatorias

1️⃣ Pruebas de dominio
- Validan reglas
- No usan Spring

2️⃣ Pruebas de casos de uso
- Validan flujos
- Mockean puertos

📌 **No se aceptan**:
- Endpoints sin pruebas previas de dominio
- Reglas validadas solo en controllers

---

## ✅ Definition of Done del Backend

El backend se considera completo cuando:

- El dominio está aislado y probado
- Las reglas no pueden romperse
- Los casos de uso son reactivos
- La API solo delega
- Los eventos son coherentes
- El stream funciona de forma estable

---

## 🧭 Mensaje final para el coder

> "Si mañana quitamos Spring, este sistema debería seguir teniendo sentido."

Ese es el objetivo de este backend.

