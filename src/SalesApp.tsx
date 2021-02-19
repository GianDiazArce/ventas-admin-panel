import React from 'react'
import { Provider } from "react-redux";
import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';
import 'semantic-ui-css/semantic.min.css'

export const SalesApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
