import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyBookingModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h4>ddd</h4>
        <p>
        aa
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyBookingModal
