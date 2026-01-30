# 📦 LogiFlow – Shipment Service

## 1. Responsabilidad
Gestionar el ciclo de vida del envío (Shipment) dentro del sistema LogiFlow.

Incluye:
- Creación de envíos
- Cambio de estado
- Consulta de envíos

Este microservicio **NO conoce tracking**, mapas ni eventos externos.

---

## 2. Arquitectura

Arquitectura Limpia / Hexagonal con enfoque reactivo:

- **Domain**: Reglas de negocio puras
- **Use Cases**: Orquestación de reglas
- **Entry Points**: WebFlux (Handlers + Router)
- **Driven Adapters**: MongoDB

---

## 3. Dominio

### 3.1 Entidad Shipment

```java
public class Shipment {

    private final String id;
    private final Location origin;
    private final Location destination;
    private ShipmentStatus status;

    // Crear nuevo shipment
    public Shipment(String id, Location origin, Location destination) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Id is required");
        }
        this.id = id;
        this.origin = origin;
        this.destination = destination;
        this.status = ShipmentStatus.IN_TRANSIT;
    }

    // Rehidratar desde persistencia
    public Shipment(String id, Location origin, Location destination, ShipmentStatus status) {
        this.id = id;
        this.origin = origin;
        this.destination = destination;
        this.status = status;
    }

    public void deliver() {
        if (status != ShipmentStatus.IN_TRANSIT) {
            throw new IllegalStateException("Only shipments in transit can be delivered");
        }
        this.status = ShipmentStatus.DELIVERED;
    }

    public void markIncident() {
        if (status == ShipmentStatus.DELIVERED) {
            throw new IllegalStateException("Delivered shipment cannot have incidents");
        }
        this.status = ShipmentStatus.INCIDENT;
    }
}
```

---

### 3.2 Value Object Location

```java
public class Location {

    private final String city;
    private final String address;

    public Location(String city, String address) {
        if (city == null || city.isBlank()) {
            throw new IllegalArgumentException("City is required");
        }
        if (address == null || address.isBlank()) {
            throw new IllegalArgumentException("Address is required");
        }
        this.city = city;
        this.address = address;
    }
}
```

---

## 4. Casos de Uso

### 4.1 CreateShipmentUseCase

```java
@RequiredArgsConstructor
public class CreateShipmentUseCase {

    private final ShipmentRepository shipmentRepository;

    public Mono<Shipment> create(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }
}
```

### 4.2 ChangeShipmentStatusUseCase

```java
@RequiredArgsConstructor
public class ChangeShipmentStatusUseCase {

    private final ShipmentRepository shipmentRepository;

    public Mono<Shipment> changeStatus(String shipmentId, ShipmentStatus newStatus) {
        return shipmentRepository.findById(shipmentId)
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Shipment not found")))
                .map(shipment -> {
                    switch (newStatus) {
                        case DELIVERED -> shipment.deliver();
                        case INCIDENT -> shipment.markIncident();
                        default -> {}
                    }
                    return shipment;
                })
                .flatMap(shipmentRepository::save);
    }
}
```

---

## 5. Persistencia (MongoDB)

### 5.1 Documento

```java
@Document(collection = "shipments")
public class ShipmentDocument {
    @Id
    private String id;
    private String originCity;
    private String originAddress;
    private String destinationCity;
    private String destinationAddress;
    private String status;
}
```

### 5.2 Mapper (MapStruct)

```java
@Mapper(componentModel = "spring")
public abstract class ShipmentDocumentMapper {

    @ObjectFactory
    protected Shipment createShipment(ShipmentDocument document) {
        return new Shipment(
            document.getId(),
            new Location(document.getOriginCity(), document.getOriginAddress()),
            new Location(document.getDestinationCity(), document.getDestinationAddress()),
            ShipmentStatus.valueOf(document.getStatus())
        );
    }

    public abstract ShipmentDocument toData(Shipment shipment);
}
```

---

## 6. Entry Points (WebFlux)

### Endpoints

| Método | Endpoint | Descripción |
|------|--------|------------|
| POST | /api/shipments | Crear shipment |
| PATCH | /api/shipments/{id}/status | Cambiar estado |
| GET | /api/shipments | Listar shipments |

---

## 7. Principios Clave

- Dominio independiente
- Casos de uso sin framework
- Reactivo end-to-end
- Infraestructura reemplazable

---

## 8. Resultado

Este microservicio define **el qué** del envío, no **el cómo se mueve**.
El movimiento pertenece al Tracking Service.
