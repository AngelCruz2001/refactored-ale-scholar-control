import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router, Switch
} from 'react-router-dom';
import { authStartChecking } from '../actions/auth';
import { AuthRouter } from './AuthRouter';
import { DashBoardRoutes } from './DashBoardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = ({ history }) => {

    const dispatch = useDispatch();
    const { logged } = useSelector(state => state.auth)
    // const logged = true;
    useEffect(() => {
        dispatch(authStartChecking())
    }, [dispatch])
    return (
        <Router>
            <main>
                <Switch>
                    <PublicRoute
                        exact
                        path="/auth/login"
                        isAuthenticated={logged}
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        path="/"
                        isAuthenticated={logged}
                        component={DashBoardRoutes}
                    />

                </Switch>
            </main>
        </Router>
    )
}


