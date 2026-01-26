# 🟢 Clase 1 – Fundamentos del Backend Reactivo

## De MVC tradicional a un sistema logístico orientado a eventos

---

## 🎯 Objetivo de la Clase

Al finalizar esta clase, el coder será capaz de:

- Comprender **qué problema resuelve la reactividad** en sistemas modernos
- Entender **cómo funciona un backend tradicional internamente** y por qué falla bajo carga
- Explicar con sus propias palabras **qué es un sistema event‑driven (orientado a eventos)**
- Diferenciar claramente **asincronía, concurrencia y paralelismo**
- Entender el rol de **WebFlux, Mono y Flux** sin escribir código aún

> ⚠️ Esta clase es **100 % conceptual**. El objetivo es formar criterio técnico antes de programar.

---

## 📘 Glosario mínimo (lectura obligatoria)

Antes de continuar, aclaremos las siglas que usaremos durante la clase.

- **MVC (Model–View–Controller)**: patrón de arquitectura donde la lógica de negocio, la vista y el controlador están separados. Muy usado en aplicaciones web tradicionales.
- **API (Application Programming Interface)**: conjunto de reglas que permite que un sistema se comunique con otro.
- **HTTP (HyperText Transfer Protocol)**: protocolo de comunicación usado en la web para enviar y recibir información.
- **CRUD (Create, Read, Update, Delete)**: conjunto básico de operaciones para gestionar datos.
- **UI (User Interface)**: interfaz visual con la que interactúa el usuario.
- **KPI (Key Performance Indicator)**: métrica clave para medir el estado del sistema.

👉 Todas estas siglas aparecerán más adelante aplicadas a LogiFlow.

---

## 1️⃣ ¿Qué problema real estamos resolviendo?

Antes de hablar de tecnologías, hablemos del **problema**.

En LogiFlow tenemos:

- Muchos envíos activos al mismo tiempo
- Eventos que llegan desde el mundo real (GPS, operadores, sistemas externos)
- Usuarios que **observan el sistema continuamente**
- Información que **cambia mientras se está viendo**

📌 **Conclusión clave**  
No estamos construyendo un sistema para *pedir datos*, sino un sistema para *reaccionar a cambios*.

---

## 2️⃣ Cómo funciona realmente un backend tradicional (MVC)

### 🧠 Qué pasa internamente cuando llega un request HTTP

1. Llega una petición **HTTP** desde el cliente
2. El servidor asigna un **hilo de ejecución**
3. El hilo espera:
   - Base de datos (**DB – DataBase**)
   - Servicios externos
4. Se construye la respuesta
5. El hilo se libera

Mientras el hilo espera, **no puede atender otras peticiones**.

---

### 🧱 Modelo mental del patrón MVC

```
Cliente → (ocupa un hilo) → Backend → Respuesta
```

📌 **Problema clave**  
Los hilos son un recurso **limitado y costoso**.

---

## 3️⃣ ¿Por qué MVC falla en sistemas logísticos?

Ejemplo realista:

- 1 000 envíos activos
- Cada envío genera eventos constantemente
- 100 usuarios mirando el dashboard

Resultado:
- Muchos hilos bloqueados
- Respuestas lentas
- Escalado costoso

👉 **MVC no está mal**, está mal **para este tipo de problema**.

---

## 4️⃣ Cambio de paradigma: pensar en eventos

### ❌ Pensamiento tradicional

> “Cuando el usuario hace una petición, el backend responde”

### ✅ Pensamiento moderno (Event‑Driven)

> “Cuando algo ocurre en el mundo real, el sistema reacciona”

Ejemplos de **eventos** en LogiFlow:

- Ubicación de un envío actualizada
- Envío marcado como entregado
- Incidente reportado por un operador

Un evento:
- Ya ocurrió
- Representa un **hecho**
- No se cuestiona ni se modifica

---

## 5️⃣ ¿Qué es un sistema reactivo?

Un sistema reactivo es un sistema que:

- Reacciona a eventos
- No bloquea recursos
- Maneja flujos de datos
- Tolera picos de carga

### Principios explicados

### 🔹 Asincronía

El sistema **no se queda esperando** respuestas bloqueando recursos.

---

### 🔹 Concurrencia

El sistema puede manejar **muchas tareas al mismo tiempo**.

---

### 🔹 Paralelismo

El sistema ejecuta **varias tareas literalmente al mismo tiempo** usando múltiples núcleos.

---

### 🔹 Backpressure

Mecanismo mediante el cual el sistema **se protege** cuando recibe más eventos de los que puede procesar.

---

## 6️⃣ Streams de datos (flujos)

En sistemas reactivos no pensamos en valores únicos, sino en **streams (flujos de datos)**.

Ejemplos de streams en LogiFlow:

- Eventos de tracking
- Cambios de estado de un envío
- Métricas que se actualizan

Un stream:
- Vive en el tiempo
- Puede emitir muchos valores
- Puede no terminar nunca

---

## 7️⃣ Mono y Flux (conceptos fundamentales)

### 🔹 Mono

- Representa **0 o 1 evento**
- Ejemplos:
  - Crear un envío
  - Consultar un envío por ID

---

### 🔹 Flux

- Representa **0 a N eventos**
- Ejemplos:
  - Historial de tracking
  - Eventos en tiempo real

---

### Analogía sencilla

- **Mono** → un mensaje puntual
- **Flux** → una transmisión continua

---

## 8️⃣ ¿Qué es Spring WebFlux?

**Spring WebFlux** es un framework de Spring diseñado para construir **APIs reactivas y no bloqueantes**.

WebFlux permite:
- Trabajar con streams
- Manejar muchos clientes concurrentes
- Implementar tiempo real

### Qué WebFlux NO hace

- No arregla un mal diseño
- No reemplaza una buena arquitectura

---

## 9️⃣ ¿Por qué LogiFlow necesita WebFlux?

Porque LogiFlow:

- Recibe eventos constantemente
- Tiene usuarios observando el sistema
- Necesita actualización en tiempo real

👉 WebFlux es una **decisión técnica justificada**, no una moda.

---

## 🔟 Qué NO vamos a hacer

❌ CRUD genérico  
❌ Lógica en controllers  
❌ Backend pasivo esperando requests  
❌ Mezclar UI con reglas de negocio

---

## 🧠 Frase de cierre

> **“Primero entendemos el problema.  
> Luego elegimos la arquitectura.”**

---

📄 *Clase 1 – Versión ampliada con explicación de siglas. Backend LogiFlow.*

