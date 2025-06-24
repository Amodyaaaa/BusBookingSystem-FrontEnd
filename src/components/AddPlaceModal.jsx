import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextInput from "./TextInput/TextInput";
import { useState } from "react";
import axios from "axios";

function AddPlaceModal(props) {
  const [startPlace, setStartPlace] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endPlace, setEndPlace] = useState("");
  const [distance, setDistance] = useState("");
  const [travelTime, setTravelTime] = useState("");

  const addNewSegment = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; 
    const startTimeAsDate = new Date(`${currentDate}T${startTime}`);
    const segmentData = {
      start_place: startPlace,
      start_time: startTimeAsDate,
      end_place: endPlace,
      distance: distance,
      travel_time: travelTime,
      root_number: props.routeNo,
    };
    console.log(segmentData);

    const response = await axios.post(
      "http://localhost:4000/busroot/addBusRoot",
      {
        ...segmentData,
        index: props.segments.length,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("bustoken"))}`,
        },
      }
    );
    console.log("🚀 ~ addNewSegment ~ response:", response);

      if (response.data.success) {
        props.setSegments(response.data.busRoot.segments);
        setStartPlace("")
        setStartTime("")
        setEndPlace("")
        setDistance("")
        setTravelTime("")
        props.onHide();
      }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Body>
        <h4 className=" d-flex justify-content-center">
          Add New Place Segment
        </h4>
        <div>
          {props.segments.length === 0 && (
            <>
              <div className="row align-items-center gap-3">
                <div className="col-2">Start place:</div>
                <div className="col-4">
                  <TextInput
                    type="text"
                    value={startPlace}
                    onChange={setStartPlace}
                    placeholder="Enter start place"
                  />
                </div>
              </div>
              <div className="row align-items-center gap-3">
                <div className="col-2">Start time:</div>
                <div className="col-4">
                  <TextInput
                    type="time"
                    placeholder="Enter start time"
                    value={startTime}
                    onChange={setStartTime}
                  />
                </div>
              </div>
            </>
          )}
          <div className="row align-items-center gap-3">
            <div className="col-2">End place:</div>
            <div className="col-4">
              <TextInput
                value={endPlace}
                onChange={setEndPlace}
                type="text"
                placeholder="Enter end place"
              />
            </div>
          </div>
          <div className="row align-items-center gap-3">
            <div className="col-2">Distance:</div>
            <div className="col-4">
              <TextInput
                value={distance}
                onChange={setDistance}
                type="number"
                placeholder="Enter distance"
              />
            </div>
          </div>
          <div className="row align-items-center gap-3">
            <div className="col-2">Travel time:</div>
            <div className="col-4">
              <TextInput
                value={travelTime}
                onChange={setTravelTime}
                type="number"
                placeholder="Enter travel time"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addNewSegment}>Save</Button>
        <Button className="btn btn-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPlaceModal;
