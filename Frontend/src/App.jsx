import React from 'react'
import { RouterProvider } from "react-router-dom"
import {router} from "./api.router"
import { AuthProvider } from "./features/auth/auth.context"

const App = () => {
  return (
   <AuthProvider>
     <RouterProvider router={router}/>
   </AuthProvider>
  )
}

export default App