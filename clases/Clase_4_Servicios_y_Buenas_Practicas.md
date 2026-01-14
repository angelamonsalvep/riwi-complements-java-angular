# Clase 4 – Servicios e Inyección de Dependencias

## Objetivo
Separar la lógica usando servicios.

## Servicio
```ts
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  getUsuarios() {
    return ['Ana', 'Luis'];
  }
}
```

## Buenas prácticas
- Componentes pequeños
- Servicios para lógica

## Proyecto
Mini SPA con Home y Usuarios.
