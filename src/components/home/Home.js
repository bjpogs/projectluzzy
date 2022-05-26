import React, {useState, useEffect} from 'react'

import gradcake from '../../assets/img/gradcake.jpg'
import bdaycake from '../../assets/img/hbd.jpeg'
import gendercake from '../../assets/img/gender.jpeg'

// navbar and footer template
import Navbar from '../templates/Navbar'
import Footer from '../templates/Footer'

/* -------------------- NOTES ----------------------------

    cake image size between 425px to 768 for tablet portrait view
    gallery nalang ung sa about? or + gallery -.?
    add natin mga buttons mamaya okiraa?




   -------------------------------------------------------
*/
const Home = () => {
 return(
    <>
    <Navbar/>
    <main class="page landing-page">
        <section class="clean-block clean-hero" id="mainbanner">{/*style="background-image: url(&quot;assets/img/luzzy1.jpg&quot;);color: rgba(9, 162, 255, 0.85);" */}
            <div class="text">
                <h2>LUZZY'S SUPREME SWEETS</h2>
                <p>CAKES MAKE EVERYTHING BETTER</p><button class="btn btn-outline-light btn-lg" type="button">SHOP NOW</button>
            </div>
        </section>
        <section class="clean-block clean-info dark">
            <div class="container" id="infocakes">
                <div class="block-heading">
                    <h2 class="text-info">About Luzzy's Supreme Sweets</h2>
                    <p>Our classic treats are made daily by in-house bakers, using the freshest &amp; finest ingredients. Come visit us for delicious, sentimental sweets and a friendly, old-fashioned neighborhood experience.<br/></p>
                </div>
                <div class="row align-items-center">
                    <div class="col-md-6 align-items-center"><img class="img-thumbnail cakebox" src={gradcake}/></div>
                    <div class="col-md-6">
                        <h3>Graduation Day Cakes</h3>
                        <div class="getting-started-info">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div><button class="btn btn-outline-primary btn-lg" type="button">Shop Now</button>
                    </div>
                </div><span>&nbsp;</span>
                { /* bday cake at tablet - pc screen */}
                <div class="d-none d-md-block">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h3>Birthday Cakes</h3>
                            <div class="getting-started-info">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div><button class="btn btn-outline-primary btn-lg" type="button">Shop Now</button>
                        </div>
                        <div class="col-md-6"><img class="img-thumbnail cakebox justify-content-end" src={bdaycake}/></div>
                    </div><span>&nbsp;</span>
                </div>
                { /* bday cake at mobile screen */ }
                <div class="d-block d-md-none">
                    <div class="row align-items-center">
                    <div class="col-md-6"><center><img class="img-thumbnail cakebox" src={bdaycake}/></center></div>
                        <div class="col-md-6">
                            <h3>Birthday Cakes</h3>
                            <div class="getting-started-info">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            </div><button class="btn btn-outline-primary btn-lg" type="button">Shop Now</button>
                        </div>
                    </div><span>&nbsp;</span>
                </div>
                { /* end of bday cake */ }
                <div class="row align-items-center">
                    <div class="col-md-6"><center><img class="img-thumbnail cakebox" src={gendercake}/></center></div>
                    <div class="col-md-6">
                        <h3>Gender Reveal Cakes</h3>
                        <div class="getting-started-info">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div><button class="btn btn-outline-primary btn-lg" type="button">Shop Now</button>
                    </div>
                </div>
            </div>
        </section>
        <section class="clean-block features">
            <div class="container">
                <div class="block-heading">
                    <h2 class="text-info">Why Luzzy's Supreme Sweets?</h2>
                    <p>Here are some reason why our customer loves Luzzy's Supreme Sweets</p>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-5 feature-box"><i class="icon-like icon"></i>
                        <h4>Quality</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                    <div class="col-md-5 feature-box"><i class="icon-check icon"></i>
                        <h4>Money Back Guarantee</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                    <div class="col-md-5 feature-box"><i class="icon-energy icon"></i>
                        <h4>Fast delivery</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                    <div class="col-md-5 feature-box"><i class="icon-emotsmile icon"></i>
                        <h4>Customer-Friendly Staffs</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <Footer/>
    </>
    )
}

export default Home