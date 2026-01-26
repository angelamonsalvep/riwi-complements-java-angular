# 🚚 LogiFlow – Backend

## Backend Reactivo orientado a eventos (MVP – 1 semana)

---

## 🎯 Propósito del Backend

Este repositorio define el **backend del producto LogiFlow**, una plataforma de gestión logística diseñada para **operar en tiempo real**, reaccionar a eventos del mundo real y alimentar un **dashboard operativo en Angular**.

El objetivo principal del backend es:

- Proteger las **reglas del negocio logístico**
- Procesar eventos de forma **reactiva y no bloqueante**
- Emitir cambios en tiempo real hacia el frontend
- Servir como ejercicio formativo avanzado en arquitectura backend

> ⚠️ Este backend se desarrolla como un **MVP intensivo de 1 semana**, priorizando calidad de diseño sobre cantidad de funcionalidades.

---

## 🧠 Contexto del Producto

**LogiFlow** representa un sistema logístico B2B donde:

- Los envíos cambian de estado en el tiempo
- Llegan eventos externos (ubicación, incidentes)
- Los usuarios observan el sistema en tiempo real

El backend **no es pasivo**: reacciona constantemente a eventos.

---

## 🧱 Arquitectura General

El backend está diseñado con los siguientes principios:

- **Arquitectura Hexagonal (Clean Architecture)**
- **Backend Reactivo** usando Spring WebFlux
- **Event-Driven Architecture**
- **Microservicios**

### Capas principales

- **Domain** → reglas del negocio
- **Use Cases** → orquestación
- **Infrastructure** → controllers, DB, SSE

El dominio **no depende de frameworks ni bases de datos**.

---

## 🧩 Microservicios del MVP (1 semana)

### 🚚 Shipment Service (CORE)

Responsable de:
- Ciclo de vida del envío
- Estados y transiciones
- Emisión de eventos de dominio

---

### 📍 Tracking Service (CORE)

Responsable de:
- Recepción de eventos externos
- Procesamiento reactivo
- Exposición de **Server-Sent Events (SSE)**

---

### 👥 Customer Service (alcance reducido)

- Lectura básica de clientes

---

### 📊 Operations View Service (alcance reducido)

- KPIs y datos para dashboard

---

## 📡 Comunicación por Eventos

El backend funciona sobre eventos como:

- `ShipmentCreated`
- `ShipmentStatusChanged`
- `LocationUpdated`

Estos eventos:
- Representan hechos del negocio
- Son inmutables
- Alimentan SSE hacia el frontend

---

## 🌐 Relación con el Frontend

El frontend Angular:

- **No hace polling**
- Se suscribe a eventos vía **SSE**
- Refleja cambios en tiempo real

Esto permite:
- Dashboards vivos
- Menor carga
- Mejor experiencia de usuario

---

## 🛠️ Herramientas y Estándares

- Java + Spring WebFlux
- Scaffold Clean Architecture (Bancolombia)
- Arquitectura Hexagonal
- Programación Reactiva

---

## 🧪 Calidad y Pruebas

El backend incluye:

- Pruebas de dominio (reglas)
- Pruebas de casos de uso
- Pruebas reactivas
- Escenarios de carga y estrés

> Si no está probado, no se considera terminado.

---

## 🧭 Roadmap de Ejecución

El desarrollo sigue un **roadmap intensivo de 1 semana**, priorizando:

- Dominio fuerte
- Flujo end-to-end funcional
- Estabilidad sobre volumen

---

## 🏁 Resultado Esperado

Al finalizar la semana:

- Backend reactivo funcional
- Dominio protegido
- Eventos fluyendo
- Frontend actualizado en tiempo real
- Arquitectura defendible

---

## 🧠 Nota Final

> **Este proyecto no busca solo que el sistema funcione, sino que pueda crecer sin romperse.**

---

📄 *README oficial – Backend LogiFlow*

