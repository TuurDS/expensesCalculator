import React from 'react'
import { Navigate } from 'react-router';
import { useSession } from '../hooks/useSession';

export default function PrivateRoute(props) {
    const { isAuth, user } = useSession();

    if (!isAuth || !user) {
        return <Navigate to="/login" />
    }

    if (props.roleBlacklist && props.roleBlacklist.includes(user.role)) {
        return <Navigate to="/login" />
    }
    return props.children;
}
