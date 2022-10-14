import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'

export const AuthRouter = ({ history }) => {

    return (
        <div className="">
            <div className="">
                <Switch>
                    <Route
                        exact
                        path="/auth"
                        component={LoginScreen}
                    />
                    <Redirect to="/auth" />
                </Switch>
            </div>
        </div>
    )
}
