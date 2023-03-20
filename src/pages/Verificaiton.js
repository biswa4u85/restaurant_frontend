import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useLocalStorage } from "../hooks/useLocalStorage";

export function Verificaiton() {
    let navigate = useNavigate();

    return (
        <>
            <div className="d-flex align-items-center p-3 gurdeep-osahan-inner-header  w-100">
                <div className="left mr-auto">
                    <NavLink to="/home" className="back_button"><i className="btn_detail  shadow-sm mdi mdi-chevron-left "></i></NavLink>
                </div>

            </div>
            <section className="bg-white body_rounded mt-n5 position-relative p-4 text-center">
                <h2 className="mb-3 fw-bold varification-h">Verify your phone number</h2>
                <p className=" mb-5 varification-p">We’ve sent an SMS with an activation code to your phone +91 9900887736</p>
                <form className="d-flex align-items-center verification-form">
                    <input type="number" className="form-control" value="6" maxlength="1" placeholder="-" />
                    <input type="number" className="form-control" value="8" maxlength="1" placeholder="-" />
                    <input type="number" className="form-control" value="" maxlength="1" placeholder="-" />
                    <input type="number" className="form-control" value="" maxlength="1" placeholder="-" />
                    <input type="number" className="form-control" value="" maxlength="1" placeholder="-" />
                </form>
                <div className="resend-verification mt-4">
                    <p className="varification-p">I didn’t receive a code <NavLink to="/home" className="text-dark fw-bold">Resend</NavLink></p>

                </div>
            </section>
            <div className="p-4 fixed-bottom">
                <NavLink to="/home" className="btn save-btn btn-block box_rounded w-100 py-3">Verify</NavLink>
            </div>
        </>
    );
}