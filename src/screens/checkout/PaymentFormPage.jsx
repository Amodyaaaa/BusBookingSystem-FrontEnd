import React, { useState, useEffect, useRef } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./PaymentFormPage.css";
import { jwtDecode } from "jwt-decode";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentForm = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  const decodedToken = jwtDecode(token);
  const passengerId = decodedToken._id;


  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState(false);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);

  // Parse URL params and fallback with default safe values
  const seatCount = Number(searchParams.get("seatcount")) || 0;
  const distance = Number(searchParams.get("distance")) || 0;
  const rate = Number(searchParams.get("rate")) || 0;
  const busId = searchParams.get("busId");
  const startPlace = searchParams.get("startPlace");
  const endPlace = searchParams.get("endPlace");
  const amount = seatCount * distance * rate;
  const seatNumbersParam = searchParams.get("seats"); // e.g., "4,6,7"
  const seatNumbers = seatNumbersParam ? seatNumbersParam.split(",").map(Number) : [];

  
  // Fetch USD conversion rate for LKR
  const getLKRtoUSD = async () => {
    try {
      const response = await fetch(
        "https://v6.exchangerate-api.com/v6/7e9f2f90afbaa07287c1d0cf/latest/LKR"
      );
      const data = await response.json();
      return data.conversion_rates.USD;
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      return null;
    }
  };

  // Convert LKR amount to Stripe cents in USD
  const calculateUSD = async (lkrAmount) => {
    const rate = await getLKRtoUSD();
    if (!rate) throw new Error("Failed to fetch exchange rate");
    const usdAmount = lkrAmount * rate;
    return Math.round(usdAmount * 100); // Stripe expects cents
  };

  const hasRun = useRef(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const usdAmount = await calculateUSD(amount);
      try {
        const response = await axios.post(
          "http://localhost:4000/stripe/create-payment-intent",
          {
            amount: usdAmount,
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError("Failed to load payment information. Please try again later.");
      }
    };
    if (!hasRun.current) {
      hasRun.current = true;
      if (amount > 0) {
        createPaymentIntent();
      } else {
        setError("Invalid payment amount.");
      }
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }
    
    await  bookSeatInBackend();    

    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       name: name,
    //       email: email,
    //     },
    //   },
    // });
    
    // if (result.error) {
    //   setError(result.error.message);
    //   setProcessing(false);
    // } else {
    //   if (result.paymentIntent.status === "succeeded") {

        setSuccess(true);
        
        setError(null);
        setShowEmailConfirm(true);
    //   }
    // }
    setProcessing(false);
  };

  const bookSeatInBackend = async () => {    
    try {
      for (const seatNumber of seatNumbers) {
        const response = await axios.post("http://localhost:4000/bookings/bookSeat", {
          busId: busId,
          passengerId: passengerId,
          seatNumber: seatNumber,
          startPlace: startPlace,
          endPlace: endPlace,
          bookingDate: new Date().toISOString().split("T")[0],
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.data.success) {
          console.log("Booking successful:", response.data.booking);
          // Optionally show success message or redirect
        } else {
          console.error("Booking failed:", response.data.message);
        }
    }
      
    } catch (err) {
      console.error("Booking error:", err);
    }
    
  };
  

  const handleEmailConfirmation = async (sendEmail) => {
    if (sendEmail) {
      try {
        await axios.post("http://localhost:4000/send-confirmation-email", {
          email,
          name,
          seatCount,
          amount,
        });
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
      }
    }
    navigate("/");
  };

  if (showEmailConfirm) {
    return (
      <div className="payment-container">
        <div className="payment-form">
          <h2 className="form-title">Payment Successful!</h2>
          <p>Would you like to receive a confirmation email?</p>
          <button
            onClick={() => handleEmailConfirmation(true)}
            className="submit-button"
          >
            Yes, send email
          </button>
          <button
            onClick={() => handleEmailConfirmation(false)}
            className="submit-button secondary"
          >
            No, thanks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="form-title">Complete Your Booking</h2>
        <div className="booking-info">
          <span className="seat-count">{seatCount}</span> seat(s) -{" "}
          <span className="amount">LKR {amount.toFixed(2)}</span>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            disabled={processing}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={processing}
          />
        </div>

        <div className="form-group">
          <label htmlFor="card-element">Credit or debit card</label>
          <div className="card-element-container">
            <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">Payment successful!</div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={!stripe || processing || !clientSecret}
        >
          {processing ? "Processing..." : `Pay LKR ${amount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
