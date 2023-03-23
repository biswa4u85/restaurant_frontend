import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import config from "../common/config";

export function Dinein() {
    const { restaurant, deliveryType, setDeliveryType, } = useContext(AuthModeContext);
    let navigate = useNavigate();

    return (
        <div className="container dine-in my-5">
            <div className="main-logo text-center">
                <img src={config.imageURL + restaurant.restaurant_logo} height="50" alt="" />
            </div>
            <div className="heading-text text-center mt-4">
                <h3>Dine-in or Takeout?</h3>
                <p>Choose your preference</p>
            </div>
            <div className="container">
                <div className="row mt-5 check-buttons">
                    <button onClick={() => setDeliveryType("Dine-In")} className={"btn form-control text-start py-3 takeout-btn " + (deliveryType == "Dine-In" ? "btn-danger" : "")} id="1">
                        <img src="http://restaurant.develop.helloapps.io/files/Vector5.png" alt="" className="me-2" /> Dine-In
                        <img src="http://restaurant.develop.helloapps.io/files/Vector (2).png" className="float-end me-2 mt-1 success1 s-icon d-none" />
                    </button>
                    <button onClick={() => setDeliveryType("Take Away")} className={"btn form-control text-start mt-3 py-3 takeout-btn " + (deliveryType == "Take Away" ? "btn-danger" : "")} id="2">
                        <img src="http://restaurant.develop.helloapps.io/files/Vector6.png" alt="" className="me-2" /> Take Away
                        <img src="http://restaurant.develop.helloapps.io/files/Vector (2).png" className="float-end me-2 mt-1 success2 s-icon d-none" />
                    </button>
                    <NavLink to="/home" className="btn save-btn btn-block box_rounded w-100 py-3 mt-5" type="submit">Save</NavLink>
                </div>
            </div>

        </div>
    );
}