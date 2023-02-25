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
	const [DisplayID, setDisplayID] = useState("")
	const [DisplayStatus, setDisplayStatus] = useState("DEFAULT")
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
            if (statusdata == "To Pick Up"){
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
            </div><div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Price</label>
                <div class="col-sm-7">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.product_price}/>
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
                    <tr key = {meows.order_id} className={meows.status == "To Pick Up" ? "bg-warning" : meows.status == "Complete" ? "bg-success" : meows.status == "Cancelled" ? "bg-danger" : ""}>
                        <td class="fw-bold pointed" onClick={() => {setmodaldata(meows); setModalShow(true)}}>{meows.order_id}</td>
                        <td>{meows.product_name}</td>
                        <td>{meows.last_name}</td>
                        <td>{meows.first_name}</td>
                        <td>{meows.email_address}</td>
                        <td>{meows.contact_no}</td>
                        <td>{meows.order_date == "" ? meows.order_date : "Not Applicable"}</td>
                        <td>
                            {!edit ? 
                                meows.status
                                :
                                <>
                                    {
                                        editingRow == index ? 
                                        <>
                                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={meows.status} onChange={(e) => {setStatusdata(e.target.value)}}>
                                            <option value="Pending">Pending</option>
                                            <option value="To Pick Up">To Pick Up</option>
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
                        <td>
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
            return (
                <td colSpan={9}><center>No orders available</center></td>
            )
        }
    }
    return(
        <main class="page">
            <section class="clean-block clean-product dark">
                <br/>
                    <div class="reservationcard">
                        <center>
                            <h1>Regular Orders</h1>
                            <p>Orders from Shop</p>
                        </center>
                        {/* start filter */}
						<div class="col-sm-12 col-md-8 col-lg-5 col-xl-3 mb-2">
							<div class="input-group mb-2 ">
								<span class="input-group-text" id="basic-addon1"><i class="icon-magnifier icon"/></span>
								<input type="text" class="form-control" placeholder="Order ID" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {setDisplayID(e.target.value)}}/>
							</div>
						</div>
						<label for="staticEmail" class="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label fw-bold">Select By Status</label>
                        <div class="col-sm-12 col-md-8 col-lg-5 col-xl-3 mb-3">
                            <select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {setDisplayStatus(e.target.value)}}>
                                <option value="DEFAULT">--</option>
                                <option value="Pending">Pending</option>
                                <option value="To Pick Up">To Pick Up</option>
                                <option value="Complete">Complete</option>
								<option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
						{/* end filter */}
                        <br/>
                        <Table striped bordered hover responsive>
                            <thead  className="table-primary">
                                <tr>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                                <th>Mobile Number</th>
                                <th>Target Date</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <td colSpan={7}><center><Spinner animation="border" /></center></td> : <></>
                                }
                                {renderTable()}
                            </tbody>
                        </Table>
                    </div>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
            </section>
        </main>
    )
}
export default Adminhome