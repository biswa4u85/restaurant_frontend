import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useLocalStorage } from "../hooks/useLocalStorage";

export function PaymentSuccess() {
    let navigate = useNavigate();


    return (
        <div className="pb-3">
            <div className="border-bottom text-center pt-5 pb-2">
                <h4 className="fw-bold">Payment Successful</h4>

            </div>
            <div className="container dine-in my-5">
                <div className="main-logo text-center">
                    <img src="http://restaurant.develop.helloapps.io/files/Vector (16).png" alt="" />
                </div>
                <div className="heading-text text-center mt-4">
                    <h3 className="fw-bolder">THANK YOU FOR DINING WITH US.</h3>
                    <p>We hope you come back soon! We’d love to hear feedback on your experience. </p>
                </div>
                <div className="container">
                    <div className="row mt-5 check-buttons">
                        <NavLink to="/" className="btn form-control text-center py-3">
                            <img src="http://restaurant.develop.helloapps.io/files/Google logo.png" alt="" className="me-2" /> Review us on Google
                        </NavLink>
                        <NavLink to="/" className="btn form-control text-center mt-3 py-3">
                            <img src="http://restaurant.develop.helloapps.io/files/Facebook logo.png" alt="" className="me-2" /> Follow us on Facebook
                        </NavLink>
                        <NavLink to="/" className="btn form-control text-center mt-3 py-3">
                            <img src="http://restaurant.develop.helloapps.io/files/Instagram logo.png" alt="" className="me-2" /> Follow us on Instagram
                        </NavLink>
                    </div>
                </div>

            </div>


        </div>
    );
}