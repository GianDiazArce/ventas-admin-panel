import React from 'react'
import { Switch, Route, Redirect, useLocation, } from 'react-router-dom';
import { ErrorScreen } from '../components/error/ErrorScreen'
import { HomeScreen } from '../components/home/HomeScreen';
// import { Sidebar } from '../components/ui/Sidebar';
import { Categories } from '../components/categories/Categories';
import { SemanticSideBar } from '../components/ui/SemanticSideBar';
import { ProductsScreen } from '../components/products/ProductsScreen';
import { SupplierScreen } from '../components/supplier/SupplierScreen';
import { SalesScreen } from '../components/sales/SalesScreen';
import { DetailSale } from '../components/sales/DetailSale';

interface Props {
    isAuthenticated?: boolean
}

export const SalesRouter = ({isAuthenticated}:Props) => {

    const location = useLocation();
    // Condicion para comprobar isAuthenticated
    if(isAuthenticated === false){
        return <Redirect to="/" />
    }
    console.log(location.pathname);
    

    return (
        <>
            <div>
                {/* <Sidebar /> */}
                <SemanticSideBar >
                    <div className="container" style={{minHeight: '800px'}}>
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
                                exact path="/productos"
                                component={ ProductsScreen }
                            />
                            <Route  
                                exact path="/suppliers"
                                component={ SupplierScreen }
                            />
                            <Route  
                                exact path="/sales"
                                component={ SalesScreen }
                            />
                            <Route  
                                exact path="/sales/:id"
                                component={ DetailSale }
                            />
                            <Route  
                                exact path="/error"
                                component={ ErrorScreen }
                            />
                            <Redirect to="/error" />
                        </Switch>
                    </div>
                </SemanticSideBar>
            </div>
        </>
    )
}
