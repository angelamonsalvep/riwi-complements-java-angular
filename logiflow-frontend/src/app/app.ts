import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalDemoComponent } from './signal-demo/signal-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignalDemoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('logiflow-frontend');
  nombre = signal('Carlos');
  nuevaSkill = signal('');
  skills = signal(['Angular', 'TypeScript']);

  actualizarSkill(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.nuevaSkill.set(value);
  }

  agregarSkill() {
    if (this.nuevaSkill().trim()) {
      this.skills.update(list => [...list, this.nuevaSkill()]);
      this.nuevaSkill.set('');
    }
  }
  
}
