# 🔵 Clase 3 – Casos de Uso Reactivos y Eventos (Explicada)

## Del dominio protegido a un sistema vivo en tiempo real

---

## 🎯 Objetivo de la Clase

Al finalizar esta clase, el coder será capaz de:

- Comprender **qué es un caso de uso** y por qué no es un CRUD
- Diferenciar **evento de dominio** vs **evento técnico**
- Entender cómo los **casos de uso conectan el dominio con el mundo externo**
- Comprender qué significa que un sistema sea **event-driven (orientado a eventos)**
- Entender **Server-Sent Events (SSE)** y por qué se usan en LogiFlow
- Visualizar el **flujo completo** desde un evento hasta el frontend

> ⚠️ En esta clase conectamos todo lo aprendido: dominio + reactividad + arquitectura.

---

## 📘 Glosario clave para esta clase

- **Caso de Uso**: acción del negocio que coordina dominio e infraestructura.
- **Evento**: representación de un hecho que ya ocurrió.
- **Evento de Dominio**: hecho relevante para el negocio.
- **Evento Técnico**: evento usado solo para infraestructura o comunicación.
- **Event-Driven**: estilo donde el sistema reacciona a eventos.
- **SSE (Server-Sent Events)**: mecanismo donde el servidor envía eventos al cliente de forma continua.
- **Stream**: flujo continuo de datos en el tiempo.

---

## 1️⃣ ¿Qué es realmente un Caso de Uso?

Un **caso de uso** representa:

> **Una intención del negocio expresada como una acción.**

Ejemplos correctos en LogiFlow:

- Crear un envío
- Cambiar el estado de un envío
- Registrar un evento de tracking

Ejemplos incorrectos:

- Guardar un envío
- Actualizar una tabla
- Llamar un repositorio

👉 El caso de uso **habla el lenguaje del negocio**, no el técnico.

---

## 2️⃣ Responsabilidad de un Caso de Uso

Un caso de uso:

- Orquesta el flujo
- Invoca entidades del dominio
- Aplica reglas de alto nivel
- Usa puertos para comunicarse con el exterior

Un caso de uso **NO**:

- Contiene reglas profundas (eso es del dominio)
- Conoce HTTP, JSON o frameworks
- Maneja detalles de persistencia

---

## 3️⃣ Casos de Uso en Arquitectura Hexagonal

Ubicación conceptual:

```
Controller (Adapter)
        ↓
Caso de Uso
        ↓
Dominio
        ↓
Evento
```

📌 El controller **solo traduce la entrada** y delega.

---

## 4️⃣ ¿Por qué los Casos de Uso deben ser Reactivos?

Porque en LogiFlow:

- Los eventos llegan de forma asíncrona
- Hay múltiples fuentes de información
- El sistema no puede bloquearse

👉 Por eso los casos de uso retornan **Mono** o **Flux**.

---

## 5️⃣ Eventos: el corazón del sistema

### 🧠 ¿Qué es un Evento?

Un evento representa:

> **Algo importante que ya ocurrió y no se puede deshacer.**

Ejemplos:

- Envío creado
- Ubicación actualizada
- Envío entregado

Un evento:
- Es inmutable
- Tiene fecha y contexto
- Representa un hecho

---

## 6️⃣ Evento de Dominio vs Evento Técnico

### 🔹 Evento de Dominio

- Representa un hecho del negocio
- Tiene significado para otros sistemas
- Ejemplo: `ShipmentDelivered`

---

### 🔹 Evento Técnico

- Ayuda a la comunicación
- No tiene significado de negocio
- Ejemplo: `HttpRequestReceived`

📌 **No mezclar estos conceptos** es clave para un buen diseño.

---

## 7️⃣ Flujo real de LogiFlow (de punta a punta)

```
Mundo externo / Simulador
        ↓
Tracking Service
        ↓ (evento técnico)
Caso de Uso
        ↓
Dominio valida reglas
        ↓
Evento de Dominio
        ↓
SSE / Dashboard / Reports
        ↓
Frontend se actualiza
```

👉 El frontend **observa**, no controla el sistema.

---

## 8️⃣ ¿Qué es Server-Sent Events (SSE)?

**Server-Sent Events (SSE)** es un mecanismo donde:

- El cliente abre una conexión HTTP
- El servidor envía eventos continuamente
- El cliente no tiene que hacer polling

### ¿Por qué SSE y no polling?

- Menor consumo de recursos
- Datos en tiempo real
- Arquitectura más limpia

---

## 9️⃣ SSE aplicado a LogiFlow

En LogiFlow, SSE se usa para:

- Actualizar el mapa de tracking
- Cambiar estados visuales
- Refrescar métricas del dashboard

👉 Todo **sin recargar la página**.

---

## 🔟 Qué NO vamos a hacer

❌ Casos de uso tipo CRUD  
❌ Eventos usados como logs  
❌ Frontend orquestando reglas  
❌ Polling constante desde la UI

---

## 🧠 Frase de Cierre

> **“Los casos de uso conectan el negocio con el mundo.  
> Los eventos hacen que el sistema reaccione.”**

---

## 🧭 Cierre de la Semana

Al finalizar esta semana:

- El dominio está protegido
- Los casos de uso orquestan el negocio
- El sistema reacciona a eventos
- El frontend refleja cambios en tiempo real

---

📄 *Clase 3 – Casos de Uso Reactivos y Eventos (Explicada). Backend LogiFlow.*

