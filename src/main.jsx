import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient();


import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AuthProvider from './Components/Provider/AuthProvider';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  
  


   <QueryClientProvider client={queryClient}>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
    </QueryClientProvider>
 
  </StrictMode>,
)
