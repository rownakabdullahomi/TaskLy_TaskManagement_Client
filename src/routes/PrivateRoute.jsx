/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../providers/AuthProvider";
// import Loading from "../pages/Loading";

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuthContext();
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