import { useLocation , Navigate , Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken , selectCurrentRoles } from "./authSlice";
import React from 'react'

const RequireAuth = ({ allowedRoles }) => {
    const token=useSelector(selectCurrentToken)
    const location=useLocation()
    const roles=useSelector(selectCurrentRoles)
    return (
        token
            ? (roles?.find(role=>allowedRoles?.includes(role.authority)))
                ?  <Outlet />
                : <Navigate to="/forbidden" state={{ from: location }} replace />
            :<Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth