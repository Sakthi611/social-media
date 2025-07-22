import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ViewStory from './pages/ViewStory.jsx';
import Profile from './pages/Profile.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/stories/:id/:tot',
    element:<ViewStory/>,
  },
  {
    path:'/profile',
    element:<Profile/>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
