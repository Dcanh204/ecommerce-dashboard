import { lazy } from 'react';
const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard'))
const Orders = lazy(() => import('../../pages/admin/Orders'))
const Category = lazy(() => import('../../pages/admin/Category'))
const Sellers = lazy(() => import('../../pages/admin/Sellers'))
const PaymentRequest = lazy(() => import('../../pages/admin/PaymentRequest'))
const DeactiveSellers = lazy(() => import('../../pages/admin/DeactiveSellers'))
const SellerRequest = lazy(() => import('../../pages/admin/SellerRequest'))
const SellerDetails = lazy(() => import('../../pages/admin/SellerDetails'))
const ChatSellers = lazy(() => import('../../pages/admin/ChatSellers'))
const OrderDetails = lazy(() => import('../../pages/admin/OrderDetails'))


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
  {
    path: 'admin/dashboard/deactive-sellers',
    element: <DeactiveSellers />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/sellers-request',
    element: <SellerRequest />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/sellers/:id',
    element: <SellerDetails />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/chat-seller',
    element: <ChatSellers />,
    role: 'admin'
  },
  {
    path: 'admin/dashboard/orders/:id',
    element: <OrderDetails />,
    role: 'admin'
  },
]
