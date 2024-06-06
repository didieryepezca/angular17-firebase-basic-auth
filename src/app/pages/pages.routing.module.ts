import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { PstServicesComponent } from './pst-services/pst-services.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    children: [      
      {
        path: 'pst-services',
        component: PstServicesComponent
      },
      {
        path: 'dashboard',
        component: AppDashboardComponent
      }
    ]
  }  
];