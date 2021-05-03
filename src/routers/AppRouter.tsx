import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
  } from "react-router-dom";
// import { PrivateRoute } from "./PrivateRoute";
// import { AuthRouter } from "./AuthRouter";
import { SalesRouter } from './SalesRouter';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector((state:RootStateOrAny) => state.auth);
    useEffect(() => {
        dispatch( startChecking() )
    }, [dispatch])
    console.log(!!uid)

    if( checking ) {
        return (<h5>Espere...</h5>)
    }
// console.log(!!!uid);
    return (
        <Router>
            <div style={{backgroundColor: '#ccc'}}>
                <Switch>
                    {/* <PrivateRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ !!uid }
                    />
                    <Route
                        path = '/'
                        component={ SalesRouter }
                        isAuthenticated={ !!uid }
                    /> */}

                    {
                        // !!uid === false 
                        !uid 
                        ?
                        <Route 
                        exact
                            path = "/home"
                            component={ LoginScreen }
                        />
                        :
                        <Route 
                            path = '/'
                            component={ SalesRouter }
                        />
                    }

                    {/* {
                        !isLogged ? <Redirect to="/home" /> : <Redirect to="/home" />
                    } */}
                    <Redirect to="/home" />
                    
                </Switch>
            </div>
        </Router>
    )

}