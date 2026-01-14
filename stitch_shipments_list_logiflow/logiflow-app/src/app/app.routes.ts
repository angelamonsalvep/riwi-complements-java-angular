import { Routes } from '@angular/router';
import { CustomersList } from './customers-list/customers-list';
import { Dashboard } from './dashboard/dashboard';
import { OperationalReports } from './operational-reports/operational-reports';
import { Settings } from './settings/settings';
import { ShipmentsList } from './shipments-list/shipments-list';
import { TrackAndTraceDetail } from './track-and-trace-detail/track-and-trace-detail';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'customers-list', component: CustomersList },
    { path: 'operational-reports', component: OperationalReports },
    { path: 'settings', component: Settings },
    { path: 'shipments-list', component: ShipmentsList },
    { path: 'track-and-trace-detail', component: TrackAndTraceDetail }
];