import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ErrorScreen } from '../components/error/ErrorScreen'
import { NavBar } from '../components/ui/NavBar'
import { HomeScreen } from '../components/home/HomeScreen';

export const SalesRouter = () => {
    return (
        <>
            <div>
                <NavBar />
                <div className="container">
                    <Switch>
                        
                        <Route  
                            exact path="/"
                            component={ HomeScreen }
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
