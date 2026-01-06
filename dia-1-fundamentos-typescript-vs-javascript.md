# 📘 Día 1 — Fundamentos de TypeScript y Diferencias con JavaScript

**Duración:** 3 horas  
**Nivel:** Inicial  
**Modalidad:** Teórico–Práctica  
**Contexto:** Base técnica para Angular y desarrollo frontend profesional

---

## 🎯 Objetivo de la clase

Comprender **qué es TypeScript**, por qué surge como evolución de JavaScript y **qué problemas reales soluciona en la industria**, identificando las principales diferencias entre ambos lenguajes y aplicando los fundamentos básicos de TypeScript.

Al finalizar la clase, el coder será capaz de:
- Entender la relación entre JavaScript y TypeScript
- Identificar ventajas de TypeScript en proyectos reales
- Usar tipos básicos, funciones tipadas e interfaces
- Reconocer errores en tiempo de desarrollo
- Comprender por qué Angular está construido sobre TypeScript

---

## 🧠 Contexto de Industria

JavaScript es flexible, pero en aplicaciones grandes puede generar:
- Errores solo visibles en ejecución
- Código difícil de mantener
- Falta de contratos claros entre equipos

👉 **TypeScript nace para resolver estos problemas**, manteniendo compatibilidad total con JavaScript.

---

## 📚 ¿Qué es JavaScript?

- Lenguaje interpretado
- Tipado dinámico
- Muy flexible
- Estándar en navegadores

```js
let age = 25;
age = "veinticinco"; // permitido
```

---

## 📘 ¿Qué es TypeScript?

- Superset de JavaScript
- Tipado estático
- Se transpila a JavaScript
- Detecta errores antes de ejecutar

```ts
let age: number = 25;
age = "veinticinco"; // Error de tipado
```

---

## 🆚 JavaScript vs TypeScript

| Característica | JavaScript | TypeScript |
|---------------|------------|------------|
| Tipado | Dinámico | Estático |
| Errores | Runtime | Desarrollo |
| Escalabilidad | Media | Alta |
| Uso en Angular | No | Sí |

---

## 🔤 Tipos básicos

```ts
let name: string = "Angela";
let age: number = 30;
let active: boolean = true;
```

---

## 🔧 Funciones tipadas

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

---

## 🧱 Interfaces

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

---

## ⚠️ Tipo any

```ts
let data: any;
```

Evitar en proyectos reales.

---

## 🧪 Actividad práctica

- Crear variables tipadas
- Crear funciones tipadas
- Definir interfaces
- Provocar errores de tipado

---

## ✅ Definition of Done

- Entiende diferencias JS vs TS
- Usa tipos básicos
- Usa interfaces
- Detecta errores sin ejecutar

---

## 🧭 Cierre

TypeScript permite escribir JavaScript más seguro y mantenible.
