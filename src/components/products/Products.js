import React, {useState, useEffect, useRef, useForm, useFieldArray} from "react";
import {Table, Spinner, Modal, Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import axios from '../../api/api'

const Products = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [editingRow, setEditingRow] = useState(null)
    const [imageModalShow, setImageModalShow] = useState(false)
    const [productModalShow, setProductModalShow] = useState(false)
    const [imagesrc, setImagesrc] = useState(null)
    const [tempdata, setTempdata] = useState([])
    const [editImg, setEditImg] = useState(false)
    const [displaycategory, setDisplaycategory] = useState('DEFAULT')
    const [displayname, setDisplayname] = useState('')
    const [tempimg, setTempimg] = useState(null)
    const [imgdata, setImgdata] = useState(null)
    const [tempid, setTempid] = useState(null)
    const [modaldata, setmodaldata] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [productedit, setproductedit] = useState(false)
    const [subcategory, setsubcategory] = useState('DEFAULT')
    const [addsub, setaddsub] = useState('default')
    useEffect(() => {
        axios.get('getallproducts')
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
        if (tempdata == null) setEdit(!edit)
        else{
            const tempvar = tempdata
            tempvar['product_id'] = meows.product_id
            axios.post('updateproduct', tempvar)
            .then((res) => {
                let finaldata = {
                    ...meows,
                    ...tempdata
                }
                var lastdata = data.map(obj => {
                    if (obj.product_id == finaldata.product_id){
                        return {...obj, ...finaldata}
                    }
                    return obj
                })
                setData(lastdata)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setEdit(!edit)
                setTempdata(null)
                setEditingRow(null)
            })
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        const newdata = {...tempdata}
        newdata[e.target.id] = e.target.value
        setTempdata(newdata)
    }

    const handleAddChange = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append('product_category', document.getElementById('product_category').value)
        form.append('product_subcategory', document.getElementById('product_subcategory').value)
        form.append('product_name', document.getElementById('product_name').value)
        form.append('product_price', document.getElementById('product_price').value)
        form.append('product_size', document.getElementById('product_size').value)
        form.append('product_flavor', document.getElementById('product_flavor').value)
        form.append('product_shape', document.getElementById('product_shape').value)
        form.append('product_icing', document.getElementById('product_icing').value)
        form.append('product_layer', document.getElementById('product_layer').value)
        form.append('product_tier', document.getElementById('product_tier').value)
        form.append('product_image', document.getElementById('product_image').files[0])
        form.append('product_description', document.getElementById('product_description').value)
        axios.post('addproduct', form)
        .then((res) => {
            alert('Product added successfully.')
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            window.location.reload()
        })
    }

    const renderTable = () => {
        if (data){
            // filtering shit
            return data.filter(meows => {
                if(displayname == "" && displaycategory == "DEFAULT") return meows
                else if (meows.product_name.toUpperCase().includes(displayname.toUpperCase()) && displaycategory == "DEFAULT") return meows
                // else if (meows.product_category.includes(displaycategory) && meows.product_name.toUpperCase().includes(displayname.toUpperCase())) return meows
                
                else if (meows.product_category == displaycategory && meows.product_subcategory == subcategory && displayname == "") {
                    return meows
                }
                else if (displayname !== "" && displaycategory !== "DEFAULT"){
                    if (meows.product_category == displaycategory && meows.product_name.toUpperCase().includes(displayname.toUpperCase())) return meows
                }
                else if (displayname !== "" && displaycategory !== "DEFAULT" && subcategory !== "DEFAULT"){
                    if (meows.product_category == displaycategory && meows.product_subcategory == subcategory && meows.product_name.toUpperCase().includes(displayname.toUpperCase())) return meows
                }
                else if (meows.product_category == displaycategory && displayname == "" && subcategory == "DEFAULT") return meows
            }).map((meows, index) => {
                return(
                    <tr key = {index}>
                        <td class="text-success fw-bold pointed" onClick={() => {setmodaldata(meows); setModalShow(true)}}>{meows.product_id}</td>
                        <td>
                            <button class="btn btn-outline-primary btn-sm w-100"  type="button" onClick={() => {setImagesrc(meows.product_image); setTempid(meows.product_id); setImageModalShow(true)} }>
                                <i class="icon-eye icon"/>
                                View
                            </button>
                        </td>
                        <td>{meows.product_name}</td>
                        <td>
                            {!edit ? 
                                meows.product_status == 0 ? 'Active' : 'Inactive'
                                :
                                <>
                                    {
                                        editingRow == index ? 
                                        <>
                                        <select class="form-select form-select-sm" id="product_status"  aria-label=".form-select-sm example" defaultValue={meows.product_status} onChange={e => handleChange(e)}>
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
                                        <button class="btn w-100 btn-outline-danger btn-sm d-lg-block" type="button" onClick={() => {setEdit(!edit); setEditingRow('null'); setTempdata([])}}><i class="icon-close icon"/>Cancel</button>
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


    const UploadControl = ({ children, value, onChange, disabled, accept }) => {
        return (
          <label htmlFor="contained-button-file" className="m-0 w-100">
            <input
              value={value}
              accept={accept}
              disabled={disabled}
              style={{ display: 'none' }}
              id="contained-button-file"
              multiple
              type="file"
              onChange={disabled ? () => {} : onChange}
            />
            {children}
          </label>
        );
      };

    const handleAddBanner = ({ target: { files } }) => {
        setEditImg(!editImg)
        const loadedImage = files[0];
        setImgdata(files[0])
        setTempimg(imagesrc)
        setImagesrc(URL.createObjectURL(loadedImage))
        // loadedImage will be a image file.
    };

    // save image
    const saveImage = () => {
        if (imgdata != "") {
            var form = new FormData()
            form.append('product_id', tempid)
            form.append('product_image', imgdata)
            form.append('old_img', tempimg)
            axios.post('updateproductimg',form)
            .then((res) => {
                alert('Product image update successful!')
                setEditImg(!editImg)
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else {
            setEditImg(!editImg)
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
                    { 
                        editImg ?
                        <>
                        <Button onClick={()=> saveImage()}variant="success">Save</Button>
                        <Button variant="danger" onClick={() => {setEditImg(!editImg); setImagesrc(tempimg)}}>Cancel</Button>
                        </>
                        :
                        <>
                        <Button>
                            <UploadControl onChange={handleAddBanner} accept="image/*">
                                Edit Image
                            </UploadControl>
                        </Button>

                        <Button variant="danger" onClick={props.onHide}>Close</Button>
                        </>
                    
                    }
                    
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
                <Form onSubmit={(e) => handleAddChange(e)}>
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
                                <option value="Events">Events</option>
                                <option value="Simple">Simple</option>
                                <option value="Cupcake">Cupcake</option>
                            </Form.Select>
                        </div>
                        <div class="col-12 mb-3">
                            <Form.Label htmlFor="basic-url">Sub-category</Form.Label>
                            <Form.Select aria-label="Default select example" id="product_subcategory">
                                <option value="Anniversary">Anniversary</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Character">Character</option>
                                <option value="Christening">Christening</option>
                                <option value="Debut">Debut</option>
                                <option value="Gender">Gender</option>
                                <option value="Wedding">Wedding</option>
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
                            name="product_name"
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
                            <Form.Control type="file" id="product_image" accept="image/*"
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
                            id="product_description"       
                            required
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

    const saveproductedit = () => {

    }
    const handleproductedit = (e) => {
        e.preventDefault()
        const newdata = {...tempdata}
        newdata[e.target.id] = e.target.value
        setTempdata(newdata)
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
                Product Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Name</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_name} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Category</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_category} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">sub category</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_subcategory} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Size</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_size} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Shape</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_shape} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Flavor</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_flavor} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Icing</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_icing == "" ? "None" : modaldata.product_icing} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Layer</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_layer == "" ? "None" : modaldata.product_layer} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Tier</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_tier == "" ? "None" : modaldata.product_tier} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Description</label>
                <div class="col-sm-7">
                <input type="text-area" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_description == "" ? "None" : modaldata.product_description} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            <div class="mb-2 row">
                <label for="staticEmail" class="col-sm-5 col-form-label fw-bold">Price</label>
                <div class="col-sm-7">
                <input type="text" readOnly={!productedit} class={productedit ? "form-control" : "form-control-plaintext"} id="staticEmail" defaultValue={modaldata.product_price} onChange={(e) => {handleproductedit(e)}}/>
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                { !productedit ? 
                    <>
                    <Button onClick={() =>{setproductedit(!productedit)}}>Edit</Button>
                    <Button onClick={props.onHide}>Close</Button>
                    </>
                    :
                    <>
                    <Button onClick={() =>{saveproductedit()}}>Save</Button>
                    <Button onClick={() =>{setproductedit(!productedit)}}>Cancel</Button>
                    </>
                }
                
                
            </Modal.Footer>
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

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="icon-magnifier icon"/></span>
                        <input type="text" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => {setDisplayname(e.target.value)}}/>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-12 col-md-4 col-lg-3 col-xl-2 col-form-label fw-bold">Select By Category</label>
                        <div class="col-sm-12 col-md-8 col-lg-5 col-xl-3 mb-2">
                            <select class="form-select" id="product_category" aria-label=".form-select-sm example" onChange={(e) => {setDisplaycategory(e.target.value); if(e.target.value !== "Events") setsubcategory("DEFAULT")}}>
                                <option value="DEFAULT">ALL</option>
                                <option value="Events">Events</option>
                                <option value="Simple">Simple</option>
                                <option value="Cupcake">Cupcake</option>
                            </select>
                        </div>
                        { displaycategory == "Events" ? 
                        <>
                        <div class="col-sm-12 col-md-8 col-lg-5 col-xl-3">
                            <select class="form-select" id="product_subcategory" aria-label=".form-select-sm example" onChange={(e) => setsubcategory(e.target.value)}>
                                <option value="DEFAULT">ALL</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Character">Character</option>
                                <option value="Christening">Christening</option>
                                <option value="Debut">Debut</option>
                                <option value="Gender">Gender</option>
                                <option value="Wedding">Wedding</option>
                            </select>
                        </div>
                        </>
                        
                        : 
                        <></>    
                    }
                    </div>
                    <Table striped bordered hover responsive >
                        <thead className="table-primary">
                            <tr>
                                <th>Product ID</th>
                                <th>Image</th>
                                <th>Name</th>
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
                <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
            </section>
        </main>
    )
}
export default Products