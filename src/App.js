import React from 'react'
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import styles from "./sass/styles.scss";
export const App = () => {
    return (
        <Provider store={store}>

            <AppRouter />

        </Provider>

    )
}
