import { lazy } from 'react';
const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard'))
const Orders = lazy(() => import('../../pages/admin/Orders'))
const Category = lazy(() => import('../../pages/admin/Category'))
const Sellers = lazy(() => import('../../pages/admin/Sellers'))
const PaymentRequest = lazy(() => import('../../pages/admin/PaymentRequest'))
export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/orders',
    element: <Orders />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/category',
    element: <Category />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/sellers',
    element: <Sellers />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/payment-request',
    element: <PaymentRequest />,
    role: 'admin'
  },
]
