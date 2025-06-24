import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentFormPage.css";

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
  const stripe = useStripe();
  const elements = useElements();
  const { seatCount } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState(false);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);

  const amount = seatCount * 1000;

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/stripe/create-payment-intent",
          {
            amount: amount,
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError("Failed to load payment information. Please try again later.");
      }
    };
    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email: email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
        setError(null);
        setShowEmailConfirm(true);
      }
    }
    setProcessing(false);
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
          <span className="seat-count">{seatCount}</span> seat(s)
          <span className="amount">${amount / 100}</span>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="card-element">Credit or debit card</label>
          <div className="card-element-container">
            <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Payment successful!</div>}

        <button
          type="submit"
          className="submit-button"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay $${amount / 100}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
