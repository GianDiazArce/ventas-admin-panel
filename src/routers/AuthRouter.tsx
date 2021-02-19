import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AuthRouter = () => {
    return (
        <>

            <div >
                <div >
                    <Switch>
                        <Route 
                            exact path="/login" 
                            component={ LoginScreen } 
                        />
                        {/* <Route 
                            exact path="/auth/register" 
                            component={ RegisterScreen } 
                        /> */}

                        <Redirect to="/login" />
                    </Switch>
                </div>
                
            </div>
        </>
    )
}
