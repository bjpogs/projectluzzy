import React, {useState, useEffect} from 'react'
import {Table, Tab, Tabs, Spinner} from 'react-bootstrap'
import axios from '../../api/api.js'


const Adminhome = () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editingRow, setEditingRow] = useState(null)
    const [statusdata, setStatusdata] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get('allorders')
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

    const saveStatus = (id) => {
        console.log(data);
        if (statusdata === null) setEdit(!edit)
        else {
            var temps = {
                order_id : id,
                status : statusdata
            }
            axios.post('updatestatus', temps)
            .then((res) => {
                setEdit(!edit)
                setEditingRow(null)
                var tempi = data.map(obj => {
                    if (obj.order_id == id){
                        return {...obj, status : statusdata }
                    }
                    return obj
                })
                setData(tempi)
            })
            .catch((err) => {
                console.log(err);
            })
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
                        <td>{meows.order_id}</td>
                        <td>{meows.product_name}</td>
                        <td>{meows.last_name}</td>
                        <td>{meows.first_name}</td>
                        <td>{meows.email_address}</td>
                        <td>{meows.contact_no}</td>
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
                                    <button class="btn w-100 btn-outline-success btn-sm" type="button" onClick={() => saveStatus(meows.order_id)}><i class="icon-check icon"/>Save</button>
                                
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
    return(
        <main class="page">
            <section class="clean-block clean-product dark">
                <br/>
                    <div class="reservationcard">
                        <center><h1>Regular Orders</h1></center>
                        <br/><br/>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                                <th>Mobile Number</th>
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
            </section>
        </main>
    )
}
export default Adminhome