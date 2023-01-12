import React from 'react'
import { Navigate } from 'react-router-dom';
import { User } from '../types/User'

interface PrivateRouteProps  {
    user: User|null;
    children: JSX.Element;
    redirectPath: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({user, children, redirectPath}) => {    
    if(!user){
        console.warn(`Private route ${user}`);
        return <Navigate to={redirectPath} replace />
    }

    return children;
}
