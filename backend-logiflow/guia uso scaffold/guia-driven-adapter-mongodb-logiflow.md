# 🧩 Guía: Driven Adapter MongoDB – LogiFlow (Shipment Service)

## 🎯 Objetivo
Esta guía explica **cómo generar y configurar un Driven Adapter MongoDB** usando el **Scaffold Clean Architecture de Bancolombia** para el microservicio `shipment-service` de **LogiFlow**.

El objetivo es conectar persistencia **sin romper la arquitectura hexagonal**, manteniendo el dominio y los casos de uso desacoplados.

---

## 🧠 Contexto Arquitectónico

LogiFlow utiliza:
- Arquitectura Hexagonal (Clean Architecture)
- Casos de uso en el dominio
- Gateways como contratos
- Adapters en infraestructura

El **Driven Adapter MongoDB** es la implementación concreta del gateway `ShipmentRepository`.

---

## ✅ Prerrequisitos

Antes de empezar, verifica:

- Java 17+
- Gradle 9.2.1+
- Proyecto generado con `co.com.bancolombia.cleanArchitecture`
- Gateway existente:
  ```
  domain/model/.../shipment/gateways/ShipmentRepository.java
  ```
- Estar ubicado en la raíz del microservicio:
  ```
  logiflow-shipment-service/
  ```

---

## 🚀 Paso 1 – Generar el Driven Adapter MongoDB

Ejecuta el comando:

```bash
./gradlew gda --type MONGODB
```

> ⚠️ Importante: el tipo es **MONGODB** (mayúsculas).  
> `mongo` o `mongodb` en minúscula NO funcionan.

---

## 🧱 Paso 2 – Estructura Generada

El scaffold creará un módulo similar a:

```
infrastructure/
└── driven-adapters/
    └── mongodb-repository/
        ├── build.gradle
        └── src/main/java
            └── co/com/bancolombia
                ├── config
                │   └── MongoConfig.java
                ├── data
                │   └── ShipmentData.java
                ├── mapper
                │   └── ShipmentMapper.java
                └── adapter
                    └── ShipmentMongoRepositoryAdapter.java
```

---

## 🧩 Responsabilidad de Cada Componente

| Componente | Responsabilidad |
|-----------|----------------|
| `ShipmentData` | Documento Mongo |
| `ShipmentMapper` | Traducción Dominio ⇄ Mongo |
| `ShipmentMongoRepositoryAdapter` | Implementa `ShipmentRepository` |
| `MongoConfig` | Configuración de MongoDB |

👉 El dominio **no conoce MongoDB**.

---

## 🔌 Paso 3 – Conexión Automática con el UseCase

Gracias al scaffold:

- El adapter implementa el gateway
- Spring lo detecta como bean
- El UseCase recibe el repository por inyección

👉 **No es necesario modificar el UseCase**.

---

## ⚙️ Paso 4 – Configuración de MongoDB

En `applications/app-service/src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/logiflow-shipments
```

---

## 🐳 (Opcional) Levantar MongoDB con Docker

Para desarrollo local rápido:

```bash
docker run -d \
  --name mongo-logiflow \
  -p 27017:27017 \
  mongo:7
```

---

## 🧪 Paso 5 – Probar el Microservicio

Levantar la aplicación:

```bash
./gradlew bootRun
```

Probar endpoint (ejemplo):

```
PATCH /api/shipments/{id}/status
```

El flujo completo ahora es:
```
Router → Handler → UseCase → ShipmentRepository → MongoDB
```

---

## 🧠 Buenas Prácticas

- No usar clases Mongo en el dominio
- No inyectar repositorios directamente en el Handler
- Toda lógica vive en el UseCase
- El adapter solo traduce y persiste

---

## 🚀 Estado Final

Con este paso, `shipment-service` queda con:

- Dominio limpio
- Casos de uso reactivos
- Persistencia Mongo desacoplada
- Arquitectura lista para escalar
- Backend alineado con el frontend LogiFlow

---

## 🔜 Próximos Pasos

- Crear `CreateShipmentUseCase`
- Exponer `GET /api/shipments`
- Agregar eventos de tracking
- Replicar el patrón en otros microservicios

---
