import React from 'react'

import { InputGroup, FormControl, Form, Button, Modal } from 'react-bootstrap'
import axios from '../../api/api'
import { useState } from 'react'
import imahe from '../../assets/img/luzzybrand.jpg'

const Trackreservation = () => {
	const [data, setData] = useState([])
	const [notfound, setnotfound] = useState(false)
	const trackme = async () => {
		console.log(notfound)
		console.log('track me!');
		let id = document.getElementById('id').value
		await axios.get(`/trackme/${id}`)
		.then(res => {
			setData(res.data[0])
			setnotfound(false)
			console.log(res.data[0].order_id)
		})
		.catch(err => {
			  /* unauthorized */
			if (err.response.status === 404) setnotfound(true)
		})
	}
	
	const rendertable = () => {
		
	}
	return(
		<main class="page">
			<section class="clean-block clean-catalog dark">
				<div class="container">
					<div class="block-heading">
						<h2 class="text-info">Track your Reservation</h2>
						<p>You can track your reservation order here.</p>
					</div>
					<div class="reservationcard">
						<div class="col mb-4">
							<label for="staticEmail" class="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label fw-bold">Enter Order ID</label>
							<div class="input-group mb-3 ">
								<span class="input-group-text" id="basic-addon1"><i class="icon-magnifier icon"/></span>
								<input type="text" class="form-control" placeholder="Order ID" aria-label="Username" aria-describedby="basic-addon1" id="id"/>
							</div>
							<button class="btn btn-primary btn-lg w-100" type="button" onClick={() => {trackme()}}>
                                <i class="icon-magnifier icon"/>
                                Search
                            </button>
						</div>
						{
							data != ''?
								!notfound ?
									<div class="prodcontainer">
										<div class="row justify-content-center align-items-center">
											{/* start shop */}
											<div class="col-md-7 product-info"><h4><b>{data.order_id}</b></h4>
												<div class="product-specs">
													<div><span><b>Status:&nbsp;</b></span><span class="value">{data.status}</span></div>
												</div>
											</div>
											<div class="col-md-3">
												<div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={imahe}/></div>
											</div>
											{/* end shop */}
										</div>
									</div>
								:
								<div class="prodcontainer">
									<center><h2>No order available</h2></center>
								</div>
							:
							<></>
						}
					</div>
				</div>
			</section>
		</main>
	)
}

export default Trackreservation
