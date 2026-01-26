# 🧪 Checklist de Pruebas por Microservicio – LogiFlow

## Documento de Calidad y Validación del Backend

---

## 🎯 Objetivo del Documento

Este documento define **qué pruebas son obligatorias** para cada microservicio del backend de LogiFlow.

Su propósito es:

- Garantizar que las **reglas de negocio estén protegidas**
- Evitar backends que solo "responden" pero no validan
- Alinear a todos los coders con **criterios de calidad claros**
- Servir como **base de evaluación técnica** del proyecto

> ⚠️ Si una prueba de este checklist no existe, el microservicio **no se considera terminado**.

---

## 📘 Glosario esencial

- **Prueba de Dominio**: valida reglas del negocio sin frameworks.
- **Prueba de Caso de Uso**: valida flujos del negocio.
- **Prueba de Integración**: valida interacción con adaptadores.
- **Prueba Reactiva**: valida flujos `Mono` y `Flux`.
- **Backpressure**: capacidad del sistema para protegerse ante sobrecarga.

---

## 🧱 Tipos de Pruebas (visión general)

| Tipo de prueba | Qué valida |
|--------------|------------|
| Dominio | Reglas y estados |
| Casos de Uso | Orquestación |
| Integración | Adapters |
| Reactivas | Flujos y streams |

---

## 🚚 Shipment Service – Checklist

### ✅ Pruebas de Dominio (OBLIGATORIAS)

- Crear envío con estado inicial válido
- No permitir transiciones inválidas
- No permitir modificar envío entregado
- Emitir evento al cambiar estado

👉 Estas pruebas **no usan Spring ni WebFlux**.

---

### ✅ Pruebas de Casos de Uso

- Crear envío correctamente
- Cambiar estado válido
- Fallar en cambio de estado inválido
- Emitir evento de dominio

---

### ✅ Pruebas Reactivas

- `Mono` completa correctamente
- `Mono` emite error cuando aplica
- No hay bloqueos

---

## 📍 Tracking Service – Checklist

### ✅ Pruebas de Dominio

- Registrar evento de tracking válido
- Rechazar eventos inconsistentes

---

### ✅ Pruebas de Casos de Uso

- Procesar evento externo
- Emitir evento de dominio

---

### ✅ Pruebas de Streams (SSE)

- Stream emite eventos en orden
- Stream no se cierra inesperadamente
- Múltiples clientes pueden conectarse

---

## 👥 Customer Service – Checklist

### ✅ Pruebas de Dominio

- Crear cliente válido
- No permitir clientes duplicados

---

### ✅ Pruebas de Casos de Uso

- Asociar envíos a cliente
- Consultar clientes con envíos

---

## 📊 Operations View Service – Checklist

### ✅ Pruebas de Integración

- Dashboard devuelve KPIs
- Resumen consistente con eventos

📌 No requiere pruebas de dominio.

---

## 📈 Reports Service – Checklist

### ✅ Pruebas de Integración

- Reportes reflejan datos históricos
- Exportación funciona correctamente

---

## ⚙️ Configuration Service – Checklist

### ✅ Pruebas Básicas

- Obtener configuración
- Actualizar configuración

---

## 🚦 Criterios de Aprobación

Un microservicio se considera **aprobado** si:

- Todas las pruebas del checklist existen
- Las pruebas pasan en verde
- No hay lógica en controllers
- El dominio está cubierto

---

## 🧠 Frase de Cierre

> **“Si no está probado, no existe.”**

---

📄 *Checklist oficial de pruebas para el backend de LogiFlow.*

