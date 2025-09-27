import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewPassengerModal({ booking, onHide, ...props }) {
  if (!booking) return null; // ✅ prevents errors when no booking is selected

  return(
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <h5>Booking Information</h5>
          <p><strong>User Name:</strong> {`${booking.passenger.firstName} ${booking.passenger.lastName}`}</p>
          <p><strong>Seat Number:</strong> {booking.seatNumber}</p>
          <p><strong>From:</strong> {booking.startPlace}</p>
          <p><strong>To:</strong> {booking.endPlace}</p>
          <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><strong>Booking Time:</strong> {new Date(booking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewPassengerModal;
