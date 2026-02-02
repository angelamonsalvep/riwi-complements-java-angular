# 📍 Guía Completa – Microservicio Tracking (LogiFlow)

Esta guía describe paso a paso cómo crear el **microservicio de Tracking** usando el **Scaffold Clean Architecture de Bancolombia**, con enfoque **reactivo, event‑driven y SSE**, alineado con el backend de Shipments y el frontend Angular.

---

## 1. Propósito del Tracking Service

El Tracking Service se encarga de:

- Registrar eventos de tracking de un envío
- Exponer el estado y la trazabilidad del envío
- Emitir eventos en tiempo real usando **Server‑Sent Events (SSE)**

### Endpoints

| Método | Endpoint | Descripción |
|------|---------|-------------|
| POST | /tracking/events | Registrar un evento |
| GET | /tracking/shipments/{shipmentId}/history | Historial completo |
| GET | /tracking/shipments/{shipmentId}/current | Estado actual |
| GET | /tracking/stream/{shipmentId} | Stream en tiempo real (SSE) |

---

## 2. Crear el proyecto base

### 2.1 Crear carpeta

```bash
mkdir logiflow-tracking-service
cd logiflow-tracking-service
```

### 2.2 build.gradle raíz

```gradle
plugins {
    id 'co.com.bancolombia.cleanArchitecture' version '4.0.5'
}
```

### 2.3 Inicializar Gradle Wrapper

```bash
gradle wrapper
```

### 2.4 Generar arquitectura Clean

```bash
./gradlew ca \
  --name=LogiFlowTrackingService \
  --package=co.com.bancolombia.tracking \
  --type=reactive \
  --java-version=25
```

---

## 3. Crear Entry Point WebFlux

```bash
./gradlew gep --type=webflux
```

Esto genera el entry‑point reactivo con Router y Handler.

---

## 4. Crear modelos de dominio

```bash
./gradlew gm --name=TrackingEvent
./gradlew gm --name=TrackingStatus
./gradlew gm --name=TrackingRepository
```

### TrackingEvent

```java
@Getter
public class TrackingEvent {
    private final String shipmentId;
    private final TrackingStatus status;
    private final String description;
    private final Instant occurredAt;
    private final double latitude;
    private final double longitude;

    public TrackingEvent(String shipmentId, TrackingStatus status,
                         String description, Instant occurredAt,
                         double latitude, double longitude) {
        if (shipmentId == null || shipmentId.isBlank()) {
            throw new IllegalArgumentException("ShipmentId is required");
        }
        this.shipmentId = shipmentId;
        this.status = status;
        this.description = description;
        this.occurredAt = occurredAt != null ? occurredAt : Instant.now();
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
```

### TrackingStatus

```java
public enum TrackingStatus {
    CREATED,
    IN_TRANSIT,
    AT_WAREHOUSE,
    OUT_FOR_DELIVERY,
    DELIVERED,
    INCIDENT
}
```

---

## 5. Crear casos de uso

```bash
./gradlew guc --name=RegisterTrackingEvent
./gradlew guc --name=GetTrackingHistory
./gradlew guc --name=GetCurrentTracking
```

Ejemplo:

```java
@RequiredArgsConstructor
public class RegisterTrackingEventUseCase {
    private final TrackingRepository repository;

    public Mono<TrackingEvent> register(TrackingEvent event) {
        return repository.save(event);
    }
}
```

---

## 6. Crear Driven Adapter Mongo

```bash
./gradlew gda --type=mongodb
```

### Documento Mongo

```java
@Document(collection = "tracking_events")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrackingEventDocument {
    @Id
    private String id;
    private String shipmentId;
    private String status;
    private String description;
    private Instant occurredAt;
    private double latitude;
    private double longitude;
}
```

### Mapper MapStruct

```java
@Mapper(componentModel = "spring")
public interface TrackingEventMapper {
    TrackingEvent toEntity(TrackingEventDocument doc);
    TrackingEventDocument toDocument(TrackingEvent event);
}
```

---

## 7. Entry Point – Handler y Router

### Handler

```java
@Component
@RequiredArgsConstructor
public class TrackingHandler {
    private final RegisterTrackingEventUseCase registerUseCase;
    private final GetTrackingHistoryUseCase historyUseCase;
    private final GetCurrentTrackingUseCase currentUseCase;

    public Mono<ServerResponse> register(ServerRequest request) {
        return request.bodyToMono(TrackingEvent.class)
                .flatMap(registerUseCase::register)
                .flatMap(event -> ServerResponse.ok().bodyValue(event));
    }

    public Mono<ServerResponse> history(ServerRequest request) {
        String id = request.pathVariable("shipmentId");
        return ServerResponse.ok()
                .body(historyUseCase.history(id), TrackingEvent.class);
    }

    public Mono<ServerResponse> current(ServerRequest request) {
        String id = request.pathVariable("shipmentId");
        return currentUseCase.current(id)
                .flatMap(event -> ServerResponse.ok().bodyValue(event));
    }

    public Mono<ServerResponse> stream(ServerRequest request) {
        String id = request.pathVariable("shipmentId");
        return ServerResponse.ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(historyUseCase.history(id), TrackingEvent.class);
    }
}
```

### Router

```java
@Configuration
public class TrackingRouter {
    @Bean
    public RouterFunction<ServerResponse> routes(TrackingHandler handler) {
        return route(POST("/tracking/events"), handler::register)
                .andRoute(GET("/tracking/shipments/{shipmentId}/history"), handler::history)
                .andRoute(GET("/tracking/shipments/{shipmentId}/current"), handler::current)
                .andRoute(GET("/tracking/stream/{shipmentId}"), handler::stream);
    }
}
```

---

## 8. Probar el servicio

```bash
./gradlew bootRun
```

### Ejemplo POST

```json
{
  "shipmentId": "123",
  "status": "IN_TRANSIT",
  "description": "Paquete salió del centro logístico",
  "latitude": 6.2442,
  "longitude": -75.5812
}
```

---

## 9. Resultado

✔ Clean Architecture
✔ Reactivo con WebFlux
✔ SSE listo para frontend
✔ Integrable con Angular + mapas

---

**LogiFlow – Tracking Service**

