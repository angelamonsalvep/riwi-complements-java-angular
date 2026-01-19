import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page')
            .then(m => m.DashboardPage)
      },
      {
        path: 'shipments',
        loadComponent: () =>
          import('./shipments/shipments.page')
            .then(m => m.ShipmentsPage)
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./customers/customers.page')
            .then(m => m.CustomersPage)
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./reports/reports.page')
            .then(m => m.ReportsPage)
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.page')
            .then(m => m.SettingsPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
