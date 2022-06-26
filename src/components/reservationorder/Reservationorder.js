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
            /*
            if (statusdata == "To Pick Up"){
                var template = {
                    order_id : meows.order_id,
                    first_name : meows.first_name,
                    last_name : meows.last_name,
                    product_name : meows.product_name,
                    product_category : meows.product_category,
                    product_price : meows.product_price,
                    email_address : 'bjpogs26@gmail.com'
                }
                emailjs.send('service_hkloqw4', 'template_y39gciu', template, 'zpZhnlO2TsbRcuocB')
                .then((res) => {
                    console.log(res.text);
                }, (err) => {
                    console.log(err.text);
                })
            }
            */
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
                    <tr key = {index}>
                        <td>{meows.reservation_id}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm w-100"  type="button" onClick={() => {setImagesrc(meows.image); setModalShow(true)} }>
                                <i class="icon-eye icon"/>
                                View
                            </button>
                        </td>
                        <td>{meows.size}</td>
                        <td>{meows.flavor}</td>
                        <td>{meows.icing}</td>
                        <td>{meows.specialrequest == "" ? "Not Applicable" : meows.specialrequest}</td>
                        <td>{meows.pickupdate}</td>
                        <td>{meows.pickuptime}</td>
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
                                <button class="btn btn-outline-primary btn-sm" type="button" onClick={() => editbtn(index)}>
                            
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
                            <thead>
                                <tr>
                                <th>Reservation ID</th>
                                <th>Requested Design</th>
                                <th>Cake Size</th>
                                <th>Flavor</th>
                                <th>Icing</th>
                                <th>Special Request</th>
                                <th>Pick Up date</th>
                                <th>Time</th>
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
export default Reservationorder