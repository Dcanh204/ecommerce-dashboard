import { lazy } from "react";
const Login = lazy(() => import('../../pages/auth/Login'));
const Register = lazy(() => import('../../pages/auth/Register'));
const AdminLogin = lazy(() => import('../../pages/auth/AdminLogin'))
const Home = lazy(() => import('../../pages/Home.jsx'))
const UnAuthorize = lazy(() => import('../../pages/UnAuthorize.jsx'))

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/unauthorized',
    element: <UnAuthorize />
  },

]

export default publicRoutes