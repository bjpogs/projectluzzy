import React, {useState, useEffect} from 'react'
import {Table, Tab, Tabs, Spinner, Modal, Button} from 'react-bootstrap'
import axios from '../../api/api.js'
import emailjs from '@emailjs/browser'

const Reservationorder = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editingRow, setEditingRow] = useState(null)
    const [statusdata, setStatusdata] = useState(null)
    const [loading, setLoading] = useState(false)
    const [imagesrc, setImagesrc] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [productmodalShow, setProductmodalShow] = useState(false)
    const [modaldata, setmodaldata] = useState([])
    const [pricemodal, setpricemodal] = useState(false)
    const [priceid, setpriceid] = useState(0)
    useEffect(() => {
        setLoading(true)
        axios.get('allreservation')
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
                reservation_id : meows.reservation_id,
                status : statusdata
            }
            axios.post('updatereservationstatus', temps)
            .then((res) => {
                setEdit(!edit)
                setEditingRow(null)
                var tempi = data.map(obj => {
                    if (obj.reservation_id == meows.reservation_id){
                        return {...obj, status : statusdata }
                    }
                    return obj
                })
                setData(tempi)
            })
            .catch((err) => {
                console.log(err);
            })
            if (statusdata == "To Pick Up"){
                var template = {
                    order_id : meows.order_id,
                    first_name : meows.first_name,
                    last_name : meows.last_name,
                    product_name : meows.product_name,
                    product_category : meows.product_category,
                    product_price : meows.product_price,
                    email_address : 'ariel.atienzajr@cvsu.edu.ph'
                }
                emailjs.send('service_hkloqw4', 'template_y39gciu', template, 'zpZhnlO2TsbRcuocB')
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
        if (data){
            return data.map((meows, index) => {
                return (
                    <tr key = {index}>
                        <td class="text-success fw-bold pointed" onClick={() => {setmodaldata(meows); setProductmodalShow(true)}}>{meows.reservation_id}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm w-100"  type="button" onClick={() => {setImagesrc(meows.image); setModalShow(true)} }>
                                <i class="icon-eye icon"/>
                                View
                            </button>
                        </td>
                        <td>{meows.pickupdate}</td>
                        <td>{meows.pickuptime}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm w-100" type="button" onClick={() => {setpriceid(meows.reservation_id); setmodaldata(meows); setpricemodal(true)}}>
                                <i class="icon-pencil icon"/>
                                Set Price
                            </button>
                        </td>
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
                                            <option value="To Pick Up">To Pick Up</option>
                                            <option value="Complete">Complete</option>
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
                                <button class="btn btn-outline-primary btn-sm w-100" type="button" onClick={() => editbtn(index)}>
                                        <i class="icon-pencil icon"/>
                                        Edit
                                </button>
                                :
                                <>
                                    <button class="btn w-100 btn-outline-success btn-sm" type="button" onClick={() => saveStatus(meows)}><i class="icon-check icon"/>Save</button>
                                
                                    <button class="btn w-100 btn-outline-danger btn-sm d-lg-block" type="button" onClick={() => {setEdit(!edit); setEditingRow('null')}}><i class="icon-close icon"/>Cancel</button>
                                    
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
                Requested Design
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img class="img-thumbnail cakebox" src={imagesrc}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
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

    const Saveprice = () => {
        console.log(document.getElementById('price').value);
        console.log(modaldata.reservation_id);
        var presyo = document.getElementById('price').value
        let datos = {
            reservation_id : modaldata.reservation_id,
            price : presyo
        }
        axios.post('updatereservationprice', datos)
        .then((res) => {
            var tempi = data.map(obj => {
                if (obj.reservation_id == modaldata.reservation_id){
                    return {...obj, price : presyo }
                }
                return obj
            })
            setData(tempi)
            alert('success!')
            setpricemodal(false)
            // emailjs next
            var template ={
                order_number : modaldata.reservation_id,
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


    function Productdetails(props) {
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

    return(
        <main class="page">
            <section class="clean-block clean-product dark">
                <br/>
                    <div class="reservationcard">
                        <center>
                            <h1>Reservation Orders</h1>
                            <p>Orders from Reservation</p>
                            </center>
                        <br/>
                        <Table striped bordered hover responsive>
                            <thead className="table-primary">
                                <tr>
                                <th>Reservation ID</th>
                                <th>Requested Design</th>
                                <th>Pick Up date</th>
                                <th>Time</th>
                                <th>Price</th>
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
                    <Productdetails
                        show={productmodalShow}
                        onHide={() => setProductmodalShow(false)}
                    />
                    <Pricemodal
                        show={pricemodal}
                        onHide={() => setpricemodal(false)}
                    />
            </section>
        </main>
    )
}
export default Reservationorder