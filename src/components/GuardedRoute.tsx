import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';

interface GuardedRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    path: string;
}

export const GuardedRoute = (props: GuardedRouteProps) => {
    const { component: Component, ...rest } = props;
    const isSignedIn = !!localStorage.getItem("token");

    return (
        <Route
            {...rest}
            path={props.path}
            render={(routeProps) =>
                isSignedIn ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to='/login'
                        />
                    )
            }
        />
    );
};