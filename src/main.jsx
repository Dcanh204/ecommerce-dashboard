import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import store from './stores/index.js'
const App = lazy(() => import('./App.jsx'))
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#283046',
              color: 'white',
              fontSize: '12px'
            }
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
)
