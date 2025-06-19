import { Routes } from '@angular/router';
import { Layout } from '../components/layout/layout';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Products } from '../pages/products/products';
import { ServiceOrders } from '../pages/service-orders/service-orders';
import { AuthGuard } from './auth-guard';
import { LoginGuard } from './login-guard';

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
      {
        path: 'service-orders',
        component: ServiceOrders,
      },
      {
        path: 'products',
        component: Products,
      },
    ]
  },
  {
    path: "auth",
    canActivate: [LoginGuard],
    children: [
      {
        path: 'login',
        component: Login
      }
    ]
  }
];
