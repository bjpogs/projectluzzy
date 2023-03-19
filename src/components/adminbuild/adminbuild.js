import React, {useState, useEffect} from "react";
import axios from '../../api/api'
import { Button, Form, Modal } from "react-bootstrap";

const Adminbuild = () => {
    const [data, setData] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [EditmodalShow, setEditModalShow] = useState(false)
    const [id, setid] = useState(null)
    const [editname, seteditname] = useState(null)
    const [editprice, seteditprice] = useState(null)
    const [editcolor, seteditcolor] = useState(0)
    useEffect(() => {
        axios.get('buildselect')
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    const selectsize = () => {
        return (
            data.map(meow => {
                if (meow.id == "size"){
                    return (
                        <option value={meow.name}>{meow.name} - {meow.price}</option>
                    )
                }
            })
        )
    }

    const selectshape = () => {
        return (
            data.map(meow => {
                if (meow.id == "shape"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }
    
    const selectflavor = () => {
        return (
            data.map(meow => {
                if (meow.id == "flavor"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }

    const selectdesign = () => {
        return (
            data.map(meow => {
                if (meow.id == "design"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }

    const selectsprinklesdesign = () => {
        return (
            data.map(meow => {
                if (meow.id == "design-sprinkles"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }

    const selecttopping = () => {
        return (
            data.map(meow => {
                if (meow.id == "topping"){
                    return (
                        <option value={meow.name}>{meow.name} - {meow.price}</option>
                    )
                }
            })
        )
    }

    const selecttopper = () => {
        return (
            data.map(meow => {
                if (meow.id == "topper"){
                    return (
                        <option value={meow.name}>{meow.name} - {meow.price}</option>
                    )
                }
            })
        )
    }

    const selecticing = () => {
        return (
            data.map(meow => {
                if (meow.id == "icing"){
                    return (
                        <option value={meow.name}>{meow.name}</option>
                    )
                }
            })
        )
    }

    const addsave = () => {
	let errorchecker = false;
	if (!document.getElementById('addname').value) {
		alert('please complete form.')
		errorchecker = true;
	}
	if ( id == "design" || id == "topper" || id == "design-sprinkles") {
		if (!document.getElementById('addimage').files[0]) {
			alert('please add product image!')
			errorchecker = true;
		}
	}
        if (!errorchecker) {
            const form = new FormData()
            form.append('id', id)
            form.append('name', document.getElementById('addname').value)
            form.append('price',  id === 'size' || id === 'topping' || id === 'topper' ? document.getElementById('addprice').value == "" ? 0 : document.getElementById('addprice').value : 0)
            form.append('image', id == 'design' || id =='design-sprinkles' || id == 'topper' ? document.getElementById('addimage').files[0] : id == 'flavor' ? document.getElementById('addcolor').value : '')
	    axios.post('addbuildselect', form)
            .then(res => {
                alert('Success!')
                setModalShow(false)
                setid(null)
                window.location.reload()
            })
            .catch(err =>{
                alert('something went wrong. please try again later.')
            })
        }
    }

    const deleteselect = (deleteid) => {
        var items =  document.getElementById(`${deleteid}`).value
        axios.delete(`deletebuildselect/${items}`)
        .then(res => {
            alert('Success!')
            setid(null)
            window.location.reload()
        })
        .catch(err =>{
            alert('something went wrong. please try again later.')
        })
    }

    const editsave = () => {
        var foul = false
        if (!document.getElementById('editname').value) {
            alert('name required!')
        }
        else{
            if (id =='size'|| id == 'topper'){
                if (document.getElementById('editprice').value == "") {
                    alert('price required!');
                    foul = true
                }
            }
            if(!foul){
                // save
                const form = new FormData()
                form.append('id', editname)
                form.append('name', document.getElementById('editname').value)
                form.append('price',  id === 'size' || id === 'topping' || id === 'topper' ? document.getElementById('editprice').value : 0)
                form.append('image', id == 'design' || id =='design-sprinkles' || id == 'topper' ? document.getElementById('editimage').files[0] != '' ? document.getElementById('editimage').files[0] : '' : id == 'flavor' ? document.getElementById('addcolor').value : '')
                
		axios.post('editbuildselect', form)
                .then(res => {
                    alert('Success!')
                    setid(null)
                    seteditname(null)
                    seteditprice(null)
                    setEditModalShow(false)
                    window.location.reload()
                })
                .catch(err => {
                    alert('something went wrong. please try again later.')
                })
            }
        }
        
        
    }

    const beforeedit = (tempid) => {
        setid(tempid); 
        seteditname(document.getElementById(`${tempid}`).value); 
		try{
			var found = data.find(e => e.name === document.getElementById(`${tempid}`).value);
			seteditprice(found.price)
			seteditcolor(found.image)
		}
		catch(err){
			seteditprice(0)
		}
        
        setEditModalShow(true);
    }

    function SizeModal(props) {
        return (
          <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
          >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add {id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="mb-2 row">
                    <label for="staticEmail" class="col-12 col-form-label fw-bold">Name</label>
                    <div class="col-12">
                    <input type="text" class="form-control" id="addname" placeholder="Enter value" />
                    </div>
                </div>
		{id === 'flavor' ? 
                <div class="mb-2 row">
                    <label for="staticEmail" class="col-12 col-form-label fw-bold">Color</label>
                    <div class="col-12">
                    <input type="color" class="form-control" id="addcolor" placeholder="" style={{ height: "50px" }} />
                    </div>
                </div>
		:<></>}
                {id === 'size' || id === 'topping' || id === 'topper' ? 
                    <div class="mb-2 row">
                        <label for="staticEmail" class="col-12 col-form-label fw-bold">Price</label>
                        <div class="col-12">
                        <input type="text" class="form-control" id="addprice" placeholder="0"/>
                        </div>
                    </div> 
                :
                <></>
				}
				{id === 'design' || id === 'topper' || id ==='design-sprinkles'?
					 /*
					 <div class="mb-2 row">
						<Form.Group controlId="formFile" className="mb-3">
							<Form.Label>Upload {id}</Form.Label>
							<Form.Control type="file" id="image" accept="image/*"
							required/>
						</Form.Group>
					</div>
					*/
					<div class="mb-2 row">
						<label for="staticEmail" class="col-12 col-form-label fw-bold">Image</label>
						<div class="col-12">
						<input type="file" class="form-control" id="addimage" accept="image/*" required/>
						</div>
					</div>
				:
				<></>
				}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addsave()}>Save</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    function EditModal(props){
        return (
            <Modal
                  {...props}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
            >
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      Edit {id}
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div class="mb-2 row">
                      <label for="staticEmail" class="col-12 col-form-label fw-bold">Name</label>
                      <div class="col-12">
                      <input type="text" class="form-control" id="editname" placeholder="Enter value" defaultValue={editname}/>
                      </div>
                  </div>
		{id === 'flavor' ? 
                <div class="mb-2 row">
                    <label for="staticEmail" class="col-12 col-form-label fw-bold">Color</label>
                    <div class="col-12">
                    <input type="color" class="form-control" id="addcolor" placeholder="" defaultValue={editcolor} style={{ height: "50px" }}/>
                    </div>
                </div>
		:<></>}
                  {id === 'size' || id === 'topping' || id === 'topper' ? 
                      <div class="mb-2 row">
                          <label for="staticEmail" class="col-12 col-form-label fw-bold">Price</label>
                          <div class="col-12">
                          <input type="text" class="form-control" id="editprice" placeholder="0" defaultValue={editprice}/>
                          </div>
                      </div> 
                  :
                  <></>
				  }
				  {id === 'design' || id === 'topper' || id === 'design-sprinkles' ?
					 /*
					 <div class="mb-2 row">
						<Form.Group controlId="formFile" className="mb-3">
							<Form.Label>Upload {id}</Form.Label>
							<Form.Control type="file" id="image" accept="image/*"
							required/>
						</Form.Group>
					</div>
					*/
					<div class="mb-2 row">
						<label for="staticEmail" class="col-12 col-form-label fw-bold">Image</label>
						<div class="col-12">
						<input type="file" class="form-control" id="editimage" accept="image/*" required/>
						</div>
					</div>
				  :
				  <></>
				  }
  
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={() => editsave()}>Save</Button>
                  <Button variant="danger" onClick={props.onHide}>Close</Button>
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
                        <h1>Build a Cake</h1>
                        <p>Options for build a cake</p>
                    </center>
                    <br/>
                    <div class="row">
                        <div class="col-12 mb-3">
                            <Form.Label htmlFor="basic-url"><h4><b>Size </b></h4></Form.Label>
                            <Form.Select aria-label="Default select example" id="size">
                                {selectsize()}
                            </Form.Select>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-success w-100" type="button" onClick={() => {setid('size'); setModalShow(true)}}>
                                <i class="icon-plus icon"/>
                                Add
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-primary w-100" type="button" onClick={() => {beforeedit('size')}}>
                                <i class="icon-pencil icon"/>
                                Edit
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-danger w-100" type="button" onClick={() => {
                                if (window.confirm('Are you sure you want to delete?')) {
                                    // Save it!
                                    setid('size');
                                    deleteselect('size')
                                }
                            }}>
                                <i class="icon-trash icon"/>
                                Delete
                            </button>
                        </div>
                        
                        <div class="col-12 mb-3">
                            <Form.Label htmlFor="basic-url"><h4><b>Flavor </b></h4></Form.Label>
                            <Form.Select aria-label="Default select example" id="flavor">
                                {selectflavor()}
                            </Form.Select>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-success w-100" type="button" onClick={() => {setid('flavor'); setModalShow(true)}}>
                                <i class="icon-plus icon"/>
                                Add
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-primary w-100" type="button" onClick={() => {beforeedit('flavor')}}>
                                <i class="icon-pencil icon"/>
                                Edit
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-danger w-100" type="button" onClick={() => {
                                if (window.confirm('Are you sure you want to delete?')) {
                                    // Save it!
                                    setid('flavor');
                                    deleteselect('flavor')
                                }
                            }}>
                                <i class="icon-trash icon"/>
                                Delete
                            </button>
                        </div>
                        
                        <div class="col-12 mb-3">
                            <Form.Label htmlFor="basic-url"><h4><b>Design</b></h4></Form.Label>
                            <Form.Select aria-label="Default select example" id="design">
                                {selectdesign()}
                            </Form.Select>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-success w-100" type="button" onClick={() => {setid('design'); setModalShow(true)}}>
                                <i class="icon-plus icon"/>
                                Add
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-primary w-100" type="button" onClick={() => {beforeedit('design')}}>
                                <i class="icon-pencil icon"/>
                                Edit
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-danger w-100" type="button" onClick={() => {
                                if (window.confirm('Are you sure you want to delete?')) {
                                    // Save it!
                                    setid('design');
                                    deleteselect('design')
                                }
                            }}>
                                <i class="icon-trash icon"/>
                                Delete
                            </button>
                        </div>
{/*
                        <div class="col-12 mb-3">
                            <Form.Label htmlFor="basic-url"><h4><b>Sprinkles Design</b></h4></Form.Label>
                            <Form.Select aria-label="Default select example" id="design-sprinkles">
                                {selectsprinklesdesign()}
                            </Form.Select>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-success w-100" type="button" onClick={() => {setid('design-sprinkles'); setModalShow(true)}}>
                                <i class="icon-plus icon"/>
                                Add
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-primary w-100" type="button" onClick={() => {beforeedit('design-sprinkles')}}>
                                <i class="icon-pencil icon"/>
                                Edit
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-danger w-100" type="button" onClick={() => {
                                if (window.confirm('Are you sure you want to delete?')) {
                                    // Save it!
                                    setid('design-sprinkles');
                                    deleteselect('design-sprinkles')
                                }
                            }}>
                                <i class="icon-trash icon"/>
                                Delete
                            </button>
                        </div>

                         --------------------------------------- topper ------------------------------------------ */}

                        <div class="col-12 mb-3">
                            <Form.Label htmlFor="basic-url"><h4><b>Topper</b></h4></Form.Label>
                            <Form.Select aria-label="Default select example" id="topper">
                                {selecttopper()}
                            </Form.Select>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-success w-100" type="button" onClick={() => {setid('topper'); setModalShow(true)}}>
                                <i class="icon-plus icon"/>
                                Add
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-primary w-100" type="button" onClick={() => {beforeedit('topper')}}>
                                <i class="icon-pencil icon"/>
                                Edit
                            </button>
                        </div>
                        <div class="col-lg-3 col-xl-2 mb-2">
                            <button class="btn btn-outline-danger w-100" type="button" onClick={() => {
                                if (window.confirm('Are you sure you want to delete?')) {
                                    // Save it!
                                    setid('topper');
                                    deleteselect('topper')
                                }
                            }}>
                                <i class="icon-trash icon"/>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <SizeModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <EditModal
                    show={EditmodalShow}
                    onHide={() => setEditModalShow(false)}
                />
            </section>
        </main>
    )
}

export default Adminbuild
