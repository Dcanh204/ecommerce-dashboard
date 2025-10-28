import { lazy } from "react";
const Home = lazy(() => import('../../pages/Home.jsx'))
const SellerDashboard = lazy(() => import('../../pages/seller/SellerDashboard.jsx'))
const AddProduct = lazy(() => import('../../pages/seller/AddProduct.jsx'))
export const sellerRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller']
  },
  {
    path: '/seller/dashboard',
    element: <SellerDashboard />,
    ability: ['seller']
  },
  {
    path: '/seller/dashboard/add-product',
    element: <AddProduct />,
    ability: ['seller']
  }
]
