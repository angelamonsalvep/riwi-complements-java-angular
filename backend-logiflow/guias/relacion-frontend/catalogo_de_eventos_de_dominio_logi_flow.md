# 📡 Catálogo de Eventos de Dominio – LogiFlow

## Documento Arquitectónico – Event-Driven Backend

---

## 🎯 Objetivo del Documento

Este documento define **todos los eventos de dominio del backend de LogiFlow**, su propósito y cómo conectan los microservicios con el frontend.

Su objetivo es:

- Establecer un **lenguaje común** entre backend y frontend
- Evitar eventos improvisados o inconsistentes
- Servir como **contrato arquitectónico** del sistema orientado a eventos
- Guiar la implementación de **casos de uso, SSE y simuladores**

> ⚠️ Este documento describe **eventos del negocio**, no eventos técnicos de infraestructura.

---

## 📘 Glosario esencial

- **Evento**: representación de un hecho que ya ocurrió.
- **Evento de Dominio**: hecho relevante para el negocio que otros sistemas pueden reaccionar.
- **Productor del evento**: microservicio que emite el evento.
- **Consumidor del evento**: microservicio o frontend que reacciona al evento.
- **Event-driven**: arquitectura donde el sistema reacciona a eventos.

---

## 🧠 Principios de Diseño de Eventos

Todo evento de dominio en LogiFlow cumple estas reglas:

1. Representa un **hecho pasado**
2. Es **inmutable** (no se modifica)
3. Tiene significado de negocio
4. Puede ser entendido sin contexto técnico
5. No depende de frameworks

Ejemplo correcto:

> `ShipmentDelivered`

Ejemplo incorrecto:

> `UpdateShipmentStatus`

---

## 🚚 Eventos del Dominio Shipment

### 🔹 ShipmentCreated

**Descripción**  
Se emite cuando un envío ha sido creado correctamente.

**Productor**  
Shipment Service

**Consumidores**  
- Tracking Service
- Operations View Service
- Reports Service

**Payload conceptual**
```json
{
  "shipmentId": "LGF-001",
  "customerId": "CUST-123",
  "origin": "Bogotá",
  "destination": "Medellín",
  "createdAt": "2026-01-26T10:00:00Z"
}
```

---

### 🔹 ShipmentStatusChanged

**Descripción**  
Se emite cuando un envío cambia de estado de forma válida.

**Productor**  
Shipment Service

**Consumidores**  
- Tracking Service
- Operations View Service
- Frontend (SSE)

**Payload conceptual**
```json
{
  "shipmentId": "LGF-001",
  "previousStatus": "IN_TRANSIT",
  "newStatus": "DELIVERED",
  "changedAt": "2026-01-26T14:30:00Z"
}
```

---

## 📍 Eventos del Dominio Tracking

### 🔹 LocationUpdated

**Descripción**  
Se emite cuando se recibe una nueva ubicación de un envío.

**Productor**  
Tracking Service

**Consumidores**  
- Operations View Service
- Frontend (SSE)

**Payload conceptual**
```json
{
  "shipmentId": "LGF-001",
  "latitude": 4.7110,
  "longitude": -74.0721,
  "timestamp": "2026-01-26T14:10:00Z"
}
```

---

### 🔹 TrackingIncidentReported

**Descripción**  
Se emite cuando ocurre un incidente durante el transporte.

**Productor**  
Tracking Service

**Consumidores**  
- Shipment Service
- Operations View Service

**Payload conceptual**
```json
{
  "shipmentId": "LGF-001",
  "incidentType": "DELAY",
  "description": "Retraso por clima",
  "reportedAt": "2026-01-26T13:45:00Z"
}
```

---

## 👥 Eventos del Dominio Customer

### 🔹 CustomerCreated

**Descripción**  
Se emite cuando un cliente es creado en el sistema.

**Productor**  
Customer Service

**Consumidores**  
- Shipment Service
- Reports Service

**Payload conceptual**
```json
{
  "customerId": "CUST-123",
  "name": "Empresa XYZ",
  "createdAt": "2026-01-26T09:00:00Z"
}
```

---

## 📊 Uso de Eventos en el Frontend

El frontend **NO consulta constantemente el backend**.

En su lugar:

- Se suscribe a eventos vía **Server-Sent Events (SSE)**
- Reacciona a:
  - Cambios de estado
  - Nuevas ubicaciones
  - Incidentes

Esto permite:
- Interfaces en tiempo real
- Menor carga
- Mejor experiencia de usuario

---

## 🧪 Eventos y Simulación

Los eventos definidos en este documento:

- Pueden ser generados por simuladores
- Se usan para pruebas funcionales
- Son base para pruebas de carga y estrés

---

## 🔟 Qué NO son eventos de dominio

❌ Logs  
❌ Requests HTTP  
❌ Cambios internos de infraestructura  
❌ Acciones técnicas sin significado de negocio

---

## 🧠 Frase de Cierre

> **“Los eventos cuentan la historia del sistema.  
> Si no existen, el negocio no se puede entender.”**

---

📄 *Catálogo oficial de eventos de dominio – Backend LogiFlow.*

