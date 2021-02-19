import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// // React.FC<IPrivateRouteProps>
export const PrivateRoute  = ({
    isAuthenticated,
    component: Component,
    ...rest
}:any) => {


    return (
        <Route {...rest}
            component={ (props:any) => (
                (isAuthenticated === false)
                ? ( <Component {...props} /> )
                : ( <Redirect to="/" /> )
            )

            }
        />
    )
}

// export const PrivateRoute = ({component, isAuthenticated, ...rest}: any) => {
//     const routeComponent = (props: any) => (
//         isAuthenticated
//             ? React.createElement(component, props)
//             : <Redirect to={{pathname: '/login'}}/>
//     );
//     return <Route {...rest} render={routeComponent}/>;
// };


