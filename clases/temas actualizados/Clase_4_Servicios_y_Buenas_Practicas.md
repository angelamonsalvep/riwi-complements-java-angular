# Clase 4 – Servicios y Buenas Prácticas Angular

## Servicios
```ts
@Injectable({ providedIn: 'root' })
export class UsuarioService {
  getUsuarios() {
    return ['Ana', 'Luis'];
  }
}
```

## Buenas prácticas
- Standalone components
- Servicios para lógica
- Tipado estricto
