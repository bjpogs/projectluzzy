import React, {useState, useEffect, useRef} from "react";
import {Table, Spinner, Modal, Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import axios from '../../api/api'

const Products = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editingRow, setEditingRow] = useState(null)
    const [statusdata, setStatusdata] = useState(null)
    const [imageModalShow, setImageModalShow] = useState(false)
    const [productModalShow, setProductModalShow] = useState(false)
    const [imagesrc, setImagesrc] = useState(null)
    const [tempdata, setTempdata] = useState([])
    const [addData, setAddData] = useState({
        product_category : '',
        product_name : '',
        product_price : '',
        product_size : '',
        product_flavor : '',
        product_shape : '',
        product_icing : '',
        product_layer : '',
        product_tier : '',
        product_description : '',
        product_image : '',
    })
    useEffect(() => {
        axios.get('getallproducts')
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

    }

    const form = useRef();

    const handleChange = (e) => {
        const newdata = {...tempdata}
        newdata[e.target.id] = e.target.value
        setTempdata(newdata)
        console.log(newdata);
    }

    // add product
    const handleSubmit = (e) => {
        e.preventDefault();
        // will do onchange.
        console.log('agoi');
    }


    const renderTable = () => {
        if (data){
            return data.map((meows, index) => {
                return(
                    <tr key = {index}>
                        <td>{meows.product_id}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm w-100"  type="button" onClick={() => {setImagesrc(meows.product_image); setImageModalShow(true)} }>
                                <i class="icon-eye icon"/>
                                View
                            </button>
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_name}
                                        id="product_name"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_name  
                            :
                                meows.product_name 
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_category}
                                        id="product_category"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_category   
                            :
                                meows.product_category   
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_price}
                                        id="product_price"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_price  
                            :
                                meows.product_price  
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_size}
                                        id="product_size"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_size
                            :
                                meows.product_size
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_flavor}
                                        id="product_flavor"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_flavor 
                            :
                                meows.product_flavor  
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_shape}
                                        id="product_shape"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_shape
                            :
                                meows.product_shape 
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_icing}
                                        id="product_icing"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_icing 
                            :
                                meows.product_icing 
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_layer}
                                        id="product_layer"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_layer 
                            :
                                meows.product_layer 
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_tier}
                                        id="product_tier"
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_tier  
                            :
                                meows.product_tier  
                            }
                        </td>
                        <td>
                            {edit ? 
                                editingRow == index ? 
                                <>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        defaultValue={meows.product_description}
                                        id="product_description"
                                        as="textarea"
                                        rows={10}
                                        onChange={e => handleChange(e)}
                                        />
                                    </InputGroup>
                                </>
                                :
                                meows.product_description  
                            :
                                meows.product_description 
                            }
                        </td>
                        <td>
                            {!edit ? 
                                meows.product_status == 0 ? 'Active' : 'Inactive'
                                :
                                <>
                                    {
                                        editingRow == index ? 
                                        <>
                                        <select class="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={meows.product_status} onChange={(e) => {setStatusdata(e.target.value)}}>
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                        </select>
                                        </> 
                                        : 
                                        meows.product_status == 0 ? 'Active' : 'Inactive'
                                    }
                                 
                                </>
                            } 
                        </td>
                        <td>
                            {!edit ? 

                                <button class="btn btn-outline-primary btn-sm" type="button" onClick={() => {setEditingRow(index); setEdit(!edit)}}>
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
        else{
            return (
                <td colSpan={7}><center>No orders available</center></td>
            )
        }
    }

    function ImageModal(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img class="img-thumbnail cakebox" src={imagesrc}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => alert('Coming soon.')}>Edit</Button>
                    { /* for edit : click button to popup upload, create temp var for old pic. cancel edit save image from old pic */ }
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    function AddProduct(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form id="add-product" onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <div class="row">
                            <div class="col-12 mb-3">
                                <Form.Label htmlFor="basic-url">Category</Form.Label>
                                <Form.Select aria-label="Default select example" id="product_category">
                                    <option value="ANNIVERSARY">Anniversary</option>
                                    <option value="BENTO">Bento</option>
                                    <option value="BIRTHDAY">Birthday</option>
                                    <option value="CHARACTER">Character</option>
                                    <option value="CHRISTENING">Christening</option>
                                    <option value="CUPCAKE">Cupcake</option>
                                    <option value="DEBUT">Debut</option>
                                    <option value="GENDER">Gender</option>
                                    <option value="NUMBER">Number</option>
                                    <option value="WEDDING">Wedding</option>
                                </Form.Select>
                            </div>
                            <div class="col-12">
                            <Form.Label htmlFor="basic-url">Name</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                required
                                placeholder="Name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_name"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-md-6">
                            <Form.Label htmlFor="basic-url">Price</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                required
                                placeholder="Price"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_price"
                                type="number"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-md-6">
                            <Form.Label htmlFor="basic-url">Size</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                required
                                placeholder="Size"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_size"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-md-6">
                            <Form.Label htmlFor="basic-url">Flavor</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Flavor"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_flavor"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-md-6">
                            <Form.Label htmlFor="basic-url">Shape</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Shape"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_shape"
                                />
                            </InputGroup>
                            </div>
                            
                            <div class="col-12">
                            <Form.Label htmlFor="basic-url">Icing</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Icing"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_icing"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-md-6">
                            <Form.Label htmlFor="basic-url">Layer</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Layer"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_layer"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-md-6">
                            <Form.Label htmlFor="basic-url">Tier</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                placeholder="Tier"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="product_tier"
                                />
                            </InputGroup>
                            </div>

                            <div class="col-12">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type="file" id="image" accept="image/*"
                                required/>
                            </Form.Group>
                            </div>

                            <div class="col-12">
                            <Form.Label htmlFor="basic-url">Description</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                as="textarea"
                                rows={3}
                                placeholder="Description"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                id="SpecialRequest"
                                />
                            </InputGroup>
                            </div>
                            
                        </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Save</Button>
                    { /* for edit : click button to popup upload, create temp var for old pic. cancel edit save image from old pic */ }
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                </Form>
            </Modal>
        );
    }

    return (
        <main class="page">
            <section class="clean-block clean-product dark">
                <br/>
                <div class="reservationcard">
                    <center>
                        <h1>Products</h1>
                    </center>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i class="icon-magnifier icon"/></InputGroup.Text>
                        <Form.Control
                        placeholder="Product Name"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Flavor</th>
                                <th>Shape</th>
                                <th>Icing</th>
                                <th>Layer</th>
                                <th>Tier</th>
                                <th>Description</th>
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
                    <div class="col-lg-3 col-sm-8 col-12">
                        <button class="btn btn-primary w-100" type="button" onClick={() => setProductModalShow(true)}>
                            <i class="icon-plus icon"/>
                            Add Item
                        </button>
                    </div>
                    
                </div>
                <ImageModal
                    show={imageModalShow}
                    onHide={() => setImageModalShow(false)}
                />
                <AddProduct
                    show={productModalShow}
                    onHide={() => setProductModalShow(false)}
                />
            </section>
        </main>
    )
}
export default Products