
import MainLayout from "../../layout/MainLayout";
import NotFound from "../../pages/NotFound";
import { privateRoutes } from "./privateRoutes";
import ProtectRoutes from "./ProtectRoutes";
import Pending from '../../pages/Pending'
import Deactive from '../../pages/Deactive'
export const getRoutes = () => {

  privateRoutes.forEach(r => {
    r.element = <ProtectRoutes route={r}>{r.element}</ProtectRoutes>
  })
  return {
    path: '/',
    element: <MainLayout />,
    children: [
      ...privateRoutes,
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: 'seller/account-pending',
        element: <Pending />
      },
      {
        path: 'seller/account-deactive',
        element: <Deactive />
      },
    ]
  }
}

