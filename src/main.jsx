import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from '../components/Login/Login.jsx'
import Notes from '../components/Notes/Notes.jsx'
import Main_login from "../components/Main_login.jsx"
import { useState, useEffect, useRef, useCallback } from 'react'

// let [logg_ed,setlogg_ed]=useState(false);
// const update_logged=(val)=>{
//   setlogg_ed(val);
// }

const router = createBrowserRouter(
  [{
    path: "/",
    // element: logg_ed?<Notes updatelogged={update_logged}/>:<Login updatelogged={update_logged}/>
    element: <Login status={true} code={null}/>
  },
  {
    path: "/Notes",
    element: <Notes/>
  },
  {
    path: "/login/ip",
    element: <Login status={false} code={"ip"}/>
  },
  {
    path: "/login/nr",
    element: <Login status={false} code={"nr"}/>
  },
  {
    path: "/login/ar",
    element: <Login status={false} code={"ar"}/>
  }
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App/> */}
  </React.StrictMode>
)
