import React, {useState, useEffect} from 'react'

import bentocake from '../../assets/img/build.jpg'
import weddingcake from '../../assets/img/wedding.jpg'
import gendercake from '../../assets/img/gender.jpeg'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'

/* -------------------- NOTES ----------------------------

    need : checkout



   -------------------------------------------------------
*/
const Home = () => {
 return(
    <>
    <div class="page landing-page">
        <section class="clean-block clean-hero" id="mainbanner">{/*style="background-image: url(&quot;assets/img/luzzy1.jpg&quot;);color: rgba(9, 162, 255, 0.85);" */}      
			<div class="text d-block d-md-none">
                {/*}
                <h2>LUZZY'S SUPREME SWEETS</h2>
                <p>CAKES MAKE EVERYTHING BETTER</p><button class="btn btn-lg btn-primary" type="button" onClick={() => window.location.href="/shop"}>SHOP NOW</button>
                */}
            </div>
        </section>
        
        <section class="clean-block clean-info dark">
            <div class="container" id="infocakes">
                <div class="block-heading">
                    <h2 class="text-info">Our cakes are made with love and care</h2>
                    <p>We at Luzzy's Supreme Sweets ensure that our product is fresh baked and clean for the sake of our lovable customer's health and satisfaction.<br/></p>
                </div>
            </div>
        </section>
        <section class="moneycake">
            <div class="container" id="infocakes">
            <div class="row align-items-center">
                    <div class="col-md-6 align-items-center"><img class="img-thumbnail cakebox" src={bentocake}/></div>
                    <div class="col-md-6">
                        <h3>Build a Cake</h3>
                        <div class="getting-started-info">
                            <p>Build your dream cake online.</p>
                        </div><button class="btn btn-primary btn-lg" type="button" onClick={() => window.location.href="/build-cake"}>Build Now</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="gendercake">
            <div class="container" id="infocakes">
            { /* gender cake at tablet - pc screen */}
                <div class="d-none d-md-block">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h3>Gender Reveal Cake</h3>
                            <div class="getting-started-info">
                                <p>Surprise your partner about the gender of your baby with our gender reveal themed cakes.</p>
                            </div><button class="btn btn-outline-primary btn-lg" type="button" onClick={() => {localStorage.setItem('shopcat','Gender');window.location.href="/shop"}}>Shop Now</button>
                        </div>
                        <div class="col-md-6"><center><img class="img-thumbnail cakebox-center" src={gendercake}/></center></div>
                    </div>
                </div>
                { /* gender cake at mobile screen */ }
                <div class="d-block d-md-none">
                    <div class="row align-items-center">
                    <div class="col-md-6"><img class="img-thumbnail cakebox" src={gendercake}/></div>
                        <div class="col-md-6">
                            <h3>Gender Reveal Cake</h3>
                            <div class="getting-started-info">
                                <p>Surprise your partner about the gender of your baby with our gender reveal themed cakes.</p>
                            </div><button class="btn btn-outline-primary btn-lg" type="button" onClick={() => {localStorage.setItem('shopcat','Gender');window.location.href="/shop"}}>Shop Now</button>
                        </div>
                    </div>
                </div>
                { /* end of bday cake */ }
            </div>
        </section>
        <section class="weddingcake">
            <div class="container" id="infocakes">
                <div class="row align-items-center">
                    <div class="col-md-6"><img class="img-thumbnail cakebox" src={weddingcake}/></div>
                    <div class="col-md-6">
                        <h3>Wedding Cake</h3>
                        <div class="getting-started-info">
                            <p>Celebrate your wedding with our premium quality wedding themed cakes.</p>
                        </div><button class="btn btn-primary btn-lg" type="button" onClick={() => {localStorage.setItem('shopcat','Wedding');window.location.href="/shop"}}>Shop Now</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="clean-block features" id="contactlocation">
            <div class="container">
                <div class="block-heading">
                    <h2 class="text-info">Location</h2>
                    <p>Plan to visit luzzy? here's our location.</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col">
                        <section class="map-clean">
                            
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.54264115454484!2d120.8528194569895!3d14.38778671514595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962dac2c846aab%3A0x1fdc314eaaba922e!2sFireweed%20St%20Sta.%20Cecilia!5e0!3m2!1sen!2sph!4v1675587816842!5m2!1sen!2sph" width="100%" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </section>
                        { /* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241.54264115454484!2d120.8528194569895!3d14.38778671514595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962dac2c846aab%3A0x1fdc314eaaba922e!2sFireweed%20St%20Sta.%20Cecilia!5e0!3m2!1sen!2sph!4v1675587816842!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3864.5642508315696!2d120.8568223!3d14.3946051!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962d636ea710fd%3A0xbbe206bf651b9b03!2sLuzzy&#39;s%20supreme%20sweets!5e0!3m2!1sen!2sph!4v1655284266410!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>*/}
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 feature-box">
                        <i class="icon-location-pin icon"></i>
                        <p>Location : 27 fireweed st. Sta Cecilia 1, Mulawin, Tanza, Cavite</p>
                    </div>
                    <div class="col-12 feature-box"><i class="icon-envelope-letter icon"></i>
                        <p>Email : elimancoluzell@gmail.com</p>
                    </div>
                    <div class="col-12 feature-box"><i class="icon-phone icon"></i>
                        <p>Number : 09150215630</p>
                    </div>
                    <div class="col-12 feature-box"><i class="icon-clock icon"></i>
                        <p>Store Hours : 8am to 7pm</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
    )
}

export default Home
