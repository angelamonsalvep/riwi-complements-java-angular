import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <app-sidebar></app-sidebar>
    <div class="layout-content">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class MainLayoutComponent {}
