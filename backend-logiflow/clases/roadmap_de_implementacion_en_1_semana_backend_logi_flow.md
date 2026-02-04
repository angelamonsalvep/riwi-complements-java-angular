# 🧭 Roadmap de Implementación en 1 Semana – Backend LogiFlow

## Ejecución intensiva y enfocada (modo bootcamp / sprint real)

---

## 🎯 Objetivo del Documento

Este documento redefine el roadmap del backend de **LogiFlow** para un **escenario realista de 1 sola semana**, manteniendo:

- arquitectura hexagonal
- backend reactivo
- microservicios
- eventos y SSE

pero **ajustando el alcance** para que sea ejecutable sin sacrificar criterio técnico.

> ⚠️ El objetivo **NO es completar todo**, sino construir un **MVP bien diseñado, coherente y defendible**.

---

## 📘 Principios de Ajuste de Alcance

Para una sola semana:

1. **Menos microservicios, mejor hechos**
2. Dominio fuerte > cantidad de endpoints
3. Lecturas simples (no reportes complejos)
4. Un solo flujo end-to-end funcionando

---

## 🧱 Microservicios incluidos en el MVP (1 semana)

### ✅ CORE (obligatorios)

1. **Shipment Service**  
   - Dominio
   - Estados
   - Casos de uso

2. **Tracking Service**  
   - Entrada de eventos
   - SSE

---

### ⏸️ SOPORTE (alcance reducido)

3. **Customer Service** *(lectura básica)*  
4. **Operations View Service** *(dashboard simple)*

❌ Reports Service → **fuera de alcance**

---

## 🗓️ Plan Diario (Lunes a Viernes)

---

## 🟢 Día 1 – Fundamentos + Setup

### Objetivo
Alinear conceptos y preparar el entorno.

### Actividades

- Repaso Clase 1 y 2
- Creación de repositorios
- Generación de proyectos con scaffold
- Configuración básica

### DoD

- Proyectos compilan
- Estructura correcta

---

## 🟡 Día 2 – Dominio Shipment (CORE)

### Objetivo
Proteger el corazón del negocio.

### Actividades

- Modelar entidad Shipment
- Definir estados y transiciones
- Implementar reglas de dominio
- Escribir pruebas de dominio

### DoD

- Transiciones inválidas fallan
- Pruebas de dominio en verde

---

## 🔵 Día 3 – Casos de Uso + Tracking

### Objetivo
Conectar el mundo externo con el dominio.

### Actividades

- Casos de uso reactivos
- Endpoint de entrada de eventos
- Emisión de eventos de dominio

### DoD

- Eventos procesados correctamente

---

## 🟣 Día 4 – SSE + Frontend

### Objetivo
Ver el sistema vivo.

### Actividades

- Implementar SSE
- Conectar frontend Angular
- Visualizar cambios en tiempo real

### DoD

- Dashboard se actualiza sin refresh

---

## 🔴 Día 5 – Simulación y Estabilización

### Objetivo
Validar el sistema completo.

### Actividades

- Implementar simulador simple
- Ejecutar carga básica
- Ajustar flujos reactivos

### DoD

- Sistema estable
- SSE no colapsa

---

## 🏁 Resultado Final Esperado

Al finalizar la semana:

- Backend reactivo funcional
- Dominio protegido
- Eventos fluyendo
- Frontend actualizado en tiempo real
- Arquitectura defendible

---

## 🧠 Frase de Cierre

> **“No se trata de hacer todo, sino de hacer bien lo importante.”**

---

📄 *Roadmap intensivo de 1 semana – Backend LogiFlow.*

