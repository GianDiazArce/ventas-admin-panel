import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";
import { SalesRouter } from './SalesRouter';


export const AppRouter = () => {

    const [isAuthenticated, ] = useState(false);

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isAuthenticated }
                    />
                    <PublicRoute 
                        path = "/"
                        component= { SalesRouter }
                        isAuthenticated={ isAuthenticated }
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )

}