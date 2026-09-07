import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/page/login'
import Register from "./features/auth/page/Register"




export const router=createBrowserRouter([
  {
    path:"/login",
     element:<Login/>
  },
   {
    path:"/register",
     element:<Register/>
  },
  {
    path:"/",
     element:<h1>Home page</h1>
  },


])
