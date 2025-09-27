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
        <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {new Date(booking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p><strong>Fare:</strong> LKR {booking.fare}/= </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyBookingModal;
