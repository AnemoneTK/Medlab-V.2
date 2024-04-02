import Modal from "react-bootstrap/Modal";


export function ModalWarehouseDetail(props) {
  return (
    <>
      {/* Modal add new product */}
      <Modal show={props.showDetail} onHide={()=>{props.setShowDetail(false);}}>
        <Modal.Header closeButton className="bg-success">
          <Modal.Title className="fw-bolder">สร้างรายการยาใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Detail
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={addNewProduct}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
