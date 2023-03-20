import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { toast } from 'react-toastify';
import { loginApi } from "../services/frappe-apis";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function Login() {
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { users, setUsers } = useContext(AuthModeContext);
    let data = {
        username: "1234567890",
        password: "admin@123"
    }
    const onSubmit = async (data1) => {
        let user = await loginApi(`de_restaurant_backend.api.v_0_1.login.login`, data)
        if (user.status == 'error') {
            console.log(user.error)
            toast.error(JSON.stringify(user.error))
        } else {
            toast.success(user.message)
            setUsers(user)
            navigate('/home')
        }
    };
    return (
        <>
            <section>
                <div className="detail_slider mb-0">
                    <NavLink to="/home">
                        <div className=" detail_item">
                            <img src="http://restaurant.develop.helloapps.io/files/logo-img.png" className="logo-over" alt="logo" />
                            <img src="http://restaurant.develop.helloapps.io/files/Rectangle food1.png" className="img-fluid w-100" />
                        </div>
                    </NavLink>
                    <NavLink to="/home">
                        <div className=" detail_item">
                            <img src="http://restaurant.develop.helloapps.io/files/logo-img.png" className="logo-over" alt="logo" />
                            <img src="http://restaurant.develop.helloapps.io/files/Rectangle food2.png" className="img-fluid w-100" />
                        </div>
                    </NavLink>
                    <NavLink to="/home">
                        <div className=" detail_item">
                            <img src="http://restaurant.develop.helloapps.io/files/logo-img.png" className="logo-over" alt="logo" />
                            <img src="http://restaurant.develop.helloapps.io/files/Rectangle food3.png" className="img-fluid w-100" />
                        </div>
                    </NavLink>
                </div>
            </section>

            <div className="padding_bottom login-page">
                <section className="bg-white body_rounded mt-n5 position-relative p-4 text-center">
                    <h2 className="fw-bold varification-h">Flavors for Royalty</h2>
                    <p className="mb-5 varification-p">A Whole New Way To Indulge</p>
                    <p className="text-divider varification-p">Log in</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" novalidate>
                        <input className="form-control  p-3 box_rounded mb-3 " type="text" placeholder="Your Username" {...register("username", { required: true })} required />
                        <input className="form-control  p-3 box_rounded mb-3 " type="password" placeholder="Your Password" {...register("password", { required: true })} required />
                        <div style={{ textAlign: 'right' }}><NavLink to="/signUp">Sign up</NavLink></div>
                        <div className="p-4 fixed-bottom">
                            <button type="submit" className="btn save-btn btn-block box_rounded w-100 py-3">Continue</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}