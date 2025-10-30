import { lazy } from "react";
const Home = lazy(() => import('../../pages/Home.jsx'))
const SellerDashboard = lazy(() => import('../../pages/seller/SellerDashboard.jsx'))
const AddProduct = lazy(() => import('../../pages/seller/AddProduct.jsx'))
const Product = lazy(() => import('../../pages/seller/Product.jsx'))
const DiscountProduct = lazy(() => import('../../pages/seller/DiscountProduct.jsx'))
const Orders = lazy(() => import('../../pages/seller/Orders.jsx'))
const Payment = lazy(() => import('../../pages/seller/Payment.jsx'))
export const sellerRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller']
  },
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
    path: '/seller/dashboard/discount-product',
    element: <DiscountProduct />,
    role: 'seller',
    status: 'active'
  },
  {
    path: '/seller/dashboard/orders',
    element: <Orders />,
    role: 'seller',
    ability: ['active', 'deactive']
  },
  {
    path: '/seller/dashboard/payments',
    element: <Payment />,
    role: 'seller',
    status: 'active'
  }
]
