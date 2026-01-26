# 🛠️ Guía Completa Actualizada – Scaffold Clean Architecture (Gradle Plugin)

## Backend LogiFlow – Implementación real con Gradle (1 semana)

> 📌 **Guía oficial y definitiva**, alineada con la documentación de Bancolombia y validada en entorno real.

---

## 🎯 Objetivo de la Guía

Esta guía permite **crear desde cero el microservicio `logiflow-shipment-service`** usando el **Scaffold Clean Architecture de Bancolombia mediante su Gradle Plugin**, asegurando:

- Arquitectura Hexagonal correcta
- Backend Reactivo (WebFlux)
- Uso de tooling **oficial y soportado**
- Base sólida para desarrollar el dominio de LogiFlow

Está pensada para que **la TL lo implemente primero**, y luego sea reutilizada por el clan.

---

## 🧠 Decisión Arquitectónica Importante

❌ **NO se usa el CLI por npm** (`@bancolombia/scaffold`)

Motivos:
- El paquete **no existe públicamente en npm**
- No es el método documentado oficialmente
- Genera fricción innecesaria

✅ **Se usa exclusivamente el Gradle Plugin oficial**:

```gradle
id 'co.com.bancolombia.cleanArchitecture'
```

---

## 📘 Requisitos Oficiales (OBLIGATORIOS)

### ☕ Java

- **Java JDK 17 o superior**

Verificar:
```bash
java -version
```

---

### 🧰 Gradle

- **Gradle 9.2.1 o superior**

⚠️ Es obligatorio instalar Gradle (el plugin lo requiere).

---

## 1️⃣ Instalación de Gradle (FORMA RECOMENDADA)

### 👉 Usar SDKMAN! (estándar profesional)

#### Instalar SDKMAN
```bash
curl -s "https://get.sdkman.io" | bash
```

Recargar la terminal:
```bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```

Verificar:
```bash
sdk version
```

---

#### Instalar Gradle 9.2.1
```bash
sdk install gradle 9.2.1
```

Verificar:
```bash
gradle -v
```

Debe mostrar:
```
Gradle 9.2.1
```

---

## 2️⃣ Crear el Proyecto `shipment-service`

```bash
mkdir logiflow-shipment-service
cd logiflow-shipment-service
```

---

## 3️⃣ Crear el archivo `build.gradle`

```gradle
plugins {
    id 'co.com.bancolombia.cleanArchitecture' version '4.0.5'
}
```

Este plugin es el **núcleo del scaffold**.

---

## 4️⃣ Generar el Gradle Wrapper

```bash
gradle wrapper
```

A partir de aquí **usar siempre**:
```bash
./gradlew
```

---

## 5️⃣ Generar la Estructura Base del Proyecto

```bash
./gradlew ca --name=LogiFlowShipmentService
```

Esto genera:
- módulos hexagonales
- configuración base
- estructura estándar enterprise

---

## 6️⃣ Generar Entry Point Reactivo (WebFlux)

```bash
./gradlew gep --type webflux
```

Esto crea:
- `entry-points/reactive-web`
- configuración WebFlux

---

## 7️⃣ Ejecutar el Proyecto

```bash
./gradlew bootRun
```

Verificar en el navegador:
```
http://localhost:8080/api/usecase/path
```

Respuesta esperada:
- HTTP 200
- cuerpo vacío

👉 Esto confirma que el scaffold funciona correctamente.

---

## 8️⃣ Estructura Esperada del Proyecto

```
logiflow-shipment-service
├── domain
│   ├── model
│   ├── events
│   └── exceptions
├── usecase
├── infrastructure
│   ├── entry-points
│   │   └── reactive-web
│   └── driven-adapters
├── applications
└── build.gradle
```

---

## 9️⃣ Dónde Empezar a Programar

### 📍 Dominio
```
domain/src/main/java/com/logiflow/shipment/domain/model
```

Aquí van:
- `Shipment`
- `ShipmentStatus`

📌 **Sin Spring, sin WebFlux, sin DB**.

---

### 📍 Pruebas de Dominio
```
domain/src/test/java/com/logiflow/shipment/domain
```

Reglas:
- JUnit puro
- Nada de infraestructura

---

## 🧪 Tasks Disponibles del Plugin

El plugin permite generar de forma incremental:

- Generate Project
- Generate Model
- Generate Use Case
- Generate Driven Adapter
- Generate Entry Point
- Generate Acceptance Test
- Generate Performance Test
- Validate Structure

Estos tasks se usarán **solo cuando aporten valor real**.

---

## ❌ Errores Comunes a Evitar

- Usar `npm` para scaffold
- Instalar Gradle con `apt`
- Mover carpetas generadas
- Meter lógica en controllers
- Crear CRUD sin reglas

---

## 🧠 ¿Por qué WebFlux usa Netty y no Tomcat?

Esta sección explica **una decisión técnica clave del backend de LogiFlow**: el uso de **Netty** como servidor embebido en lugar de **Tomcat**.

Entender esto es fundamental para comprender **qué problema estamos resolviendo realmente** con WebFlux.

---

## 🔍 El problema antes de la tecnología

LogiFlow es un sistema que:

- recibe **eventos constantemente** (tracking, estados)
- mantiene **conexiones abiertas** (Server-Sent Events – SSE)
- necesita **actualizaciones en tiempo real**
- no puede bloquear recursos mientras espera

Este tipo de sistema **no encaja bien** en el modelo tradicional de request–response.

---

## 🧱 Modelo tradicional: Tomcat y Servlet API

Tomcat está construido sobre la **Servlet API**, cuyo modelo mental es:

> **1 request = 1 hilo**

### ¿Qué significa esto?

1. Llega una petición HTTP
2. Tomcat asigna un hilo
3. El hilo:
   - espera base de datos
   - espera servicios externos
   - espera que el proceso termine
4. Se envía la respuesta
5. El hilo se libera

📌 **Mientras el sistema espera, el hilo está bloqueado**.

---

### 🚨 Problema de Tomcat en sistemas reactivos

Este modelo falla cuando:

- hay muchas conexiones simultáneas
- las conexiones duran mucho tiempo (SSE)
- los datos llegan en eventos pequeños y frecuentes

Resultado:

- consumo alto de memoria
- agotamiento rápido de hilos
- escalabilidad limitada

Tomcat **no es malo**, simplemente fue diseñado para otro tipo de aplicaciones.

---

## ⚡ Modelo reactivo: Netty y Event Loop

Netty usa un modelo **event-driven** y **no bloqueante** basado en **event loops**.

### ¿Cómo funciona?

- pocos hilos manejan muchos requests
- el sistema **no espera** bloqueando
- reacciona cuando hay datos disponibles

Modelo mental:

> **Muchos eventos → pocos hilos → callbacks**

---

### 🧠 Analogía sencilla

- **Tomcat**: un empleado atiende a un cliente y se queda esperando hasta que termine.
- **Netty**: el empleado toma el pedido y sigue trabajando; cuando el pedido está listo, vuelve.

---

## 🔁 WebFlux + Netty: combinación natural

Spring WebFlux está diseñado para:

- trabajar con **streams** (`Flux`, `Mono`)
- manejar asincronía
- aplicar **backpressure** (control de presión)
- soportar conexiones largas

Netty ofrece exactamente eso:

- I/O no bloqueante
- event loop eficiente
- bajo consumo de recursos
- soporte nativo para streaming

👉 **Por eso WebFlux usa Netty por defecto**.

---

## 🌐 Server-Sent Events (SSE) en LogiFlow

SSE requiere:

- conexiones abiertas por largo tiempo
- envío constante de eventos
- estabilidad bajo carga

Comparación:

- Con **Tomcat**: cada conexión consume un hilo
- Con **Netty**: miles de conexiones con pocos hilos

👉 Para LogiFlow, **Netty no es opcional**, es necesario.

---

## ⚠️ ¿Se puede usar WebFlux con Tomcat?

Técnicamente sí, pero:

- se pierden beneficios reales
- se mantiene el modelo bloqueante
- no es recomendable en producción

Es como usar un motor moderno con frenos antiguos.

---

## 🧠 Conclusión clave

> **WebFlux no usa Netty por moda.**  
> Lo usa porque el modelo Servlet (Tomcat) no sirve para sistemas orientados a eventos y tiempo real.

---

## 🧠 Recomendación Final

> **Elegir Netty no es una decisión de framework, es una decisión de arquitectura.**

---

📄 *Guía completa y actualizada – Scaffold Clean Architecture (Gradle Plugin) para Backend LogiFlow.*
