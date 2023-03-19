import React,{useState, useEffect} from 'react'
import axios from '../../api/api'
import {Button, Form, InputGroup, FormControl, Spinner, Modal} from 'react-bootstrap'
import imahe from '../../assets/img/buildlogo.jpg'
const Order = () => {
    const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	// for filter
	const [DisplayID, setDisplayID] = useState("")
	const [DisplayStatus, setDisplayStatus] = useState("DEFAULT")
	const [DisplayCategory, setDisplayCategory] = useState('Shop')
	const delay = ms => new Promise(res => setTimeout(res, ms));
	const [modalShow, setModalShow] = useState(false)
    const [modaldata, setmodaldata] = useState([])
	const [buildmodalShow, setbuildModalShow] = useState(false)
	const [reservemodalShow, setreserveModalShow] = useState(false)
    useEffect(async () => {
		setLoading(true)
        await axios.get('myorders')
        .then(async res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err);
        })
		.finally(() => {
            setLoading(false)
        })
    },[])

    const renderTable = () => {
		if (data.length > 0) {
			return (
				data.filter(meows => {
			                if(DisplayID == "" && DisplayStatus == 'DEFAULT') return meows
			                else if (DisplayID != '' && DisplayStatus == 'DEFAULT' && meows.order_id.toString().includes(DisplayID)) return meows
			                else if (DisplayID == '' && meows.status == DisplayStatus) return meows
			                else if (DisplayID != '' && DisplayStatus != 'DEFAULT')
			                        if (meows.status == DisplayStatus && meows.order_id.toString().includes(DisplayID)) return meows
				}).map((meow, index) => {
					return(
						<div class="prodcontainer"  onClick={() => {setmodaldata(meow); DisplayCategory == "Shop" ? setModalShow(true) : DisplayCategory == "Build" ? setbuildModalShow(true) : setreserveModalShow(true)}}>
							<div class="row justify-content-center align-items-center">
								{/* start shop */}
								<div class="col-md-3">
									<div class="product-image"><img class="product-img-fluid d-block mx-auto image" src={DisplayCategory == "Build" ? imahe : meow.product_image || meow.image}/></div>
								</div>
								
								<div class="col-md-7 product-info"><h4><b>{meow.product_name || meow.order_id}</b></h4>
									<div class="product-specs">
										{ meow.statcategory == "Shop" ? <div><span>Category:&nbsp;</span><span class="value">{meow.product_category || meow.statcategory}</span></div> : <></>}
										<div><span>₱{meow.statcategory == "Shop" ? meow.product_price : meow.price == 0 ? ' For pricing' : meow.price}</span></div>
									        <div><span>Date Ordered : {meow.order_date || meow.date || meow.pickupdate || "--"}</span></div>
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

	function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Order details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Size</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_size}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Shape</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_shape}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Flavor</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_flavor}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Icing</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_icing == "" ? "None" : modaldata.product_icing}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Layer</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_layer == "" ? "None" : modaldata.product_layer}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Tier</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_tier == "" ? "None" : modaldata.product_tier}/>
                </div>
            </div>
	    <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Price</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_price}/>
                </div>
            </div>
	    <div class="mb-2 row">
		<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Special Request</label>
		<div class="col-sm-7">
		<textarea rows={modaldata.order_request != "" || modaldata.order_request === null? "5" : "1"} type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.order_request == "" ? "None" : modaldata.order_request}/>
		</div>
	    </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
	function BuildMyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Order details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Price</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.price}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Size</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.size}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Flavor</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.flavor}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Layer</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.layer}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Design</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.design}/>
					</div>
				</div>
				{
					
					modaldata.design1 != "" ?
					<div class="mb-2 row">
						<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Design 2</label>
						<div class="col-sm-7">
						<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.design}/>
						</div>
					</div>
					: 
					<></>
				}
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Topper</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.topper}/>
					</div>
				</div>
				{
					modaldata.number != "" ?
					<div class="mb-2 row">
						<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Number</label>
						<div class="col-sm-7">
						<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.number}/>
						</div>
					</div>
					: <></>
				}
				
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Written Card</label>
					<div class="col-sm-7">
					<textarea rows={modaldata.message != "" ? "5" : "1"} type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.message == "" ? "None" : modaldata.message}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Special Request</label>
					<div class="col-sm-7">
					<textarea rows={modaldata.specialrequest != "" ? "5" : "1"} type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.specialrequest == "" ? "None" : modaldata.message}/>
					</div>
				</div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }
	function ReserveMyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Order details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Size</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.size}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Flavor</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.flavor}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Icing</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.icing == "" ? "None" : modaldata.icing}/>
					</div>
				</div>
				<div class="mb-2 row">
					<label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Special Request</label>
					<div class="col-sm-7">
					<input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.specialrequest == "" ? "None" : modaldata.specialrequest}/>
					</div>
				</div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    const selectordertype = (e) => {
	e.preventDefault()
	let mamaooo = e.target.value
	setDisplayCategory(mamaooo)
    if (mamaooo == "Shop"){
        setLoading(true)
        axios.get('myorders')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false)
        })
    }
    else if(mamaooo == "Build"){
        setLoading(true)
        axios.get('mybuildorder')
        .then((res) => {
            setData(res.data)
console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false)
        })
    }
    else if(mamaooo == "Reservation"){
        setLoading(true)
        axios.get('myreservationorder')
        .then((res) => {
            setData(res.data)
console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false)
        })
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
							<select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {selectordertype(e)}}>
								<option value="Shop">Shop</option>
								<option value="Build">Build a Cake</option>
								<option value="Reservation">Upload a Cake</option>
							</select>
						</div>
						<label for="staticEmail" class="col-auto col-form-label fw-bold">Status</label>
						<div class="col-auto">
							<select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {setDisplayStatus(e.target.value)}}>
								<option value="DEFAULT">All</option>
								<option value="Pending">Pending</option>
								<option value="For Pick Up">For Pick Up</option>
								<option value="Completed">Completed</option>
								<option value="Cancelled">Cancelled</option>
							</select>
						</div>
					</div>
						{
							loading ? <div class="clean-block"><center><Spinner animation="border" /></center></div> : <></>
						}
					{renderTable()}
						{/* lagayan ng rendertable */ }
					<MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
					<BuildMyVerticallyCenteredModal
                        show={buildmodalShow}
                        onHide={() => setbuildModalShow(false)}
                    />
					<ReserveMyVerticallyCenteredModal
                        show={reservemodalShow}
                        onHide={() => setreserveModalShow(false)}
                    />
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
