import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard'))
export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin'
  }
]
