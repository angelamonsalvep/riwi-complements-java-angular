# 🧱 Clase – Modelado del Dominio `Shipment`

## Backend LogiFlow – Arquitectura Hexagonal con Scaffold Bancolombia

---

## 🎯 Objetivo de la Clase

En esta clase se construye el **modelo de dominio `Shipment`**, que representa el **corazón del negocio logístico** de LogiFlow.

Al finalizar esta clase, el sistema contará con:

- Un **modelo de dominio protegido**
- Reglas de negocio explícitas
- Estados y transiciones controladas
- **Pruebas de dominio en verde**

> ⚠️ En esta etapa **NO se construyen endpoints, controllers ni base de datos**.

---

## 🧠 Conceptos Clave

### 🧩 Dominio
El **dominio** representa las reglas del negocio y debe:

- Ser independiente de frameworks
- No depender de infraestructura
- Proteger las reglas sin ayuda externa

---

### 🧱 Entidad
Una **entidad** es un objeto que:

- Tiene identidad propia
- Cambia de estado en el tiempo
- Encapsula comportamiento

En LogiFlow, `Shipment` es una entidad.

---

### 🔁 Estados y Transiciones
Un envío **no puede cambiar de estado libremente**.

Las transiciones válidas son:

- `CREATED → IN_TRANSIT`
- `IN_TRANSIT → DELIVERED`
- `CREATED / IN_TRANSIT → EXCEPTION`

Cualquier otra transición es inválida.

---

## 1️⃣ Generar el Modelo con el Plugin

Desde la raíz del proyecto `logiflow-shipment-service`:

```bash
./gradlew gm --name Shipment
```

### ¿Qué hace este comando?

- Genera la clase base del modelo
- Respeta la estructura hexagonal
- Ubica el código en la capa correcta

---

## 2️⃣ Estructura Generada

Ubicación esperada:

```
domain/src/main/java/com/logiflow/shipment/domain/model/Shipment.java
```

Si el archivo no está ahí, **detente y revisa**.

---

## 3️⃣ Definir Estados del Envío

Crear el enum `ShipmentStatus`:

```java
public enum ShipmentStatus {
    CREATED,
    IN_TRANSIT,
    DELIVERED,
    EXCEPTION
}
```

### ¿Por qué usar `enum`?

- Estados finitos
- Menos errores
- Reglas claras

---

## 4️⃣ Implementar la Entidad `Shipment`

```java
public class Shipment {

    private final String id;
    private ShipmentStatus status;

    public Shipment(String id) {
        this.id = id;
        this.status = ShipmentStatus.CREATED;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void dispatch() {
        if (status != ShipmentStatus.CREATED) {
            throw new IllegalStateException("Shipment can only be dispatched from CREATED");
        }
        this.status = ShipmentStatus.IN_TRANSIT;
    }

    public void deliver() {
        if (status != ShipmentStatus.IN_TRANSIT) {
            throw new IllegalStateException("Shipment can only be delivered from IN_TRANSIT");
        }
        this.status = ShipmentStatus.DELIVERED;
    }

    public void markException() {
        if (status == ShipmentStatus.DELIVERED) {
            throw new IllegalStateException("Delivered shipment cannot change state");
        }
        this.status = ShipmentStatus.EXCEPTION;
    }
}
```

### 🔑 Reglas Importantes

- ❌ No setters genéricos
- ❌ No anotaciones de Spring
- ✅ El dominio decide

---

## 🧪 5️⃣ Pruebas de Dominio

Ubicación:

```
domain/src/test/java/com/logiflow/shipment/domain/model
```

### Test de comportamiento:

```java
class ShipmentTest {

    @Test
    void should_start_in_created_state() {
        Shipment shipment = new Shipment("S1");
        assertEquals(ShipmentStatus.CREATED, shipment.getStatus());
    }

    @Test
    void should_dispatch_from_created() {
        Shipment shipment = new Shipment("S1");
        shipment.dispatch();
        assertEquals(ShipmentStatus.IN_TRANSIT, shipment.getStatus());
    }

    @Test
    void delivered_shipment_cannot_change() {
        Shipment shipment = new Shipment("S1");
        shipment.dispatch();
        shipment.deliver();
        assertThrows(IllegalStateException.class, shipment::markException);
    }
}
```

---

## ▶️ 6️⃣ Ejecutar Pruebas

```bash
./gradlew :domain:test
```

Resultado esperado:

```
BUILD SUCCESSFUL
```

---

## 🧠 Checklist de Calidad

Antes de continuar, verifica:

- [ ] El dominio falla cuando se violan reglas
- [ ] No hay dependencias de Spring
- [ ] Las reglas viven en la entidad
- [ ] Los tests prueban comportamiento

---

## 🏁 Resultado de la Clase

Al finalizar esta clase:

- El **dominio Shipment está protegido**
- Las reglas están explícitas
- El backend tiene una base sólida

---

## 🧠 Frase de Cierre

> **"Si el dominio es débil, ningún framework lo salvará."**

---

📄 *Clase oficial – Modelado del Dominio Shipment – Backend LogiFlow*

