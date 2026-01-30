# 🟢 Clase 1 – Fundamentos del Backend Reactivo

## De MVC tradicional a un sistema logístico orientado a eventos

---

## 🎯 Objetivo de la Clase

Al finalizar esta clase, el coder será capaz de:

- Entender **qué es el modelo reactivo** y por qué existe
- Diferenciar **MVC tradicional vs WebFlux** en escenarios reales
- Comprender **por qué LogiFlow NO puede ser un CRUD clásico**
- Adoptar la **mentalidad event‑driven** antes de escribir código
- Tener el contexto arquitectónico correcto para las siguientes clases

> ⚠️ En esta clase el foco **no es programar**, sino **pensar correctamente el backend**.

---

## 1️⃣ Contexto Real: ¿Qué tipo de sistema es LogiFlow?

LogiFlow **no es**:
- Una tienda online
- Un sistema administrativo simple
- Un CRUD de formularios

LogiFlow **sí es**:
- Un sistema logístico operativo
- Orientado a eventos
- Con estados que cambian constantemente
- Con usuarios observando datos en tiempo real

### Características del dominio logístico

- Muchos envíos activos al mismo tiempo
- Eventos externos (GPS, operadores, sistemas)
- Estados que evolucionan
- Dashboards que deben actualizarse sin recargar

📌 **Pregunta clave**  
¿Un backend tradicional request/response es suficiente para este tipo de sistema?

---

## 2️⃣ El Problema del Backend Tradicional (MVC)

### 🧱 Modelo MVC clásico

Flujo típico:

```
Request → Controller → Service → DB → Response
```

Características:
- Flujo sincrónico
- Hilos bloqueados
- Escalabilidad limitada

### ❌ Problemas reales en logística

- Cada request ocupa un hilo
- Muchos usuarios mirando dashboards
- Muchos eventos entrando al mismo tiempo
- El sistema se degrada bajo carga

Ejemplo realista:

```
1000 envíos activos
+ eventos constantes
+ usuarios observando el sistema
```

👉 MVC **escala mal o se vuelve muy costoso**.

---

## 3️⃣ Cambio de Mentalidad: del Request/Response al Event‑Driven

En sistemas modernos:

> **El backend no espera solicitudes, reacciona a eventos.**

### Diferencia conceptual

- MVC → “Dame datos”
- Reactivo → “Algo pasó”

Ejemplos reales en LogiFlow:
- Un GPS envía una ubicación
- Un operador confirma una entrega
- Un sistema externo reporta un incidente

👉 Eso **no es una petición**, es un **evento del mundo real**.

---

## 4️⃣ ¿Qué es el Modelo Reactivo?

### 🧠 Definición simple

El modelo reactivo permite construir sistemas que:

- No bloquean hilos
- Reaccionan a eventos
- Manejan flujos de datos
- Escalan mejor bajo carga

### Principios clave

1. **Asincronía**  
   El sistema responde cuando el evento llega.

2. **No bloqueante**  
   No se queda esperando respuestas.

3. **Flujos de datos**  
   Se trabaja con streams, no con valores aislados.

4. **Backpressure**  
   El sistema se protege si llegan demasiados eventos.

---

## 5️⃣ Introducción a Mono y Flux (conceptual)

> Aún no programamos, solo entendemos el concepto.

### 🔹 Mono

- Representa **0 o 1 resultado**
- Ejemplos:
  - Consultar un envío por ID
  - Crear un envío

👉 “Puede llegar un resultado… o no”.

---

### 🔹 Flux

- Representa **0 a N resultados**
- Ejemplos:
  - Lista de envíos
  - Historial de tracking
  - Eventos en tiempo real

👉 “Los datos van llegando con el tiempo”.

---

### Analogía simple

- **Mono** → una llamada telefónica
- **Flux** → una emisora de radio

---

## 6️⃣ ¿Qué es WebFlux y qué NO es?

### ❌ Lo que WebFlux NO es

- No es MVC con otro nombre
- No es “Spring más rápido”
- No es solo usar `Mono` y `Flux`

---

### ✅ Lo que WebFlux SÍ es

- Framework diseñado para:
  - Event‑driven
  - No bloqueante
  - Streams
  - Tiempo real

### ¿Por qué WebFlux en LogiFlow?

- Tracking en vivo
- Dashboard reactivo
- Simulación de eventos
- Server‑Sent Events (SSE)

👉 WebFlux **no es una moda**, es una necesidad técnica.

---

## 7️⃣ Relación con la Arquitectura de LogiFlow

En LogiFlow:

- Reactividad → WebFlux
- Reglas → Dominio
- Orquestación → Casos de uso
- Entrada del mundo → Tracking Service
- Salida al frontend → SSE

📌 **Mensaje clave**

> Reactividad sin arquitectura es caos.  
> Arquitectura sin reactividad es lenta.

---

## 8️⃣ Qué NO vamos a hacer (desde esta clase)

❌ CRUD genérico  
❌ Controllers con lógica  
❌ Actualizar envíos directamente  
❌ Backend diseñado solo para el frontend  
❌ Estados sin reglas ni eventos

---

## 9️⃣ Qué SÍ vamos a construir (visión final)

Al finalizar el proyecto:

- El sistema recibe eventos simulados
- El backend reacciona
- Los envíos evolucionan
- El frontend se actualiza solo
- El sistema se siente vivo

---

## 🧠 Frase de Cierre

> **“En LogiFlow no construimos pantallas que piden datos,  
> construimos un sistema que reacciona al mundo.”**

---

## 🔜 Adelanto – Clase 2

- Qué es dominio
- Reglas de negocio
- Estados y transiciones
- Pruebas de dominio
- Arquitectura hexagonal aplicada

---

📄 *Este documento corresponde a la Clase 1 del backend de LogiFlow y sirve como base conceptual para todo el desarrollo posterior.*

