import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/page/login'
import Register from "./features/auth/page/Register"
import Protected from './features/auth/components/protected'
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/Interview'
import Landing from './features/landing/Landing'




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
     element:<Landing/>
  },
  {
    path:"/app",
     element:<Protected><Home/></Protected>
  },
   {
    path:"/interview/:interviewId",
      element:<Protected><Interview/></Protected>
  },


])
