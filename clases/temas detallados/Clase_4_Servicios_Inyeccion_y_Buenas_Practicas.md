# 📕 Clase 4 – Servicios, Inyección de Dependencias y Buenas Prácticas
Complementos Frontend – Clan RIWI  
Nivel: Inicial → Intermedio  
Duración sugerida: 2 a 3 horas

## 🎯 Objetivo de la clase
Al finalizar esta clase, el coder será capaz de:
- Entender qué es un servicio en Angular
- Aplicar Inyección de Dependencias (DI)
- Separar lógica de negocio de la vista
- Usar servicios para compartir datos
- Aplicar buenas prácticas profesionales en Angular

---

## 🧠 Problema común sin servicios
Cuando toda la lógica está en los componentes:

❌ Componentes muy grandes  
❌ Código duplicado  
❌ Difícil de mantener  
❌ Difícil de testear  

👉 Angular soluciona esto con **Servicios + Inyección de Dependencias**

---

## 🧩 ¿Qué es un servicio en Angular?
Un **servicio** es una clase que:
- Contiene lógica de negocio
- Maneja datos
- Consume APIs
- Comparte información entre componentes

💡 Un servicio **NO tiene HTML**, solo lógica.

---

## 🏗️ Crear un servicio básico

```ts
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  getUsuarios() {
    return ['Ana', 'Luis', 'Carlos'];
  }
}
```

### Explicación
- `@Injectable` → permite inyección
- `providedIn: 'root'` → servicio global (singleton)

---

## 💉 Inyección de Dependencias (DI)

Angular **inyecta** el servicio donde lo necesites.

```ts
@Component({
  standalone: true,
  selector: 'app-usuarios',
  template: `
    <ul>
      @for (user of usuarios; track user) {
        <li>{{ user }}</li>
      }
    </ul>
  `
})
export class UsuariosComponent {
  usuarios: string[] = [];

  constructor(private usuarioService: UsuarioService) {
    this.usuarios = this.usuarioService.getUsuarios();
  }
}
```

👉 El componente **no crea** el servicio, Angular se lo entrega.

---

## 🧠 Servicios con estado compartido

```ts
@Injectable({ providedIn: 'root' })
export class ContadorService {
  valor = 0;

  incrementar() {
    this.valor++;
  }
}
```

Dos componentes pueden compartir el mismo estado.

---

## 🌐 Servicios + Observables (introducción)

Angular usa **RxJS** para manejar datos reactivos.

```ts
getUsuarios(): Observable<string[]> {
  return of(['Ana', 'Luis']);
}
```

```ts
this.usuarioService.getUsuarios().subscribe(data => {
  this.usuarios = data;
});
```

💡 Esto es clave para APIs reales.

---

## 📁 Dónde ubicar los servicios

Estructura recomendada:

```
app/
 ├── core/services/
 ├── features/usuarios/
 └── shared/
```

- Servicios globales → core
- Servicios por feature → dentro de la feature

---

## ✅ Buenas prácticas Angular (nivel empresa)

✔ Componentes pequeños  
✔ Servicios para lógica  
✔ Tipado estricto  
✔ Standalone Components  
✔ Arquitectura por features  
✔ No lógica compleja en el template  
✔ Un componente = una responsabilidad  

---

## ❌ Malas prácticas comunes

❌ Lógica pesada en el HTML  
❌ Llamar APIs desde el componente  
❌ No tipar datos  
❌ Componentes gigantes  

---

## 🧪 Ejercicio práctico (OBLIGATORIO)

### Parte 1 – Servicio
Crea un servicio `TareasService` que:
- Guarde una lista de tareas
- Tenga métodos agregar y listar

---

### Parte 2 – Componente
Crea un componente `TareasComponent` que:
- Inyecte el servicio
- Muestre las tareas
- Permita agregar nuevas tareas

---

## 🧠 Checklist final del ciclo
✔ Entiende TypeScript  
✔ Entiende Angular  
✔ Maneja componentes  
✔ Usa Data Binding  
✔ Usa Servicios y DI  

---

## 🚀 Proyecto final sugerido
Mini SPA con:
- Home
- Lista de usuarios
- Lista de tareas
- Servicios compartidos
- Routing básico

Este proyecto resume **todas las clases**.
