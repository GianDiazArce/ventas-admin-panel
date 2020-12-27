import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
  } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AuthRouter } from "./AuthRouter";
import { SalesRouter } from './SalesRouter';


export const AppRouter = () => {

    const [isAuthenticated, ] = useState(false);

    return (
        <Router>
            <div style={{backgroundColor: '#ccc'}}>
                <Switch>
                    <PrivateRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isAuthenticated }
                    />
                    <Route
                        path = '/'
                        component={ SalesRouter }
                        isAuthenticated={isAuthenticated}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )

}