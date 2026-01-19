import { Component, signal, computed, effect } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <h1>🧪 Ejercicio Signals Angular</h1>

    <input
      placeholder="Escribe tu nombre"
      [value]="nombre()"
      (input)="nombre.set($any($event.target).value)"
    >

    <button (click)="limpiar()">Limpiar</button>

    @if (nombre()) {
      <p>Hola {{ nombre() }}</p>
      <p>En mayúscula: {{ nombreMayus() }}</p>
    }
  `
})
export class AppComponent {
  nombre = signal('');

  nombreMayus = computed(() => this.nombre().toUpperCase());

  constructor() {
    effect(() => {
      console.log('Nombre cambió:', this.nombre());
    });
  }

  limpiar() {
    this.nombre.set('');
  }
}