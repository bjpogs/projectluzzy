import React from 'react'
import { Route, Switch } from 'react-router'
import ProtectedRoute from './ProtectedRoute.js'

// directories >.<
import Home from '../home/Home'
import About from '../about/about'
import ContactUs from '../contact-us/ContactUs'

// not found page 
import Notfound from '../templates/Notfound'

function RouteTree() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/About" component={About}/>
                <Route exact path="/Contact-Us" component={ContactUs}/>
                { /*<ProtectedRoute exact path="/masterlist" component={masterlist}/> */ }

                <Route component={Notfound} /> 
            </Switch>
        </div>
    )
}

export default RouteTree
