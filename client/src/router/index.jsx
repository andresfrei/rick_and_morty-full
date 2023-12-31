import { createBrowserRouter } from 'react-router-dom'
import LayoutPage from '../layouts/LayoutPage'

import Home from '../pages/Home'
import About from '../pages/About'
// import Detail, { loaderCharacter } from '../pages/Detail'
import Detail from '../pages/Detail'
import Landing from '../pages/Landing'
import Login from '../pages/Login'

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

import Error from '../components/Error/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage/>,
    errorElement: <Error/>,
    children: [
      { path: '/', element: <Landing/> },
      { path: '/about', element: <About/> },
      { path: '/login', element: <Login /> },
      {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
          { path: '/home', element: <Home /> },
          {
            path: '/detail/:id',
            element: <Detail/>
            /* loader: loaderCharacter */
          }
        ]
      }
    ]
  }
])

export default router
