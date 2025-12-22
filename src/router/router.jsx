import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ProductDetails from "../pages/Home/Product/ProductDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/productDetails',
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register

      }
    ]
  }
]);

 