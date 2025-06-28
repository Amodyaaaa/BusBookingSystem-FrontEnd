import React, { useEffect, useState } from 'react';
import TextInput from '../../components/TextInput/TextInput'; 
import Button from "../../components/Button/Button";
import { toast, Zoom } from "react-toastify";
import validator from 'validator';
import axios from "axios";
import NavbarBus from '../../components/NavbarBus/NavbarBus';
import background from "../../assets/images/bushomebackground.jpg"; 

const AddPayment = () => {
  const [AcNo, setAcNo] = useState('');
  const [bankname, setBankname] = useState('');
  const [branch, setBranch] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [AcNoError, setAcNoError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE = "http://localhost:4000";
  const token = JSON.parse(localStorage.getItem("bustoken"));
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const getPaymentData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/paymentDetails/getBusPaymentbybusId`,
        authHeader
      );
      if (response.data.success) {
        setPaymentData(response.data.busPayment);
        setIsEditing(false);
      } else {
        setPaymentData(null);
        setIsEditing(true);
      }
    } catch (error) {
      setPaymentData(null);
      setIsEditing(true);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  const loadFormFromPayment = () => {
    if (!paymentData) return;
    setAcNo(paymentData.AcNo || '');
    setBankname(paymentData.bankname || '');
    setBranch(paymentData.branch || '');
    setPhoneNumber(paymentData.phoneNumber || '');
    setAcNoError('');
    setPhoneNumberError('');
  };

  const handleSubmit = async () => {
    setAcNoError('');
    setPhoneNumberError('');

    if (!AcNo) {
      setAcNoError("Enter Account Number");
      return;
    } else if (AcNo.length !== 16) {
      setAcNoError("Account Number must be 16 digits");
      return;
    }

    if (!phoneNumber) {
      setPhoneNumberError("Enter Phone Number");
      return;
    } else if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
      setPhoneNumberError("Enter valid Phone Number");
      return;
    }

    try {
      if (paymentData && paymentData._id) {
        // Update existing payment
        const response = await axios.put(
          `${API_BASE}/paymentDetails/updateBusPayment/${paymentData._id}`,
          { AcNo, bankname, branch, phoneNumber },
          authHeader
        );
        if (response.data.success) {
          toast.success("Payment details updated successfully", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
          getPaymentData();
        } else {
          toast.error(response.data.message || "Failed to update payment details", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
        }
      } else {
        // Add new payment
        const response = await axios.post(
          `${API_BASE}/paymentDetails/addPaymentDetails`,
          { AcNo, bankname, branch, phoneNumber },
          authHeader
        );
        if (response.data.success) {
          toast.success("Payment details added successfully", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
          getPaymentData();
        } else {
          toast.error(response.data.message || "Failed to add payment details", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
        }
      }
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occurred", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    if (!paymentData || !paymentData._id) return;
    if (!window.confirm("Are you sure you want to delete your payment details?")) return;

    try {
      const response = await axios.delete(
        `${API_BASE}/paymentDetails/deleteBusPayment/${paymentData._id}`,
        authHeader
      );
      if (response.data.success) {
        toast.success("Payment deleted successfully", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
        setPaymentData(null);
        setIsEditing(true);
        setAcNo('');
        setBankname('');
        setBranch('');
        setPhoneNumber('');
      } else {
        toast.error(response.data.message || "Failed to delete payment", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occurred", { position: "top-right", autoClose: 2000, theme: "dark", transition: Zoom });
      console.error(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 1,
        }}
      />
      <div style={{ position: "relative", zIndex: 2 }}>
        <NavbarBus />
        <div
          className="addPaymentContainer"
          style={{ padding: "30px 20px", display: "flex", justifyContent: "center" }}
        >
          <div
            className="paycontainer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "10px",
              padding: "30px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            {!paymentData || isEditing ? (
              <>
                <h2 className="text-center fw-bold mb-4">{paymentData ? "Edit Payment Details" : "Add Payment Details"}</h2>
                <TextInput
                  placeholder="Account Number"
                  type="text"
                  value={AcNo}
                  onChange={(value) => { if (value.length <= 16) setAcNo(value); }}
                  errorMessage={AcNoError}
                />
                <TextInput
                  placeholder="Bank Name"
                  type="text"
                  value={bankname}
                  onChange={(value) => setBankname(value)}
                />
                <TextInput
                  placeholder="Branch"
                  type="text"
                  value={branch}
                  onChange={(value) => setBranch(value)}
                />
                <TextInput
                  placeholder="Phone Number"
                  type="text"
                  value={phoneNumber}
                  onChange={(value) => setPhoneNumber(value)}
                  errorMessage={phoneNumberError}
                />
                <div className="submitContainer text-center mt-3">
                  <Button type="1" text="Save" onClick={handleSubmit} />
                  {paymentData && (
                    <Button type="3" text="Cancel" onClick={() => { setIsEditing(false); }} style={{ marginLeft: 10 }} />
                  )}
                </div>
              </>
            ) : (
              <>
                <h4 className="text-center fw-bold mb-4">Payment Details</h4>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Account Number</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6">{paymentData.AcNo}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Bank Name</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6">{paymentData.bankname}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Branch</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6">{paymentData.branch}</div>
                </div>
                <div className="row mb-2">
                  <div className="col-5 fw-bold">Phone Number</div>
                  <div className="col-1 text-center">:</div>
                  <div className="col-6">{paymentData.phoneNumber}</div>
                </div>
                <div className="text-center mt-3">
                  <Button type="2" text="Edit" onClick={() => { loadFormFromPayment(); setIsEditing(true); }} />
                  <Button type="3" text="Delete" onClick={handleDelete} style={{ marginLeft: 10 }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
