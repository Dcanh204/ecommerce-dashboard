import { useEffect, useState } from 'react';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { get_me } from './stores/Reducers/authReducer';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes(prev => [...prev, routes]);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(get_me());
    }
  }, [token, dispatch])
  return <Router allRoutes={allRoutes} />
};

export default App;