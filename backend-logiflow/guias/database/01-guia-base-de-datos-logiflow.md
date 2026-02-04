# 📊 Decisión de Base de Datos – LogiFlow

## 🎯 Objetivo del Documento
Este documento describe y justifica la **elección del tipo de base de datos** para el backend del producto **LogiFlow**, teniendo en cuenta el contexto del negocio, los flujos operativos y las buenas prácticas de arquitectura de software modernas.

---

## 🧠 Contexto del Producto – LogiFlow
LogiFlow es una plataforma de gestión logística orientada a operaciones que permite:
- Gestionar envíos (shipments)
- Actualizar y consultar estados
- Realizar tracking
- Visualizar métricas operativas
- Consultar clientes y reportes

Desde el punto de vista arquitectónico es:
- Un sistema operacional
- Orientado a eventos
- Con alta frecuencia de lectura
- Con cambios de estado constantes

---

## 🧱 Tipos de Bases de Datos Evaluadas

### 🟦 Bases de Datos Relacionales (SQL)
**Ejemplos:** PostgreSQL, MySQL

**Ventajas**
- Transacciones ACID
- Integridad referencial
- SQL potente

**Desventajas para LogiFlow**
- Modelo rígido para eventos
- Uso intensivo de JOINs
- Menor flexibilidad ante cambios

---

### 🟩 Bases de Datos NoSQL (Documentales)
**Ejemplos:** MongoDB, DynamoDB

**Ventajas**
- Modelo flexible
- Representación natural de Shipments
- Ideal para estados y tracking
- Escalabilidad horizontal
- Menor fricción ante cambios

**Consideraciones**
- No usa JOINs tradicionales
- Reporting avanzado requiere procesamiento adicional

---

## 📦 Ejemplo de Modelo Shipment (MongoDB)

```json
{
  "_id": "SHP-123",
  "origin": "Bogotá",
  "destination": "Medellín",
  "status": "IN_TRANSIT",
  "customerId": "C-789",
  "events": [
    { "type": "CREATED", "at": "2026-01-20T10:00" },
    { "type": "DISPATCHED", "at": "2026-01-21T08:30" }
  ],
  "lastUpdated": "2026-01-21T08:30"
}
```

---

## ✅ Decisión Final
Para LogiFlow se elige **MongoDB (NoSQL)** como base de datos principal, debido a que:
- El dominio está centrado en estados y eventos
- Se prioriza flexibilidad y escalabilidad
- El sistema es operacional, no financiero

---

## 🧩 Arquitectura Híbrida

| Microservicio        | Base de Datos |
|----------------------|---------------|
| shipment-service     | MongoDB       |
| tracking-service     | MongoDB       |
| events-service       | MongoDB       |
| customers-service    | PostgreSQL    |
| reports-service      | PostgreSQL    |

---

## 🚀 Conclusión
MongoDB permite que LogiFlow evolucione como un producto moderno, escalable y alineado al negocio logístico, sin comprometer la arquitectura hexagonal ni el dominio.
