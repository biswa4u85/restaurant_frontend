import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { toast } from 'react-toastify';
import { loginApi } from "../services/frappe-apis";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import config from "../common/config";

export function SignUp() {
    let navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { restaurant, setUsers } = useContext(AuthModeContext);
    const onSubmit = async (data) => {
        let user = await loginApi(`de_restaurant_backend.api.v_0_1.customer.create_user`, data)
        if (user.status_code == 200) {
            toast.success(user.message)
            setUsers(user)
            navigate('/home')
        } else {
            console.log(user.error)
            toast.error(JSON.stringify(user.error))
        }
    };
    return (
        <>
           <section>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        {restaurant?.signup_banners && ((restaurant.signup_banners).map((item, key) => <div class={"carousel-item " + (key == 0 ? 'active' : '')}>
                            <NavLink key={key} to="/">
                                <img src={config.imageURL + item.image} className="logo-over" alt="logo" />
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
                    <p className="text-divider varification-p">Sign up</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" novalidate>
                        <input className="form-control  p-3 box_rounded mb-3 " type="text" placeholder="Name" {...register("first_name", { required: true })} required />
                        <input className="form-control  p-3 box_rounded mb-3 " type="number" placeholder="Phone" {...register("phone", { required: true })} required />
                        <input className="form-control  p-3 box_rounded mb-3 " type="text" placeholder="Email" {...register("email", { required: true })} required />
                        <input className="form-control  p-3 box_rounded mb-3 " type="password" placeholder="Your Password" {...register("new_password", { required: true })} required />
                        <input className="form-control  p-3 box_rounded mb-3 " type="text" placeholder="Confirm Password" {...register("confirm_password", { required: true })} required />
                        <div style={{ textAlign: 'right' }}><NavLink to="/login">Log in</NavLink></div>
                        <div className="p-4 fixed-bottom">
                            <button type="submit" className="btn save-btn btn-block box_rounded w-100 py-3">Continue</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}