# 🟡 Clase 2 – Dominio y Arquitectura Hexagonal

## Diseñando el corazón del backend antes de exponer la API

---

## 🎯 Objetivo de la Clase

Al finalizar esta clase, el coder será capaz de:

- Comprender **qué es el dominio** y por qué es la parte más importante del backend
- Diferenciar **lógica de negocio** de lógica técnica
- Identificar **reglas de negocio reales** en un sistema logístico
- Modelar **estados y transiciones válidas**
- Entender **Arquitectura Hexagonal (Ports & Adapters)** desde el problema, no desde el framework
- Justificar por qué **las reglas no deben vivir en controllers ni en la base de datos**

> ⚠️ En esta clase **todavía no exponemos APIs**. Primero protegemos el negocio.

---

## 📘 Glosario clave para esta clase

- **Dominio**: conjunto de reglas, conceptos y comportamientos propios del negocio.
- **DDD (Domain-Driven Design)**: enfoque de diseño que pone el dominio en el centro del sistema.
- **Arquitectura Hexagonal (Ports & Adapters)**: estilo arquitectónico que aísla el dominio de detalles externos.
- **Entidad**: objeto del dominio con identidad propia y comportamiento.
- **Caso de Uso**: acción del negocio que orquesta el dominio.
- **Framework**: herramienta técnica (Spring, WebFlux, etc.) que NO debe definir el negocio.

---

## 1️⃣ ¿Qué es el Dominio?

El **dominio** representa:

> **Las reglas, decisiones y comportamientos que hacen que el negocio funcione correctamente.**

El dominio responde preguntas como:

- ¿Qué está permitido y qué no?
- ¿Qué pasa si se viola una regla?
- ¿Cómo evoluciona una entidad en el tiempo?

📌 **Regla fundamental**  
Si mañana cambiamos el framework, la base de datos o el frontend, **el dominio debe seguir funcionando igual**.

---

## 2️⃣ Error común: confundir dominio con base de datos

❌ Error típico:

> “El dominio es la tabla en la base de datos”

### ✅ En realidad:

> “La base de datos es solo una forma de guardar el dominio”

Una **entidad de dominio**:
- Tiene identidad
- Tiene estado
- Tiene comportamiento
- Protege reglas

No es solo un objeto con getters y setters.

---

## 3️⃣ Dominio aplicado a LogiFlow

### Entidad principal: Shipment

Un **Shipment** representa un envío logístico real que **evoluciona en el tiempo**.

### Estados del envío

- CREATED → creado pero no despachado
- IN_TRANSIT → en movimiento
- DELIVERED → entregado
- EXCEPTION → incidente

---

## 4️⃣ Estados y Transiciones (reglas explícitas)

### Transiciones válidas

- CREATED → IN_TRANSIT
- IN_TRANSIT → DELIVERED
- IN_TRANSIT → EXCEPTION

### Transiciones inválidas

- CREATED → DELIVERED
- DELIVERED → cualquier otro estado

📌 Estas reglas **no son opcionales** ni dependen de la UI.

---

## 5️⃣ Reglas de negocio no negociables

En LogiFlow:

- Un envío entregado no puede modificarse
- Un envío en excepción requiere atención
- Todo cambio de estado debe quedar registrado

👉 Si una regla se puede romper desde un controller, **el diseño está mal**.

---

## 6️⃣ ¿Por qué probar el dominio primero?

### 🧪 Pruebas de dominio

Las pruebas de dominio verifican:

- Que las reglas se cumplan
- Que las transiciones inválidas fallen
- Que el negocio esté protegido

📌 Características clave:
- No usan Spring
- No usan WebFlux
- No dependen de infraestructura

Son el **contrato del negocio**.

---

## 7️⃣ ¿Qué es Arquitectura Hexagonal?

La **Arquitectura Hexagonal**, también conocida como **Ports & Adapters**, propone que:

> El dominio no depende de nada externo.

Todo lo externo **depende del dominio**.

---

## 8️⃣ Capas de la Arquitectura Hexagonal

### 🔵 Dominio

Contiene:
- Entidades
- Reglas
- Estados
- Excepciones

📌 No conoce frameworks ni bases de datos.

---

### 🟢 Casos de Uso

Contienen:
- Orquestación del flujo
- Uso del dominio
- Coordinación de puertos

📌 No contienen reglas profundas.

---

### 🟣 Puertos (Ports)

Los **puertos** son contratos (interfaces) que definen:

- Qué necesita el dominio para funcionar
- Qué operaciones espera del mundo externo

Ejemplos:
- Puerto de persistencia
- Puerto de publicación de eventos

---

### 🟠 Adaptadores (Adapters)

Los **adaptadores** conectan el sistema con el mundo externo:

- Controllers (HTTP)
- Repositorios
- Mensajería

📌 Traducen datos externos al lenguaje del dominio.

---

## 9️⃣ Por qué esta arquitectura es clave en LogiFlow

Porque permite:

- Proteger reglas de negocio
- Cambiar tecnología sin romper el sistema
- Facilitar pruebas
- Escalar a microservicios

---

## 🔟 Qué NO vamos a hacer

❌ Lógica en controllers  
❌ Dominio acoplado a frameworks  
❌ Reglas en la base de datos  
❌ Casos de uso tipo CRUD

---

## 🧠 Frase de Cierre

> **“El backend existe para proteger el negocio,  
> no para exponer endpoints.”**

---

📄 *Clase 2 – Dominio y Arquitectura Hexagonal (Explicada). Backend LogiFlow.*

