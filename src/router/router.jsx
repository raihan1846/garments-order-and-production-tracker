import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ProductDetails from "../pages/Home/Product/ProductDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/Home/Product/AddProduct";
import Dashboard from "../pages/Home/Dashboard/Dashboard";
import ManageUser from "../pages/Home/Dashboard/ManageUser";
import AdminDashboard from "../pages/Home/Dashboard/AdminDashboard";
import ManagerDashboard from "../pages/Home/Dashboard/ManagerDashboard";
import BuyerDashboard from "../pages/Home/Dashboard/BuyerDashboard";
import Product from "../pages/Home/Product/Product";
import ProductList from "../pages/Home/Product/ProductList";
import EditProduct from "../pages/Home/Product/EditProduct";
import Profile from "../pages/Home/Dashboard/Profile";
import UpdateProfile from "../pages/Home/Dashboard/UpdateProfile";
import OrderPage from "../pages/Home/Product/OrderPage";
import AllOrders from "../pages/Home/Product/AllOrders";
import OrderDetails from "../pages/Home/Product/OrderDetails";
import MyOrders from "../pages/Home/Product/MyOrders";
import TrackOrder from "../pages/Home/Product/TrackOrder";

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
        path: '/products',
        element: <PrivateRoute><Product></Product></PrivateRoute>
      },
      {
        path: '/productLists',
        element: <PrivateRoute><ProductList></ProductList></PrivateRoute>
      },
      {
        path: '/productDetails/:id',
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: '/order/:productId',
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        )
      },
      {
        path: "/dashboard/all-orders",
        element: (
          <PrivateRoute>
            <AllOrders />
          </PrivateRoute>
        )
      },
      {
        path: '/dashboard/my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        )
      },
      {
        path: '/dashboard/track-order',
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        )
      },
      {
        path: "/dashboard/order-details/:id",
        element: (
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        )
      }
      ,
      {
        path: '/editProduct/:id',
        element: <PrivateRoute><EditProduct></EditProduct></PrivateRoute>
      },
      {
        path: '/addProduct',
        element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
      },
      {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/updateProfile',
        element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
      },
      {
        path: '/dashboard/manage-users',
        element: <PrivateRoute><ManageUser></ManageUser></PrivateRoute>
      },

    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
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

