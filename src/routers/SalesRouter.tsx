import React from 'react'
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { ErrorScreen } from '../components/error/ErrorScreen'
// import { NavBar } from '../components/ui/NavBar'
import { HomeScreen } from '../components/home/HomeScreen';
import { Sidebar } from '../components/ui/Sidebar';
import { Categories } from '../components/categories/Categories';

interface ISalesRouterProps extends RouteProps {
    isAuthenticated: boolean
}

export const SalesRouter:React.FC<ISalesRouterProps> = ({isAuthenticated}) => {

    // Condicion para comprobar isAuthenticated


    return (
        <>
            <div>
                <Sidebar />
                <div className="container">
                    <Switch>
                        
                        <Route  
                            exact path="/"
                            component={ HomeScreen }
                        />
                        <Route  
                            exact path="/home"
                            component={ HomeScreen }
                        />
                        <Route  
                            exact path="/categorias"
                            component={ Categories }
                        />
                        <Route  
                            exact path="/error"
                            component={ ErrorScreen }
                        />
                        <Redirect to="/error" />
                    </Switch>
                </div>
            </div>
        </>
    )
}
