import React from 'react'
import { Route, Switch } from 'react-router'
import ProtectedRoute from './ProtectedRoute.js'

import Home from '../home/Home'


function RouteTree() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                { /*<ProtectedRoute exact path="/masterlist" component={masterlist}/> 

                <Route component={NotFound} /> */ }
            </Switch>
        </div>
    )
}

export default RouteTree
