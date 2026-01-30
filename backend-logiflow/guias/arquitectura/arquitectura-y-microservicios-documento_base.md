# LogiFlow – Backend

## 📌 Documento Base de Arquitectura y Microservicios

Este documento define el **resultado final esperado del backend de LogiFlow**. Su propósito es servir como **punto de partida único** para los coders backend, alineando decisiones de arquitectura, responsabilidades y contratos técnicos.

> ⚠️ Este documento **no describe pasos de implementación**, sino **cómo debe verse el backend al finalizar el desarrollo**.

---

## 🎯 Objetivo del Backend

Construir un **backend reactivo**, basado en **arquitectura hexagonal** y **microservicios**, capaz de modelar un sistema logístico real donde:

- El dominio protege las reglas de negocio
- Los envíos evolucionan a través de eventos
- El sistema es reactivo y no bloqueante
- El frontend reacciona a cambios en tiempo real

El backend **no es un CRUD** ni está diseñado en función de las vistas, sino de los **subdominios reales del negocio**.

---

## 🧠 Principios Arquitectónicos

Las siguientes reglas gobiernan todo el desarrollo:

1. **Microservicio = subdominio del negocio**
2. **Dominio primero** (el framework no decide el diseño)
3. **Arquitectura hexagonal dentro de cada microservicio**
4. **Programación reactiva end-to-end**
5. **Eventos antes que actualizaciones directas**
6. **El frontend nunca orquesta reglas de negocio**

---

## 🧱 Arquitectura General

### 🔷 Estilo

- Microservicios independientes
- Arquitectura Hexagonal (Ports & Adapters)
- Programación reactiva (WebFlux)
- Comunicación orientada a eventos

### 🔷 Scaffold

Cada microservicio se genera utilizando el **Scaffold Clean Architecture de Bancolombia**, respetando la separación:

- Domain
- Use Cases
- Ports
- Adapters (entrypoints / driven adapters)

---

## 🧩 Clasificación de Microservicios

### 🔵 Microservicios CORE (Dominio fuerte)

Estos servicios contienen reglas de negocio reales:

- Shipment Service
- Tracking Service
- Customer Service

### 🟡 Microservicios de SOPORTE (Dominio débil o inexistente)

Estos servicios existen para facilitar visualización, análisis o configuración:

- Operations View Service (Dashboard / Query / BFF)
- Reports Service
- Configuration Service

---

## 🚚 Shipment Service (CORE)

### Responsabilidad
Gestionar el **ciclo de vida de los envíos**, protegiendo estados y transiciones válidas.

### Reglas clave
- Un envío tiene estados definidos
- No todas las transiciones están permitidas
- Un envío entregado no puede modificarse
- Cada cambio de estado emite un evento

### Endpoints

```http
POST   /shipments
GET    /shipments
GET    /shipments/{id}
PATCH  /shipments/{id}/status
GET    /shipments/{id}/summary
```

---

## 📍 Tracking Service (CORE – Reactivo)

### Responsabilidad
Gestionar **eventos de tracking** provenientes del mundo externo y exponerlos en tiempo real.

### Características
- Event-driven
- WebFlux obligatorio
- Server-Sent Events (SSE)

### Endpoints

```http
POST /tracking/events
GET  /tracking/shipments/{shipmentId}/history
GET  /tracking/shipments/{shipmentId}/current
GET  /tracking/stream/{shipmentId}
```

---

## 👥 Customer Service (CORE)

### Responsabilidad
Gestionar información de clientes y su relación con los envíos.

### Endpoints

```http
POST /customers
GET  /customers
GET  /customers/{id}
GET  /customers/{id}/shipments
GET  /customers/summary
```

---

## 📊 Operations View Service (SOPORTE)

### Responsabilidad
Exponer **modelos de lectura optimizados** para el frontend (dashboard y vistas operativas).

> Este servicio **no contiene reglas de negocio**.

### Endpoints

```http
GET /operations/dashboard/kpis
GET /operations/dashboard/summary
GET /operations/dashboard/recent-shipments
GET /operations/dashboard/shipments-by-status
GET /operations/last-updated
```

---

## 📈 Reports Service (SOPORTE)

### Responsabilidad
Generar reportes operativos e históricos del sistema.

### Endpoints

```http
GET /reports/operational
GET /reports/shipments
GET /reports/customers
GET /reports/export
```

---

## ⚙️ Configuration Service (SOPORTE)

### Responsabilidad
Gestionar configuraciones generales del sistema.

### Endpoints

```http
GET   /settings
PATCH /settings
```

---

## 🔄 Flujo de Actualización de Envíos (Visión Final)

1. Eventos llegan desde sistemas externos o simuladores
2. Tracking Service recibe el evento
3. Shipment Service valida reglas y cambia estado
4. Se emiten eventos de dominio
5. El frontend se actualiza vía SSE

---

## 🧪 Consideraciones de Calidad

El backend final debe:

- Tener dominio probado con tests unitarios
- Tener casos de uso reactivos
- Soportar simulación de eventos
- Permitir pruebas de carga y estrés
- Mantener separación estricta de capas

---

## 🧭 Resultado Final Esperado

Al finalizar el desarrollo:

- El sistema reacciona a eventos simulados
- El dashboard se actualiza automáticamente
- El tracking se mueve en tiempo real
- Las reglas de negocio no se pueden romper
- El backend puede crecer sin reescribirse

---

> **Este documento es el contrato arquitectónico del backend de LogiFlow.**

Cualquier decisión de implementación debe respetar lo aquí definido.

