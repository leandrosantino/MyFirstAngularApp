import { Routes } from '@angular/router';
import { Layout } from '../components/layout/layout';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: Home,
      },
    ]
  },
  {
    path: "auth",
    children: [
      {
        path: 'login',
        component: Login
      }
    ]
  }
];
