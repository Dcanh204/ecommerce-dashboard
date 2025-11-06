import { lazy } from "react";
const SellerDashboard = lazy(() => import('../../pages/seller/SellerDashboard.jsx'))
const AddProduct = lazy(() => import('../../pages/seller/AddProduct.jsx'))
const Product = lazy(() => import('../../pages/seller/Product.jsx'))
const DiscountProduct = lazy(() => import('../../pages/seller/DiscountProduct.jsx'))
const Orders = lazy(() => import('../../pages/seller/Orders.jsx'))
const Payment = lazy(() => import('../../pages/seller/Payment.jsx'))
const ChatCustomers = lazy(() => import('../../pages/seller/ChatCustomers.jsx'))
const ChatSupport = lazy(() => import('../../pages/seller/ChatSupport.jsx'))
const Profile = lazy(() => import('../../pages/seller/Profile.jsx'))
const EditProduct = lazy(() => import('../../pages/seller/EditProduct.jsx'))
const OrderDetails = lazy(() => import('../../pages/seller/OrderDetails.jsx'))

export const sellerRoutes = [
  {
    path: '/seller/dashboard',
    element: <SellerDashboard />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/add-product',
    element: <AddProduct />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/products',
    element: <Product />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/products/edit/:id',
    element: <EditProduct />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/discount-product',
    element: <DiscountProduct />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/orders',
    element: <Orders />,
    role: 'seller',
    visibility: ['active', 'deactive']
  },
  {
    path: '/seller/dashboard/orders/:id',
    element: <OrderDetails />,
    role: 'seller',
    visibility: ['active', 'deactive']
  },
  {
    path: '/seller/dashboard/payments',
    element: <Payment />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/chat-customer',
    element: <ChatCustomers />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/chat-support',
    element: <ChatSupport />,
    role: 'seller',
    visibility: ['active', 'deactive', 'pending']
  },
  {
    path: '/seller/dashboard/profile',
    element: <Profile />,
    role: 'seller',
    visibility: ['active', 'deactive', 'pending']
  },
]
