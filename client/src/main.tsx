import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import ErrorPage from './error-page.tsx';
import Dashboard from './pages/dashbord/dashboard.tsx';
import LogIn from './pages/auth/login/login.tsx';
import SignUp from './pages/auth/signup/signup.tsx';
import './index.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <LogIn />,
    errorElement: <ErrorPage />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/error',
    element: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
