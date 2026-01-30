# 📍 LogiFlow – Creación del Tracking Service (Reactivo) con Scaffold Bancolombia

Esta guía explica **paso a paso** cómo crear el **microservicio de Tracking** usando el **plugin de Scaffold de Bancolombia**, alineado con **Clean Architecture**, **WebFlux** y **Server-Sent Events (SSE)**.

---

## 1. Objetivo del microservicio

El **Tracking Service** es responsable de:

- Registrar eventos de tracking externos
- Exponer historial y posición actual
- Emitir eventos en tiempo real (SSE)

❗ **No cambia el estado del shipment**
❗ **No conoce reglas de negocio del shipment**

---

## 2. Prerrequisitos

- Java 21+
- Gradle
- Docker
- MongoDB
- Plugin **Scaffold Bancolombia** instalado

---

## 3. Crear el proyecto con Scaffold

Desde IntelliJ / VS Code:

1. `New Project`
2. Seleccionar **Bancolombia – Clean Architecture**
3. Configurar:

```text
Project name: logiflow-tracking-service
Group: co.com.bancolombia
Artifact: tracking-service
Java: 21+
Reactive: YES
```

---

## 4. Estructura generada

```text
logiflow-tracking-service
 ├── applications/
 │   └── app-service
 ├── domain/
 │   ├── model
 │   └── usecase
 └── infrastructure/
     ├── entry-points
     │   └── reactive-web
     └── driven-adapters
         └── mongo-repository
```

---

## 5. Dominio (model)

### 5.1 TrackingEvent

```java
@Getter
public class TrackingEvent {

    private final String id;
    private final String shipmentId;
    private final double latitude;
    private final double longitude;
    private final TrackingStatus status;
    private final Instant timestamp;

    public TrackingEvent(String id, String shipmentId, double latitude, double longitude, TrackingStatus status) {
        this.id = id;
        this.shipmentId = shipmentId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.timestamp = Instant.now();
    }
}
```

### 5.2 TrackingStatus

```java
public enum TrackingStatus {
    DEPARTED,
    IN_TRANSIT,
    ARRIVED,
    DELAYED
}
```

---

## 6. Puerto del dominio

```java
public interface TrackingRepository {

    Mono<TrackingEvent> save(TrackingEvent event);

    Flux<TrackingEvent> findByShipmentId(String shipmentId);

    Mono<TrackingEvent> findLatestByShipmentId(String shipmentId);
}
```

---

## 7. Casos de uso

### 7.1 Registrar evento

```java
@RequiredArgsConstructor
public class RegisterTrackingEventUseCase {

    private final TrackingRepository repository;

    public Mono<TrackingEvent> register(TrackingEvent event) {
        return repository.save(event);
    }
}
```

### 7.2 Obtener historial

```java
@RequiredArgsConstructor
public class GetTrackingHistoryUseCase {

    private final TrackingRepository repository;

    public Flux<TrackingEvent> history(String shipmentId) {
        return repository.findByShipmentId(shipmentId);
    }
}
```

### 7.3 Obtener evento actual

```java
@RequiredArgsConstructor
public class GetCurrentTrackingUseCase {

    private final TrackingRepository repository;

    public Mono<TrackingEvent> current(String shipmentId) {
        return repository.findLatestByShipmentId(shipmentId);
    }
}
```

---

## 8. Driven Adapter – MongoDB

### 8.1 Documento

```java
@Document(collection = "tracking_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrackingEventDocument {

    @Id
    private String id;
    private String shipmentId;
    private double latitude;
    private double longitude;
    private String status;
    private Instant timestamp;
}
```

### 8.2 Repositorio

```java
public interface TrackingMongoRepository extends ReactiveMongoRepository<TrackingEventDocument, String> {

    Flux<TrackingEventDocument> findByShipmentIdOrderByTimestampAsc(String shipmentId);

    Mono<TrackingEventDocument> findFirstByShipmentIdOrderByTimestampDesc(String shipmentId);
}
```

---

## 9. Entry Point – WebFlux

### 9.1 Endpoints

| Método | Endpoint |
|------|--------|
| POST | /tracking/events |
| GET | /tracking/shipments/{id}/history |
| GET | /tracking/shipments/{id}/current |
| GET | /tracking/stream/{id} |

### 9.2 Handler

```java
@Component
@RequiredArgsConstructor
public class TrackingHandler {

    private final RegisterTrackingEventUseCase registerUseCase;
    private final GetTrackingHistoryUseCase historyUseCase;
    private final GetCurrentTrackingUseCase currentUseCase;

    public Mono<ServerResponse> register(ServerRequest request) {
        return request.bodyToMono(TrackingEventRequest.class)
            .map(dto -> new TrackingEvent(
                UUID.randomUUID().toString(),
                dto.shipmentId(),
                dto.latitude(),
                dto.longitude(),
                TrackingStatus.valueOf(dto.status())
            ))
            .flatMap(registerUseCase::register)
            .then(ServerResponse.created(request.uri()).build());
    }
}
```

---

## 10. Server-Sent Events (SSE)

```java
@GetMapping(value = "/tracking/stream/{shipmentId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<TrackingEvent> stream(@PathVariable String shipmentId) {
    return sink.getStream(shipmentId);
}
```

---

## 11. Configuración

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/logiflow_tracking
```

---

## 12. Flujo completo

```text
Cliente externo → POST /tracking/events
MongoDB ← evento
SSE emite evento
Angular actualiza mapa en tiempo real
```

---

## 13. Resultado final

✔ Microservicio reactivo
✔ Clean Architecture real
✔ Event-driven
✔ SSE listo para frontend

---

## 14. Siguientes pasos

- Simulador de eventos
- Auth
- Observabilidad
- Integración con Shipment Service

🚀

