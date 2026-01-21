# 📘 Clase: Instalación y uso de JSON Server

**Nivel:** Básico – Intermedio  
**Duración estimada:** 60–90 minutos  
**Modalidad:** Teórico–práctica  

---

## 🎯 Objetivo de la clase
Al finalizar la clase, el estudiante será capaz de:
- Comprender qué es JSON Server y para qué se utiliza.
- Instalar y ejecutar JSON Server correctamente.
- Crear una API REST simulada usando un archivo `db.json`.
- Consumir los endpoints desde una aplicación frontend.
- Usar filtros, paginación y rutas de detalle.

---

## 🧠 ¿Qué es JSON Server?
JSON Server es una herramienta que permite crear una **API REST falsa (mock)** de forma rápida usando un archivo JSON como fuente de datos.

Se utiliza principalmente para:
- Desarrollo frontend sin backend real
- Pruebas técnicas
- Prototipos
- Clases y prácticas
- Simulación de APIs

---

## 📦 Requisitos previos
- Node.js instalado
- NPM o Yarn
- Conocimientos básicos de JavaScript
- Editor de código (VS Code recomendado)

---

## 1️⃣ Instalación de JSON Server

### Instalación global
```bash
npm install -g json-server
```

Verificar instalación:
```bash
json-server --version
```

---

### Instalación local
```bash
npm install json-server --save-dev
```

---

## 2️⃣ Crear el archivo db.json

```json
{
  "projects": [
    { "id": 1, "title": "Recuperación de parques", "status": "Active" },
    { "id": 2, "title": "Programa de reciclaje", "status": "Inactive" }
  ]
}
```

---

## 3️⃣ Levantar el servidor

```bash
json-server --watch db.json
```

Servidor disponible en:
```
http://localhost:3000
```

---

## 4️⃣ Endpoints disponibles

| Método | Endpoint | Descripción |
|------|--------|------------|
| GET | /projects | Listar |
| GET | /projects/1 | Detalle |
| POST | /projects | Crear |
| PUT | /projects/1 | Actualizar |
| DELETE | /projects/1 | Eliminar |

---

## 5️⃣ Consumir desde JavaScript

```js
export async function fetchProjects() {
  const response = await fetch('http://localhost:3000/projects');
  if (!response.ok) {
    throw new Error('Error al cargar proyectos');
  }
  return await response.json();
}
```

---

## 6️⃣ Filtros y paginación

```http
GET /projects?status=Active
GET /projects?_page=1&_limit=5
```

---

## 🧪 Actividad práctica
Crear un `db.json` con al menos 10 proyectos y consumirlo desde un frontend.

---

## 🏁 Cierre
JSON Server permite simular APIs REST de forma rápida y efectiva para desarrollo frontend.
