# 🟡 Clase 2 – Dominio y Arquitectura Hexagonal

## Diseñando el corazón del backend antes de exponer la API

---

## 🎯 Objetivo de la Clase

Al finalizar esta clase, el coder será capaz de:

- Entender **qué es el dominio** y por qué es el núcleo del sistema
- Identificar **reglas de negocio reales** en un contexto logístico
- Modelar **estados y transiciones válidas**
- Comprender **arquitectura hexagonal (Ports & Adapters)**
- Diseñar el backend para que **las reglas no se puedan romper**

> ⚠️ En esta clase **todavía no exponemos APIs**. Primero protegemos el negocio.

---

## 1️⃣ ¿Qué es el Dominio?

El dominio representa:

> **Las reglas, conceptos y comportamientos que hacen que el negocio funcione.**

En LogiFlow, el dominio responde preguntas como:

- ¿Qué es un envío?
- ¿Qué estados puede tener?
- ¿Cuándo puede cambiar de estado?
- ¿Qué está permitido y qué no?

📌 **Regla fundamental**  
Si mañana cambiamos Spring, la base de datos o el frontend, **el dominio debe seguir teniendo sentido**.

---

## 2️⃣ Error común: confundir dominio con entidad

❌ Error típico:

```text
Shipment = tabla en base de datos
```

### ✅ En realidad:

```text
Shipment = concepto del negocio
```

Una entidad de dominio:
- Tiene estado
- Tiene comportamiento
- Protege reglas

No es solo un contenedor de datos.

---

## 3️⃣ El Dominio en LogiFlow

### Entidad principal: Shipment

Un **Shipment** representa un envío logístico que evoluciona en el tiempo.

### Estados esperados

- CREATED
- IN_TRANSIT
- DELIVERED
- EXCEPTION

### Pregunta clave

> ¿Puede un envío pasar directamente de CREATED a DELIVERED?

👉 **No**, esa es una regla del dominio.

---

## 4️⃣ Estados y Transiciones

### Transiciones válidas

- CREATED → IN_TRANSIT
- IN_TRANSIT → DELIVERED
- IN_TRANSIT → EXCEPTION

### Transiciones inválidas

- CREATED → DELIVERED
- DELIVERED → cualquier otro estado

📌 Estas reglas **no deben validarse en el controller**.

---

## 5️⃣ Reglas no negociables del dominio

En LogiFlow:

- Un envío entregado no puede modificarse
- Un envío en excepción requiere atención
- Todo cambio de estado debe quedar registrado

👉 Si una regla se rompe, **el sistema está mal diseñado**.

---

## 6️⃣ Pruebas de Dominio (antes que la API)

### ¿Por qué probar el dominio primero?

Porque:
- El dominio es la parte más importante
- Los endpoints cambian, las reglas no
- Las pruebas actúan como contrato del negocio

### Qué se prueba

- Cambios de estado válidos
- Errores en transiciones inválidas
- Comportamiento del dominio

📌 Estas pruebas **NO usan Spring**.

---

## 7️⃣ Arquitectura Hexagonal (Ports & Adapters)

### 🧠 Idea central

> El dominio no depende de nada externo.

Todo lo externo **depende del dominio**.

---

## 8️⃣ Capas de la Arquitectura Hexagonal

### 🔵 Dominio

- Entidades
- Reglas
- Estados
- Excepciones

📌 No conoce frameworks.

---

### 🟢 Casos de Uso

- Orquestan acciones del negocio
- Usan el dominio
- Coordinan puertos

📌 No contienen reglas profundas.

---

### 🟣 Puertos

- Contratos
- Interfaces
- Entrada y salida del sistema

📌 Definen qué necesita el dominio.

---

### 🟠 Adapters

- Controllers
- Repositorios
- Mensajería

📌 Traducen el mundo externo al dominio.

---

## 9️⃣ ¿Por qué esta arquitectura en LogiFlow?

Porque:

- Protege reglas de negocio
- Permite eventos
- Facilita pruebas
- Escala con microservicios
- Evita acoplamientos

---

## 🔟 Qué NO vamos a hacer

❌ Lógica en controllers  
❌ Dominio acoplado a Spring  
❌ Reglas en la base de datos  
❌ Casos de uso tipo CRUD  

---

## 🧠 Frase de Cierre

> **“El backend existe para proteger el negocio,  
> no para exponer endpoints.”**

---

## 🔜 Adelanto – Clase 3

- Casos de uso reactivos
- Eventos de dominio
- Streams en tiempo real
- Integración con frontend

---

📄 *Este documento corresponde a la Clase 2 del backend de LogiFlow y define el corazón del sistema antes de exponer la API.*

