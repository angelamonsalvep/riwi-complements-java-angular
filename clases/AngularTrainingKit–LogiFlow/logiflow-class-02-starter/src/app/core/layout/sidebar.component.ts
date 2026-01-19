import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/shipments">Shipments</a>
      <a routerLink="/customers">Customers</a>
      <a routerLink="/reports">Reports</a>
      <a routerLink="/settings">Settings</a>
    </nav>
  `
})
export class SidebarComponent {}
