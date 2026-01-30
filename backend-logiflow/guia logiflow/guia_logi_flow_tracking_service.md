# 📍 LogiFlow – Tracking Service

## 1. Responsabilidad

Gestionar eventos de tracking de los shipments y exponerlos en tiempo real.

Este servicio **NO cambia el estado del shipment**.
Solo registra y transmite eventos de movimiento.

---

## 2. Relación con Shipment Service

- Shipment Service define:
  - Origen
  - Destino
  - Estado lógico

- Tracking Service define:
  - Posición
  - Progreso
  - Línea de tiempo

---

## 3. Dominio

### 3.1 TrackingEvent

```java
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

### 3.2 TrackingStatus

```java
public enum TrackingStatus {
    DEPARTED,
    IN_TRANSIT,
    ARRIVED,
    DELAYED
}
```

---

## 4. Casos de Uso

### 4.1 RegisterTrackingEventUseCase

```java
@RequiredArgsConstructor
public class RegisterTrackingEventUseCase {

    private final TrackingRepository repository;

    public Mono<TrackingEvent> register(TrackingEvent event) {
        return repository.save(event);
    }
}
```

### 4.2 GetTrackingHistoryUseCase

```java
public Flux<TrackingEvent> history(String shipmentId) {
    return repository.findByShipmentId(shipmentId);
}
```

---

## 5. Endpoints

| Método | Endpoint | Descripción |
|------|--------|------------|
| POST | /tracking/events | Registrar evento |
| GET | /tracking/shipments/{id}/history | Historial |
| GET | /tracking/shipments/{id}/current | Última posición |
| GET | /tracking/stream/{id} | Stream SSE |

---

## 6. Server-Sent Events (SSE)

```java
@GetMapping(value = "/tracking/stream/{shipmentId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<TrackingEvent> stream(@PathVariable String shipmentId) {
    return trackingEventSink.getStream(shipmentId);
}
```

---

## 7. Uso desde el Frontend

El frontend:
- Dibuja rutas en mapa
- Escucha eventos en tiempo real
- Muestra progreso del envío

---

## 8. Mapa

El frontend puede usar:
- Leaflet
- Google Maps
- Mapbox

Para representar:
- Origen
- Destino
- Posición actual

---

## 9. Flujo Completo

1. Shipment creado
2. Tracking comienza
3. Eventos enviados
4. SSE notifica frontend
5. Usuario ve movimiento en tiempo real

---

## 10. Resultado

Sistema desacoplado, reactivo y escalable.
Cada servicio tiene una responsabilidad clara.

