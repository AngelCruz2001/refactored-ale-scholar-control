import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Main } from '../components/general/Main'

export const DashBoardRoutes = ({ history }) => {
    console.log("Main")
    return (
        <>
            <Switch>
                <Route path='/' component={Main} />
                <Redirect to='/' />
            </Switch>
        </>
    )
}