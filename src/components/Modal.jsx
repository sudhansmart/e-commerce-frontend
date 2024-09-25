import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

function ModalComponent({modalShow,setModalShow,modalData}) {
  return (
    <Modal
    show={modalShow}
    onHide={() => setModalShow(false)}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {modalData.name}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='text-center'>
      <img src={modalData.image} alt={modalData.name} className='modal-img' />
      <h4 className='modal-price'><FontAwesomeIcon icon={faIndianRupeeSign}  /> {modalData.price}</h4>
      <h5 className='product-category'>Category : {modalData.category}</h5>
      <h6 className='product-quantity'>Qty-Left :{modalData.quantity}</h6>
          <hr/>

      <p className='product-description'>
         {modalData.description}
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={()=>setModalShow(false)}>Buy Now</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComponent