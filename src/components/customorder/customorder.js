import React, {useState, useEffect} from "react"
import {Table, Tab, Tabs, Spinner, Modal, Button} from 'react-bootstrap'
import axios from '../../api/api.js'
import emailjs from '@emailjs/browser'

const Customorder = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editingRow, setEditingRow] = useState(null)
    const [statusdata, setStatusdata] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [modaldata, setmodaldata] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get('allbuildorders')
        .then((res) => {
            setData(res.data)
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false)
        })
    },[])

    const saveStatus = (meows) => {
        console.log(data);
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
                console.log('date : ', template);
                emailjs.send('service_l0kzyv6', 'template_bqbh1ph', template, 'i7Ncix5NnyEgC_kfb')
                .then((res) => {
                    console.log(res.text);
                }, (err) => {
                    console.log(err.text);
                })
            }
        }
    }

    const editbtn = (id) => {
        console.log(id);
        setEditingRow(id)
        setEdit(!edit)
    }

    const renderTable = () => {
        //<td colSpan={2}>Larry the Bird</td>
        if (data){
            return data.map((meows, index) => {
                return (
                    <tr key = {meows.order_id}>
                        <td class="text-success fw-bold pointed" onClick={() => {setmodaldata(meows); setModalShow(true)}}>{meows.order_id}</td>
                        <td>{meows.last_name}</td>
                        <td>{meows.first_name}</td>
                        <td>{meows.email_address}</td>
                        <td>{meows.contact_no}</td>
                        <td>{meows.order_date !== "" || meows.order_date !== null ? meows.order_date : "Not Applicable"}</td>
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
                                            <option value="Processing">Processing</option>
                                            <option value="To Deliver">To Deliver</option>
                                            <option value="To Pick Up">To Pick Up</option>
                                            <option value="Complete">Completed</option>
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
                                <button class="btn btn-outline-primary btn-sm" type="button" onClick={() => editbtn(index)}>              
                                        <i class="icon-pencil icon"/>
                                        Edit
                                </button>
                                :
                                <>
                                    {
                                        editingRow == index ? 
                                        <>
                                        <button class="btn w-100 btn-outline-success btn-sm" type="button" onClick={() => saveStatus(meows)}><i class="icon-check icon"/>Save</button>
                                        <button class="btn w-100 btn-outline-danger btn-sm d-lg-block" type="button" onClick={() => {setEdit(!edit); setEditingRow('null')}}><i class="icon-close icon"/>Cancel</button>
                                        </>
                                        :
                                        <>
                                        <button class="btn btn-outline-primary btn-sm" type="button" onClick={() => {setEditingRow(index); setEdit(!edit)}}>
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
                <td colSpan={7}><center>No orders available</center></td>
            )
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
                    <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Design</label>
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
                <textarea rows="5" type="text" readonly class="form-control-plaintext" id="staticEmail" value={modaldata.message == "" ? "Not Applicable" : modaldata.message}/>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }
      

    return(
        <main class="page">
            <section class="clean-block clean-product dark">
                <br/>
                    <div class="reservationcard">
                        <center>
                            <h1>Custom Orders</h1>
                            <p>Build a Cake Customers</p>
                            </center>
                        <br/>
                        <Table striped bordered hover responsive>
                            <thead className="table-primary">
                                <tr>
                                <th>Order ID</th>
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
export default Customorder