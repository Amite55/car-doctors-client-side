import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Home/Login";
import SignUp from "../pages/SignUp";
import CheckOut from "../pages/CheckOut";
import Bookings from "../pages/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/signUp',
          element: <SignUp/>
        },
        {
          path: '/checkOut/:id', 
          element: <PrivateRoute><CheckOut/></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        }, 
        {
          path: '/bookings',
          element: <PrivateRoute><Bookings/></PrivateRoute>
        }
      ]
    },
  ]);

  export default router;