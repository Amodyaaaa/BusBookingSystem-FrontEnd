import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./screens/signIn/SignIn";
import SignUp from "./screens/signUp/SignUp";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";
import SendOtp from "./screens/sendOtp/SendOtp";
import SignInForBus from "./screens/signInForBus/SignInForBus";
import SignUpForBus from "./screens/signUpForBus/SignUpForBus";
import Home from "./screens/home/Home";
import AboutUs from "./screens/aboutUs/About";
import Contact from "./components/Contact/Contact";
import BusDetails from "./screens/busDetails/BusDetails";
import MyBookings from "./screens/myBookings/MyBookings";
import BusBookings from "./screens/busBookings/BusBookings";
import SeatBookingPage from "./screens/seatBookingPage/SeatBookingPage";
import MyAccount from "./screens/myAccount/MyAccount";
import AddPayment from "./screens/addPayment/AddPayment";
import EnterRoute from "./screens/enterRoute/EnterRoute";
import IndicatePlace from "./screens/indicatePlace/IndicatePlace";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentFormPage from "./screens/checkout/PaymentFormPage";

const stripePromise = loadStripe(
  "pk_test_51PGuMfKJFjjdQS3oOBkk47IXhwyMC90IHaTDrT1wt9RSITO1goF5YVB6T2JtP6r8Xsfrzs6CVHAqA8QarGRtblyb00NVTRuxAV"
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signInBus" element={<SignInForBus />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUpBus" element={<SignUpForBus />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/sendOtp" element={<SendOtp />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/busBookings" element={<BusBookings />} />
        <Route path="/busDetails/:id" element={<BusDetails />} />
        <Route path="/bookingSeat/:id" element={<SeatBookingPage />} />
        <Route path="/profile" element={<MyAccount />} />
        <Route path="/addPayment" element={<AddPayment />} />
        <Route path="/enterRoute" element={<EnterRoute />} />
        <Route path="/indicatePlace" element={<IndicatePlace />} />
        <Route
          path="/paymentForm/:seatCount"
          element={
            <Elements stripe={stripePromise}>
              <PaymentFormPage />
            </Elements>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
