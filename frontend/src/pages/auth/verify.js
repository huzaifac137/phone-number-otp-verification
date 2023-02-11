import authContext from "@/CONTEXT/authContext";
import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOptSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(authContext);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });

      const responseData = await response.json();
      if (response.status === 201) {
        toast(responseData.message);
        setOptSent(true);
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otp: otp,
        }),
      });

      const responseData = await response.json();

      if (response.status !== 201) {
        throw new Error("SOMETHING WENT WRONG");
      }

      context.setIsVerified(responseData.isVerified);
      toast.success("Phone number Verified , you are authenticated!");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
      setIsVerified(false);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading === true ? <h2>LOADING...</h2> : null}
      {otpSent === false ? (
        <>
          {" "}
          <input
            type="text"
            placeholder="Enter phone number ( country-code format only)"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <button onClick={sendOtp}>Send OTP</button>{" "}
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
          />
          <button onClick={verifyOtp}>Verify OTP</button>{" "}
        </>
      )}
    </div>
  );
};

export default Auth;
