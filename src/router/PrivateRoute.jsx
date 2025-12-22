import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const {user, loading} = useAuth();

    if(loading){
        return <div>
            <span className="loading loading-spinner text-error"></span>

        </div>
    }
    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;