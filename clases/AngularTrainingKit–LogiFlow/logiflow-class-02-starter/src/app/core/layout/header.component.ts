import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header>
      <strong>LogiFlow</strong>
      <span>User</span>
    </header>
  `
})
export class HeaderComponent {}
