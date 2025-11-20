import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { PagesComponent } from './pages.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

export const pagesRoutes: Routes = [
    { path: '', component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'vacancies', component: VacanciesComponent },
          { path: 'vehicles', component: VehiclesComponent },
        ],
      },
      { path: '**', redirectTo: '' },
];