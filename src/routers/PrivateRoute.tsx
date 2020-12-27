import { Route, Redirect, RouteProps } from 'react-router-dom'

interface IPrivateRouteProps extends RouteProps {
    isAuthenticated: boolean // is authenticate route
    exact?: boolean;
    path: string;
    // redirectPath: string // redirect path if don't authenticate route
    component: any
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {


    return (
        <Route {...rest}
            component={ (props:any) => (
                (isAuthenticated)
                ? ( <Component {...props} /> )
                : ( <Redirect to="/login" /> )
            )

            }
        />
    )
}


