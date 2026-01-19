import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  templateUrl: './signal-demo.html'
})
export class SignalDemoComponent {
  nombre = signal('');

  nombreMayus = computed(() =>
    this.nombre().toUpperCase()
  );

  constructor() {
    effect(() => {
      console.log('Nombre cambió:', this.nombre());
    });
  }

  limpiar() {
    this.nombre.set('');
  }
}
