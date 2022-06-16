import React from 'react'
import { Route, Switch } from 'react-router'
import ProtectedRoute from './ProtectedRoute.js'
import AdminRoute from './AdminRoute.js'

// directories >.<
import Home from '../home/Home'
import About from '../about/about'
import ContactUs from '../contact-us/ContactUs'
import Login from '../login/Login'
import Register from '../login/Register'
import Shop from '../shop/Shop'
import ProductInfo from '../product-info/ProductInfo'
import Cart from '../cart/Cart'
import Reservation from '../reservation/Reservation'
import TrackOrder from '../trackorder/Trackorder'
import Myaccount from '../myaccount/myaccount'

// admin directories
import AdminHome from '../adminhome/Adminhome'

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
                <Route exact path="/Reservation" component={Reservation}/>
                <Route exact path="/Track" component={TrackOrder}/>
                <ProtectedRoute exact path="/myaccount" component={Myaccount}/>
                <AdminRoute exact path="/admindashboard" component={AdminHome}/>
                <Route component={Notfound} /> 
            </Switch>
        </div>
    )
}

export default RouteTree
