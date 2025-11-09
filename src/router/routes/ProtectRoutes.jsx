import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoutes = ({ children, route }) => {
  const { role, userInfo, loading } = useSelector(state => state.auth);
  if (loading) {
    return null;
  }
  if (!role) {
    return <Navigate to='/login' replace />
  }
  if (route.visibility) {
    if (route.visibility?.some(r => r === userInfo.status)) {
      return <Suspense fallback={null}>{children}</Suspense>
    }
  }
  if (userInfo.role === route.role) {
    if (userInfo.status === route.status) {
      return <Suspense fallback={null}>{children}</Suspense>
    }

    if (userInfo.status === 'pending') {
      return <Navigate to='/seller/account-pending' />
    }
    if (userInfo.status === 'deactive') {
      return <Navigate to='/seller/account-deactive' replace />
    }
  }
  return <Navigate to='/unauthorized' />
};
export default ProtectRoutes;