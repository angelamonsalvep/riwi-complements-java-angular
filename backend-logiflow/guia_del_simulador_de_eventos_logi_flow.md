# 🛠️ Guía del Simulador de Eventos – LogiFlow

## Cómo hacer que el backend y el frontend cobren vida

---

## 🎯 Objetivo del Documento

Este documento explica **qué es un simulador de eventos**, por qué es necesario en LogiFlow y cómo debe comportarse.

Su propósito es:

- Simular el **mundo real** (GPS, operadores, sistemas externos)
- Alimentar el backend con **eventos realistas**
- Permitir ver **actualizaciones en tiempo real en el frontend**
- Servir como base para **pruebas funcionales, de carga y de estrés**

> ⚠️ El simulador **NO es el frontend** ni un CRUD manual.

---

## 📘 Glosario esencial

- **Simulador de eventos**: componente que genera eventos como si vinieran del mundo real.
- **Evento externo**: evento que entra al sistema desde fuera del dominio.
- **Fuente del evento**: origen del evento (GPS, operador, sistema).
- **SSE (Server-Sent Events)**: canal por el cual el backend empuja eventos al frontend.

---

## 1️⃣ ¿Por qué necesitamos un simulador?

En sistemas logísticos reales:

- Los eventos NO los genera el frontend
- Llegan desde múltiples fuentes externas
- Son constantes y asíncronos

En LogiFlow no tenemos:
- GPS reales
- Integraciones reales

👉 El simulador **reemplaza temporalmente al mundo real**.

---

## 2️⃣ Qué NO es un simulador

❌ Un formulario para cambiar estados  
❌ Un botón en la UI para “forzar datos”  
❌ Un script que edita la base de datos  

El simulador **envía eventos**, no modifica entidades.

---

## 3️⃣ Qué SÍ hace un simulador de eventos

Un simulador:

- Genera eventos válidos según el catálogo
- Envía eventos al backend
- Respeta tiempos y secuencias
- Puede generar carga

---

## 4️⃣ Punto de entrada del simulador

Todos los eventos entran por:

```http
POST /tracking/events
```

Este endpoint representa:
- GPS
- Operadores
- Sistemas externos

📌 El backend **no sabe** si el evento es simulado o real.

---

## 5️⃣ Tipos de eventos a simular

### 📍 Eventos de ubicación

- LOCATION_UPDATED
- Coordenadas progresivas
- Intervalos de tiempo

---

### 🚚 Eventos de estado

- SHIPMENT_DISPATCHED
- SHIPMENT_DELIVERED

---

### ⚠️ Eventos de incidente

- DELAY
- DAMAGE
- ROUTE_CHANGE

---

## 6️⃣ Ejemplo de evento simulado

```json
{
  "shipmentId": "LGF-001",
  "type": "LOCATION_UPDATED",
  "latitude": 4.7110,
  "longitude": -74.0721,
  "timestamp": "2026-01-26T14:10:00Z",
  "source": "SIMULATOR"
}
```

---

## 7️⃣ Flujo completo con simulador

```
Simulador
   ↓
Tracking Service
   ↓
Caso de Uso
   ↓
Dominio valida reglas
   ↓
Evento de Dominio
   ↓
SSE
   ↓
Frontend se actualiza
```

👉 Este flujo es **idéntico al de producción**.

---

## 8️⃣ Formas de implementar el simulador

### 🟢 Opción 1 – Script externo (recomendada)

- Script en Node.js, Python o Java
- Envía eventos periódicamente
- Fácil de controlar

---

### 🟡 Opción 2 – Job interno

- Proceso programado dentro del backend
- Útil para demos automáticas

---

### 🔵 Opción 3 – Endpoint de simulación (solo formativo)

- Endpoint exclusivo para pruebas
- No debe existir en producción

---

## 9️⃣ Simulador y Frontend

Gracias al simulador:

- El mapa se mueve solo
- Los estados cambian
- El dashboard se actualiza

Sin recargar la página.

---

## 🔟 Simulación y pruebas

El simulador permite:

- Pruebas funcionales
- Pruebas de carga
- Pruebas de estrés

Todo usando **los mismos eventos**.

---

## 🧠 Frase de Cierre

> **“No simulamos pantallas, simulamos el mundo.”**

---

📄 *Guía oficial del simulador de eventos – Backend LogiFlow.*

