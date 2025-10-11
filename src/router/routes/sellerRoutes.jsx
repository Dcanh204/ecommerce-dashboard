import { lazy } from "react";
const Home = lazy(() => import('../../pages/Home.jsx'))

export const sellerRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller']
  }
]
