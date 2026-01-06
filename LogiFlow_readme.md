# 🚚 LogiFlow | Plataforma Logística en Tiempo Real

![Status](https://img.shields.io/badge/Status-Active-success)
![Java](https://img.shields.io/badge/Java-17%2B-orange)
<img alt="Spring Boot" src="https://img.shields.io/badge/SpringBoot-3.2%20WebFlux-green?logo=springboot" />
![Angular](https://img.shields.io/badge/Angular-17%2B-red)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-blueviolet)



> **Proyecto:** Java Complementos 1 – Riwi Medellín
> **Modalidad:** Simulación de Entorno Laboral (Enterprise)
> **Duración:** 9 Semanas
> **Versión:** 1.0.0-beta

---

## 🎯 Visión del Producto

**LogiFlow** no es un ejercicio académico ni un simple CRUD de inventario. Es una **plataforma logística de grado empresarial** diseñada para resolver el problema de la "visibilidad" en la cadena de suministro (Supply Chain).

### 🛑 El Problema Real
En la logística tradicional, saber dónde está un paquete implica procesos manuales, llamadas telefónicas o sistemas "batch" que se actualizan cada 24 horas. Esto genera incertidumbre (*WISMO: Where Is My Order?*), ansiedad en el cliente y cuellos de botella operativos.

### 🚀 La Solución LogiFlow
Construimos un sistema **Event-Driven (Basado en Eventos)** y **Reactivo**.
* **Visibilidad Total:** El mapa de seguimiento se actualiza en milisegundos.
* **Resiliencia:** Si un microservicio cae, el sistema se recupera.
* **Escalabilidad:** Diseñado para soportar miles de envíos simultáneos mediante Docker y Kubernetes.

---

## 🏗 Arquitectura del Sistema

El sistema abandona el monolito tradicional para adoptar una arquitectura de **Microservicios Reactivos**. El flujo de datos prioriza la actualización en tiempo real mediante **Streams**.

~~~mermaid
graph TD
    User((Usuario/Admin))
    
    subgraph "FRONTEND - Angular 17+"
        UI[Dashboard Logístico]
        Map[Tracking View]
        Services[Angular Services]
    end

    subgraph "EDGE - NETWORK"
        SSE((Server-Sent Events))
        API_GW[API Gateway]
    end

    subgraph "BACKEND CORE - Spring Boot 3"
        Auth[Auth Service JWT]
        Shipment[Shipment Core WebFlux]
        Tracking[Tracking Engine Streams]
    end

    subgraph "INFRASTRUCTURE"
        Mongo[(Reactive Mongo)]
        Docker[[Docker Containers]]
        K8s[[Kubernetes Cluster]]
    end

    User --> UI
    UI -->|REST Request| API_GW
    API_GW --> Auth
    API_GW --> Shipment
    
    Shipment -->|Emit Event| Tracking
    Tracking -->|Push Stream| SSE
    SSE -->|Live Update| Services
    Services --> Map
    
    Shipment -.-> Mongo
    Tracking -.-> Mongo
    
    classDef front fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef back fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    classDef cloud fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    
    class UI,Map,Services front
    class API_GW,Auth,Shipment,Tracking back
    class Docker,K8s,Mongo cloud
~~~

### 🧩 Flujo de Datos (The Reactive Path)

1.  **Interacción Estándar (HTTP):** El usuario crea un envío desde el Dashboard. La petición viaja vía `REST API` hacia el `Shipment Core`.
2.  **El Corazón Reactivo (Event Emission):** Al guardarse el dato en Mongo, el sistema no espera; **emite un evento** al `Tracking Engine`. Aquí WebFlux es obligatorio y real, no decorativo.
3.  **Transmisión en Vivo (SSE):** El motor de tracking transforma el evento en un Stream continuo y lo "empuja" al frontend mediante **Server-Sent Events**.
4.  **Visualización:** El mapa en Angular recibe la coordenada y mueve el icono del camión sin que el usuario recargue la página.

---

## 🗺 Roadmap de Desarrollo (alineado al Microplanning)

El proyecto se desarrolla en **9 sprints semanales**, simulando un ciclo de trabajo real en un entorno enterprise.  
Cada semana tiene un **foco técnico claro** y un **resultado verificable**.

| Semana | Foco Principal | Resultado Esperado (Definition of Done) |
|------:|----------------|------------------------------------------|
| **S01** | **Entendimiento del Producto & Base Técnica** | Proyecto Angular creado, estructura base definida, layout inicial implementado y entendimiento compartido del sistema completo (negocio + arquitectura). |
| **S02** | **Frontend Funcional & Flujos de Usuario** | Frontend navegable con vistas principales, servicios desacoplados con mock data y pruebas unitarias básicas validando comportamiento. |
| **S03** | **Frontend Avanzado & Estabilización** | Frontend refactorizado, reactivo, sin deuda técnica bloqueante y listo para integrar con backend real. |
| **S04** | **Backend Reactivo: Dominio & Casos de Uso** | Dominio del negocio modelado y protegido, casos de uso reactivos implementados y probados antes de exponer la API. |
| **S05** | **Integración Backend–Frontend (E2E)** | LogiFlow funcionando de punta a punta con datos reales, reglas de negocio protegidas y eventos en tiempo real visibles en la UI. |
| **S06** | **Docker & Entorno Reproducible** | Sistema completo ejecutándose en Docker con un solo comando y flujos end-to-end validados. |
| **S07** | **Deploy en AWS / VPS** | Frontend y backend desplegados en un entorno productivo real, accesibles públicamente y funcionales. |
| **S08** | **Kubernetes & Observabilidad** | Backend ejecutándose en Kubernetes con alta disponibilidad básica, logs y métricas observables. |
| **S09** | **Release Sprint: Calidad, Performance & Demo** | Sistema estabilizado, medido, optimizado y defendible mediante demo técnica y documentación final. |


---

## 🛠 Stack Tecnológico

Elegido para maximizar la empleabilidad y simular un entorno Enterprise moderno.

### Frontend
* **Framework:** Angular 17+ (Signals, Standalone Components).
* **Estilos:** Angular Material / Tailwind CSS.
* **Mapas:** Leaflet / Mapbox GL.
* **State Management:** RxJS (Observables).

### Backend
* **Lenguaje:** Java 17 LTS.
* **Framework:** Spring Boot 3.2.
* **Paradigma:** Spring WebFlux (Project Reactor - Non-blocking I/O).
* **Seguridad:** Spring Security (JWT).

### Infraestructura & Datos
* **Base de Datos:** MongoDB (Reactive Driver).
* **Contenedores:** Docker & Docker Compose.
* **Orquestación:** Kubernetes (Minikube / K8s).
* **Cloud:** AWS EC2 / VPS Linux.

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
* Java 17 JDK
* Node.js 20+
* Docker & Docker Compose

### Pasos Rápidos

1.  **Clonar repositorio:**
    ~~~bash
    git clone https://github.com/riwi-org/logiflow.git
    cd logiflow
    ~~~

2.  **Levantar Infraestructura (Base de Datos):**
    ~~~bash
    docker-compose up -d mongo
    ~~~

3.  **Ejecutar Backend:**
    ~~~bash
    cd backend
    ./mvnw spring-boot:run
    ~~~

4.  **Ejecutar Frontend:**
    ~~~bash
    cd frontend
    npm install
    ng serve
    ~~~

5.  **Verificar:**
    * **Frontend:** Abre `http://localhost:4200`
    * **Swagger API:** Abre `http://localhost:8080/webjars/swagger-ui/index.html`

---

## 👥 Roles del Proyecto

Para simular un entorno real, trabajaremos con roles rotativos:

* **Frontend Specialist:** Encargado de UX, componentes visuales y mapas.
* **Backend Engineer:** Encargado de la lógica WebFlux y persistencia de datos.
* **DevOps Engineer:** Encargado de Dockerfiles, CI/CD y despliegue.
* **QA Engineer:** Encargado de pruebas y asegurar que la rama `main` no se rompa.

---

## 🤝 Contribución (Git Flow)

1.  **NUNCA** hacer commit directo a `main`.
2.  Crear rama por feature:
    * `git checkout -b feature/auth-login`
    * `git checkout -b feature/tracking-map`
3.  Hacer Pull Request (PR) y solicitar revisión a un compañero.
4.  Merge solo tras aprobación (Code Review).

---

> **Built with ❤️ by Riwi Coders**
> *Medellín, Colombia*