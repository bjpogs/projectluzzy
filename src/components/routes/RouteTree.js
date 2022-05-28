import React from 'react'
import { Route, Switch } from 'react-router'
import ProtectedRoute from './ProtectedRoute.js'

// directories >.<
import Home from '../home/Home'
import About from '../about/about'
import ContactUs from '../contact-us/ContactUs'
import Login from '../login/Login'
import Register from '../login/Register'
import Shop from '../shop/Shop'
import ProductInfo from '../product-info/ProductInfo'
import Cart from '../cart/Cart'

// not found page 
import Notfound from '../templates/Notfound'

function RouteTree() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/About" component={About}/>
                <Route exact path="/Contact-Us" component={ContactUs}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/Register" component={Register}/>
                <Route exact path="/Shop" component={Shop}/>
                <Route exact path="/Product-Info" component={ProductInfo}/>
                <Route exact path="/Cart" component={Cart}/>
                { /*<ProtectedRoute exact path="/masterlist" component={masterlist}/> */ }

                <Route component={Notfound} /> 
            </Switch>
        </div>
    )
}

export default RouteTree
