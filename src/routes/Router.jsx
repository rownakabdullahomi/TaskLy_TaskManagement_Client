import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: "404 not found",
        children: [
           { path: "/", element: <PrivateRoute><Home/></PrivateRoute>}
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register/>},
])

export default router;
