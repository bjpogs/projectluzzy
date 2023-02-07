import React,{useState, useEffect} from 'react'
import axios from '../../api/api'
import {Button, Form, InputGroup, FormControl, Spinner} from 'react-bootstrap'
import imahe from '../../assets/img/buildlogo.jpg'
const Order = () => {
    const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	// for filter
	const [DisplayID, setDisplayID] = useState("DEFAULT")
	const [DisplayStatus, setDisplayStatus] = useState("DEFAULT")
	const delay = ms => new Promise(res => setTimeout(res, ms));
    useEffect(async () => {
		setLoading(true)
        await axios.get('myorders/123123123')
        .then(async res => {
			await delay(10000);
            setData(res.data)
			console.log('try 1',res.data[0])
			console.log('try 2',res.data[1])
			console.log('try 3',res.data[2])
        })
        .catch(err => {
            console.log(err);
        })
		.finally(() => {
            setLoading(false)
        })
    },[])

    const renderTable = () => {
		let memew = false 
		if (data.length > 0) {
			return (
				data[2].filter(meows => {
					if(DisplayID == "DEFAULT" && DisplayStatus == 'DEFAULT') return meows
					else if (DisplayID != 'DEFAULT' && DisplayStatus == 'DEFAULT' && meows.statcategory == DisplayID) return meows
					else if (DisplayID == 'DEFAULT' && meows.status == DisplayStatus) return meows
					else if (DisplayID != 'DEFAULT' && DisplayStatus != 'DEFAULT'){
						if (meows.status == DisplayStatus && meows.statcategory == DisplayID) return meows
					}
				}).map((meow, index) => {
					return(
						!meow ?
						memew = true
					: 
						<div class="prodcontainer">
							<div class="row justify-content-center align-items-center">
								{/* start shop */}
								<div class="col-md-3">
									<div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={meow.statcategory == "Build a Cake" ? imahe : meow.product_image || meow.image}/></div>
								</div>
								
								<div class="col-md-7 product-info"><h4><b>{meow.product_name || meow.order_id}</b></h4>
									<div class="product-specs">
										<div><span>Category:&nbsp;</span><span class="value">{meow.product_category || meow.statcategory}</span></div>
										<div><span>₱{meow.statcategory == "Shop" ? meow.product_price : meow.price == 0 ? ' For pricing' : meow.price}</span></div>
									</div>
								</div>
								<div class="col-6 col-md-2 price"><span><b>{meow.status}</b></span></div>
								{/* end shop */}
							</div>
						</div>
					)
				})
			)
			
		}
    }
	const renderTable1 = () => {
		if (data.length > 0) {
			return (
				data[0].filter(meows => {
					if(DisplayID == "DEFAULT" && DisplayStatus == 'DEFAULT') return meows
					else if (DisplayID != 'DEFAULT' && DisplayStatus == 'DEFAULT' && meows.statcategory == DisplayID) return meows
					else if (DisplayID == 'DEFAULT' && meows.status == DisplayStatus) return meows
					else if (DisplayID != 'DEFAULT' && DisplayStatus != 'DEFAULT')
					if (meows.status == DisplayStatus && meows.statcategory == DisplayID) return meows
				}).map((meow, index) => {
					return(
						<div class="prodcontainer">
							<div class="row justify-content-center align-items-center">
								{/* start shop */}
								<div class="col-md-3">
									<div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={meow.statcategory == "Build a Cake" ? imahe : meow.product_image || meow.image}/></div>
								</div>
								
								<div class="col-md-7 product-info"><h4><b>{meow.product_name || meow.order_id}</b></h4>
									<div class="product-specs">
										<div><span>Category:&nbsp;</span><span class="value">{meow.product_category || meow.statcategory}</span></div>
										<div><span>₱{meow.statcategory == "Shop" ? meow.product_price : meow.price == 0 ? ' For pricing' : meow.price}</span></div>
									</div>
								</div>
								<div class="col-6 col-md-2 price"><span><b>{meow.status}</b></span></div>
								{/* end shop */}
							</div>
						</div>
					)
				})
			)
		}
    }
	const renderTable2 = () => {
		if (data.length > 0) {
			return (
				data[1].filter(meows => {
					if(DisplayID == "DEFAULT" && DisplayStatus == 'DEFAULT') return meows
					else if (DisplayID != 'DEFAULT' && DisplayStatus == 'DEFAULT' && meows.statcategory == DisplayID) return meows
					else if (DisplayID == 'DEFAULT' && meows.status == DisplayStatus) return meows
					else if (DisplayID != 'DEFAULT' && DisplayStatus != 'DEFAULT')
					if (meows.status == DisplayStatus && meows.statcategory == DisplayID) return meows
				}).map((meow, index) => {
					return(
						<div class="prodcontainer">
							<div class="row justify-content-center align-items-center">
								{/* start shop */}
								<div class="col-md-3">
									<div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={meow.statcategory == "Build a Cake" ? imahe : meow.product_image || meow.image}/></div>
								</div>
								
								<div class="col-md-7 product-info"><h4><b>{meow.product_name || meow.order_id}</b></h4>
									<div class="product-specs">
										<div><span>Category:&nbsp;</span><span class="value">{meow.product_category || meow.statcategory}</span></div>
										<div><span>₱{meow.statcategory == "Shop" ? meow.product_price : meow.price == 0 ? ' For pricing' : meow.price}</span></div>
									</div>
								</div>
								<div class="col-6 col-md-2 price"><span><b>{meow.status}</b></span></div>
								{/* end shop */}
							</div>
						</div>
					)
				})
			)
		}
		else{
			if (!loading) {
				return(
					<div class="prodcontainer">
						<center><h2>No order available</h2></center>
					</div>
				)
			}
		}
    }

    return (
        <main class="page shopping-cart-page">
            <section class="clean-block clean-cart dark">
                <div class="container">
                    <div class="block-heading">
                        <h2 class="text-info">My Order</h2>
						
                    </div>
					<div className="row mb-3">
						<label for="staticEmail" class="col-auto col-form-label fw-bold">Purchase Made: </label>
						<div class="col-auto">
							<select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {setDisplayID(e.target.value)}}>
								<option value="DEFAULT">--</option>
								<option value="Shop">Shop</option>
								<option value="Build a Cake">Build a Cake</option>
								<option value="Reservation">Reservation</option>
							</select>
						</div>
						<label for="staticEmail" class="col-auto col-form-label fw-bold">Status</label>
						<div class="col-auto">
							<select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {setDisplayStatus(e.target.value)}}>
								<option value="DEFAULT">--</option>
								<option value="Pending">Pending</option>
								<option value="To Pick Up">To Pick Up</option>
								<option value="Complete">Complete</option>
								<option value="Cancelled">Cancelled</option>
							</select>
						</div>
					</div>
						{
							loading ? <div class="clean-block"><center><Spinner animation="border" /></center></div> : <></>
						}
                    {renderTable()}
					{renderTable1()}
					{renderTable2()}
                </div>
            </section>
        </main> 
   )
}

/*
<div class="col-md-5 product-info"><a class="product-name" href="#">meow.product_name</a>
                <div class="product-specs">
                    <div><span>Category:&nbsp;</span><span class="value">meow.product_category</span></div>
                    <div><span>Size:&nbsp;</span><span class="value">meow.product_size</span></div>
                    <div><span>Special Request:&nbsp;</span><span class="value">meow.request</span></div>
                </div>
            </div>  */

export default Order