import React from 'react'
import { RouterProvider } from "react-router-dom"
import {router} from "./api.router"

const App = () => {
  return (
   <RouterProvider router={router}/>
  )
}

export default App