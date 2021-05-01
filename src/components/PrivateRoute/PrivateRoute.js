import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');

    return (
        <Route {...rest}
            render={({ location }) =>
                user.isLoggedIn || token ? (
                    children
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;