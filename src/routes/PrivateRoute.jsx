/* eslint-disable react/prop-types */
import {  useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
// import Loading from "../pages/Loading";

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        // return <Loading></Loading>
        return "Loading...."
    }
    if(user && user?.email){
        return children;
    }

    return (
        <Navigate state={location} to={"/login"}></Navigate>
    );
};

export default PrivateRoute;