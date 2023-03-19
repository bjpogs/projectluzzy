import React, {useState, useEffect} from 'react'
import {Table, Tab, Tabs, Spinner, Modal, Button} from 'react-bootstrap'
import axios from '../../api/api.js'
import emailjs from '@emailjs/browser'


const Adminhome = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editingRow, setEditingRow] = useState(null)
    const [statusdata, setStatusdata] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modaldata, setmodaldata] = useState([])
	// for filter
    const [pricemodal, setpricemodal] = useState(false)
    const [priceid, setpriceid] = useState(0)
    const [DisplayID, setDisplayID] = useState("")
    const [DisplayStatus, setDisplayStatus] = useState("DEFAULT")
    const [DisplayCategory, setDisplayCategory] = useState("Shop")
    useEffect(() => {
        setLoading(true)
        axios.get('allorders')
        .then((res) => {
            setData(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false)
        })
    },[])

    const saveStatus = (meows) => {
        if (statusdata === null) setEdit(!edit)
        else {
            var temps = {
                order_id : meows.order_id,
                status : statusdata
            }
            axios.post('updatestatus', temps)
            .then((res) => {
                setEdit(!edit)
                setEditingRow(null)
                var tempi = data.map(obj => {
                    if (obj.order_id == meows.order_id){
                        return {...obj, status : statusdata }
                    }
                    return obj
                })
                setData(tempi)
            })
            .catch((err) => {
                console.log(err);
            })
            var today = new Date();
            var d = today.getDate();
            var y = today.getFullYear();
            var m = today.getMonth();
            var month = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
            m = month[m];
            var ngayon = m + ' ' + d + ", " + y
	    if (DisplayCategory == "Shop"){
            if (statusdata == "For Pick Up"){ 
                var template = {
                    order_id : meows.order_id,
                    first_name : meows.first_name,
                    last_name : meows.last_name,
                    product_name : meows.product_name,
                    product_price : meows.product_price,
                    email_address : meows.email_address,
                    date: meows.order_date == "" || meows.order_date == null ? ngayon : meows.order_date
                }
                emailjs.send('service_l0kzyv6', 'template_kfcpk55', template, 'i7Ncix5NnyEgC_kfb')
                .then((res) => {
                    console.log(res.text);
                }, (err) => {
                    console.log(err.text);
                })
            }
	    }
	    else if (DisplayCategory == "Reservation"){
	    if (statusdata == "For Pick Up"){
                var template = {
                    order_id : meows.order_id,
                    first_name : meows.first_name,
                    last_name : meows.last_name,
                    product_name : meows.product_name,
                    product_category : meows.product_category,
                    product_price : meows.product_price,
                    email_address : meows.email
                }
                emailjs.send('service_fa3wafr', 'template_95n0gvq', template, 'LdHTOyTJG5lKy7e4s')
                .then((res) => {
                    console.log(res.text);
                }, (err) => {
                    console.log(err.text);
                })
            }
	    }
	    else if (DisplayCategory == "Build"){
            if (statusdata == "For Pick Up"){
                var template = {
                    order_id : meows.order_id,
                    first_name : meows.first_name,
                    last_name : meows.last_name,
                    size : meows.size,
                    flavor : meows.flavor,
                    layer : meows.layer,
                    design : meows.design,
                    design1 : meows.design1 == "" ? "None" : meows.design1,
                    topper : meows.topper == "" ? "None" : meows.topper,
                    message : meows.message == "" ? "None" : meows.message,
                    number : meows.number == "" ? "None" : meows.number,
                    price : meows.price,
                    email_address : meows.email_address,
                    date: meows.order_date == "" ? ngayon : meows.order_date
                }
                emailjs.send('service_l0kzyv6', 'template_bqbh1ph', template, 'i7Ncix5NnyEgC_kfb')
                .then((res) => {
                    console.log(res.text);
                }, (err) => {
                    console.log(err.text);
                })
            }
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
	    { DisplayCategory == "Shop" ? 
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Product Name</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_name}/>
                </div>
            </div>
	    : <></>}
	    <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Size</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_size : modaldata.size}/>
                </div>
            </div>
	    { DisplayCategory != "Build" ?
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Image</label>
                <div class="col-sm-7">
		<img class="img-thumbnail cakebox" src={DisplayCategory == "Shop" ? modaldata.product_image : modaldata.image}/>
	        </div>
            </div>
	    : <></> }
	    { DisplayCategory == "Shop" ?
	    <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Shape</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_shape : modaldata.shape}/>
                </div>
            </div>
	    : <></> }
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Flavor</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_flavor : modaldata.flavor}/>
                </div>
            </div>
	    { DisplayCategory != "Build" ?
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Icing</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_icing == "" ? "None" : modaldata.product_icing : modaldata.icing == "" ? "None" : modaldata.icing }/>
                </div>
            </div>
	    : <></>}
	    { DisplayCategory != "Reservation" ?
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Layer</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_layer == "" ? "None" : modaldata.product_layer : modaldata.layer == "" ? "None" : modaldata.layer}/>
                </div>
            </div>
    	    : <></>}
	    { DisplayCategory == "Shop" ?
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Tier</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_tier == "" ? "None" : modaldata.product_tier : modaldata.tier == "" ? "None" : modaldata.tier}/>
                </div>
            </div>
	    : <></>}
	    { DisplayCategory == "Build" ? 
	    <>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Design</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.design}/>
                </div>
            </div>

            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Design 2</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.design1 == "" ? "None" : modaldata.design1}/>
                </div>
            </div>

            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Topper</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.topper == "" ? "None" : modaldata.topper}/>
                </div>
            </div>
	    { modaldata.number != "" ? 
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Number</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.number}/>
                </div>
            </div>
	    :<></>}
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Written Card</label>
                <div class="col-sm-7">
                <textarea type="text" readonly class="form-control-plaintext" id="staticEmail" rows={modaldata.message != "" ? "5" : "1"}value={modaldata.message == "" ? "None" : modaldata.message}/>
                </div>
            </div>
	    </> : <></>}	
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Special Request</label>
                <div class="col-sm-7">
                <textarea type="text" readonly class="form-control-plaintext" id="staticEmail" rows={modaldata.specialrequest || modaldata.order_request != "" ? "5" : "1"}value={modaldata.specialrequest || modaldata.order_request || "None"}/>
                </div>
            </div>
	    <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Price</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={DisplayCategory == "Shop" ? modaldata.product_price : modaldata.price}/>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    const editbtn = (id) => {
        setEditingRow(id)
        setEdit(!edit)
    }

    const renderTable = () => {
        //<td colSpan={2}>Larry the Bird</td>
        if (data.length){
            return data.filter(meows => {
		if(DisplayID == "" && DisplayStatus == 'DEFAULT') return meows
                else if (DisplayID != '' && DisplayStatus == 'DEFAULT' && meows.order_id.toString().includes(DisplayID)) return meows
		else if (DisplayID == '' && meows.status == DisplayStatus) return meows
		else if (DisplayID != '' && DisplayStatus != 'DEFAULT')
			if (meows.status == DisplayStatus && meows.order_id.toString().includes(DisplayID)) return meows
            }).map((meows, index) => {
                return (
                    <tr key = {index} className={meows.status == "For Pick Up" ? "bg-warning" : meows.status == "Completed" ? "bg-success" : meows.status == "Cancelled" ? "bg-danger" : ""}>
                        <td class="fw-bold pointed" onClick={() => {setmodaldata(meows); setModalShow(true)}} data-label="Order ID : ">{meows.order_id}</td>
                        <td data-label="Last Name : ">{meows.last_name}</td>
                        <td data-label="First Name : ">{meows.first_name}</td>
                        <td data-label="Email Address : ">{DisplayCategory != "Reservation" ? meows.email_address : meows.email}</td>
                        <td data-label="Contact Number : ">{DisplayCategory != "Reservation" ? meows.contact_no : meows.contact_number }</td>
                        <td data-label="Date Ordered : ">{meows.order_date || meows.date || meows.pickupdate || "Not Applicable"}</td>
                        { DisplayCategory == "Reservation" ? 
			<td data-label="Price : ">
                            <button class="btn btn-primary btn-sm" type="button" onClick={() => {setpriceid(meows.order_id); setmodaldata(meows); setpricemodal(true)}}>
                                <i class="icon-pencil icon"/>
                                Set Price
                            </button>
                        </td>
			: <></>}
			<td data-label="Status : ">
                            {!edit ? 
                                meows.status
                                :
                                <>
                                    {
                                        editingRow == index ? 
                                        <>
                                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={meows.status} onChange={(e) => {setStatusdata(e.target.value)}}>
                                            <option value="Pending">Pending</option>
                                            <option value="For Pick Up">For Pick Up</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        </> 
                                        : 
                                        meows.status
                                    }
                                 
                                </>
                               
                            }
                            
                        </td>
                        <td data-label="Action : ">
                            {!edit ? 
                                <button class="btn btn-primary btn-sm" type="button" onClick={() => editbtn(index)}>
                            
                                        <i class="icon-pencil icon"/>
                                        Edit
                                </button>
                                :
                                <>
                                    {
                                        editingRow == index ? 
                                        <>
                                        <button class="btn w-100 btn-success btn-sm" type="button" onClick={() => saveStatus(meows)}><i class="icon-check icon"/>Save</button>
                                        <button class="btn w-100 btn-danger btn-sm d-lg-block" type="button" onClick={() => {setEdit(!edit); setEditingRow('null')}}><i class="icon-close icon"/>Cancel</button>
                                        </>
                                        :
                                        <>
                                        <button class="btn btn-primary btn-sm" type="button" onClick={() => {setEditingRow(index); setEdit(!edit)}}>
                                            <i class="icon-pencil icon"/>
                                            Edit
                                        </button>
                                        </>
                                    }
                                </>
                            }
                            
                        </td>
                    </tr>
                )
            })
        }
        else {
	if (!loading){
            return (
                <td colSpan={9}><center>No orders available</center></td>
            )
	}
        }
    }
    const Saveprice = () => {
        var presyo = document.getElementById('price').value
        let datos = {
            order_id : modaldata.order_id,
            price : presyo
        }
	console.log(datos);
        axios.post('updatereservationprice', datos)
        .then((res) => {
            var tempi = data.map(obj => {
                if (obj.order_id == modaldata.order_id){
                    return {...obj, price : presyo }
                }
                return obj
            })
            setData(tempi)
            alert('success!')
            setpricemodal(false)
            // emailjs next
            var template ={
                order_number : modaldata.order_id,
                date : modaldata.pickupdate,
                time : modaldata.pickuptime,
                size : modaldata.size,
                flavor : modaldata.flavor,
                icing : modaldata.icing,
                price : presyo,
                first_name : modaldata.first_name,
                last_name : modaldata.last_name,
                email_address : modaldata.email
            }
            emailjs.send('service_fa3wafr', 'template_95n0gvq', template, 'LdHTOyTJG5lKy7e4s')
                .then((res) => {
                    console.log(res.text);
                }, (err) => {
                    console.log(err.text);
                })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function Pricemodal(props) {
        return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Set Price
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" class="form-control" id="price" defaultValue={modaldata.price}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => Saveprice()}>Save</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }

    const selectordertype = (e) => {
    e.preventDefault()
    let mamaooo= e.target.value
    setDisplayCategory(mamaooo)
    // get diplay by category
    if (mamaooo == "Shop"){
        setLoading(true)
        axios.get('allorders')
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
        axios.get('allbuildorders')
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
    else if(mamaooo == "Reservation"){
        setLoading(true)
        axios.get('allreservation')
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
}
    return(
        <main class="page">
            <section class="clean-block clean-product dark">
                <br/>
                    <div class="reservationcard">
                        <center>
                            <h1>Order List</h1>
                        </center>
                        {/* start filter */}
			<div class="col-sm-12 col-md-8 col-lg-5 col-xl-3 mb-2">
				<div class="input-group mb-2 ">
					<span class="input-group-text" id="basic-addon1"><i class="icon-magnifier icon"/></span>
					<input type="text" class="form-control" placeholder="Order ID" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {setDisplayID(e.target.value)}}/>
				</div>
			</div>
			<label for="staticEmail" class="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label fw-bold">Order Type : </label>
                        <div class="col-sm-12 col-md-8 col-lg-5 col-xl-3 mb-3">
                            <select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {selectordertype(e)}}>
                                <option value="Shop">Shop</option>
                                <option value="Build">Build a Cake</option>
                                <option value="Reservation">Upload a Cake</option>
                            </select>
                        </div>		
			<label for="staticEmail" class="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label fw-bold">Select By Status</label>
                        <div class="col-sm-12 col-md-8 col-lg-5 col-xl-3 mb-3">
                            <select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {setDisplayStatus(e.target.value)}}>
                                <option value="DEFAULT">ALL</option>
                                <option value="Pending">Pending</option>
                                <option value="For Pick Up">For Pick Up</option>
                                <option value="Completed">Completed</option>
				<option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
			{/* end filter */}
                        <br/>
			{ loading ? <center><Spinner animation="border" /></center> : <>
			{ DisplayCategory == "Shop" ? 
                        <Table striped bordered hover responsive class="table">
                            <thead  className="table-primary">
                                <tr>
                                <th>Order ID</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                                <th>Mobile Number</th>
                                <th>Date Ordered</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <td colSpan={9}><center><Spinner animation="border" /></center></td> : <></>
                                }
                                {renderTable()}
                            </tbody>
                        </Table>
			:
			DisplayCategory == "Build" ?
			<Table striped bordered hover responsive>
                            <thead  className="table-primary">
                                <tr>
                                <th>Order ID</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                                <th>Mobile Number</th>
                                <th>Date Ordered</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <td colSpan={8}><center><Spinner animation="border" /></center></td> : <></>
                                }
                                {renderTable()}
                            </tbody>
                        </Table>
			:
			DisplayCategory == "Reservation" ? 
			<Table striped bordered hover responsive>
                            <thead  className="table-primary">
                                <tr>
                                <th>Order ID</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                                <th>Mobile Number</th>
                                <th>Date Ordered</th>
				<th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <td colSpan={9}><center><Spinner animation="border" /></center></td> : <></>
                                }
                                {renderTable()}
                            </tbody>
                        </Table>
			:
			<></>
			}
			</>}
                    </div>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
		    <Pricemodal
                        show={pricemodal}
                        onHide={() => setpricemodal(false)}
                    />
            </section>
        </main>
    )
}
export default Adminhome
