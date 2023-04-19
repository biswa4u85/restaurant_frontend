import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { toast } from 'react-toastify';
import { loginApi } from "../services/frappe-apis";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import config from "../common/config";

export function Login() {
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { table, restaurant, setUsers } = useContext(AuthModeContext);
    const onSubmit = async (data) => {
        let user = await loginApi(`de_restaurant_backend.api.v_0_1.login.login`, data)
        if (user.status == 'error') {
            toast.error(JSON.stringify(user.error))
        } else {
            toast.success(user.message)
            setUsers(user)
            navigate('/table')
        }
    };


    return (
        <>
            <section>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        {restaurant?.signup_banners && ((restaurant.signup_banners).map((item, key) => <div class={"carousel-item " + (key == 0 ? 'active' : '')}>
                            <NavLink key={key} to="/">
                                <img src={config.imageURL + item.image} width="100%" height="350" className="logo-over" alt="logo" />
                            </NavLink>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="padding_bottom login-page">
                <section className="bg-white body_rounded mt-n5 position-relative p-4 text-center">
                    <h2 className="fw-bold varification-h">Flavors for Royalty</h2>
                    <p className="mb-5 varification-p">A Whole New Way To Indulge</p>
                    <p className="text-divider varification-p">Log in</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" novalidate>
                        <input className="form-control  p-3 box_rounded mb-3 " type="text" placeholder="Your Email or Phone no." {...register("username", { required: true })} required />
                        <input className="form-control  p-3 box_rounded mb-3 " type="password" placeholder="Your Password" {...register("password", { required: true })} required />
                        <div style={{ float: 'right' }}><NavLink to="/signUp">Sign up</NavLink></div>
                        {/* <div style={{ float: 'left' }}><NavLink to="/forgot-password">Forgot Password</NavLink></div> */}
                        <div className="p-4 fixed-bottom">
                            <button type="submit" className="btn save-btn btn-block box_rounded w-100 py-3">Continue</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}