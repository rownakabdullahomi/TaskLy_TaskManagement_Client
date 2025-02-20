import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: "404 not found",
        children: [
           { path: "/", element: <Home/>}
        ]
    }
])

export default router;
