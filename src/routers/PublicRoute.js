
import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux'
// import { login } from '../actions/auth'

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    
    return (
        <Route
            {...rest}
            component={(props) => (
                (isAuthenticated)
                    ? (<Redirect to="/" />)
                    : (<Component {...props} />)
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

