import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MyBookingModal({ booking, onHide, ...props }) {
  if (!booking) return null;

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Bus Name:</strong> {booking.busId.Bus_name}</p>
        <p><strong>Seat Number:</strong> {booking.seatNumber}</p>
        <p><strong>From:</strong> {booking.startPlace}</p>
        <p><strong>To:</strong> {booking.endPlace}</p>
        <p><strong>Date:</strong> {booking.bookingDate}</p>
        <p><strong>Fare:</strong> ${booking.fare}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyBookingModal;
