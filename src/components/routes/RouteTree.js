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
import Build from '../build/build'
import Order from '../order/order.js'
import Trackreservation from '../trackreservation/trackreservation'

// admin directories
import AdminHome from '../adminhome/Adminhome'
import Customorder from '../customorder/customorder'
import Reservationorder from '../reservationorder/Reservationorder'
import Products from '../products/Products'
import Builder from '../adminbuild/adminbuild'

// not found page 
import Notfound from '../templates/Notfound'

function RouteTree() {
    return (
        <div>
            <Switch>
                <Route exact path="/index" component={Home}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/About" component={About}/>
                <Route exact path="/Contact-Us" component={ContactUs}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/Register" component={Register}/>
                <Route exact path="/Shop" component={Shop}/>
                <Route exact path="/Product-Info" component={ProductInfo}/>
                <ProtectedRoute exact path="/Cart" component={Cart}/>
                <ProtectedRoute exact path="/Order" component={Order}/>
                <Route exact path="/Reservation" component={Reservation}/>
                <Route exact path="/Track" component={TrackOrder}/>
                <Route exact path="/build-a-cake" component={Build}/>
				<Route exact path="/trackreservation" component={Trackreservation}/>
                <ProtectedRoute exact path="/myaccount" component={Myaccount}/>
                <AdminRoute exact path="/admin/regular-order" component={AdminHome}/>
                <AdminRoute exact path="/admin/custom-order" component={Customorder}/>
                <AdminRoute exact path="/admin/reservation-order" component={Reservationorder}/>
                <AdminRoute exact path="/admin/products" component={Products}/>
                <AdminRoute exact path="/admin/build" component={Builder}/>
                <Route component={Notfound} /> 
            </Switch>
        </div>
    )
}

export default RouteTree
