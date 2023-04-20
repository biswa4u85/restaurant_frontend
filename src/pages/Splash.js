import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { apiGetCall } from "../services/frappe-apis";
import { AuthModeContext } from "../contexts";
import config from "../common/config";

export function Splash() {
    // const { users, restaurant, setRestaurant } = useContext(AuthModeContext);
    const navigate = useNavigate();

    useEffect(() => {
        // getData()
        navigate('/auth');
    }, [])

    // const getData = async () => {
    //     let groups = await apiGetCall(`de_restaurant_backend.api.v_0_1.restaurant.restaurant_info`, {})
    //     if (groups.status != 'error') {
    //         setRestaurant(groups)
    //     }
    // };

    return (
        <></>
        // <div className="splash_bg">
        //     <div className="osahan-index">
        //         <div className="text-center">
        //             <div className="logo-center text-center p-4">
        //                 <NavLink to={users?.auth_key ? "home" : "auth"}>
        //                     <img src={config?.imageURL + restaurant?.restaurant_logo} className="img-fluid" alt="logo" />
        //                 </NavLink>
        //                 <NavLink to={users?.auth_key ? "home" : "auth"}><button class="btn btn-primary">{restaurant?.restaurant_name}</button></NavLink>
        //             </div>
        //             <div className="fixed-bottom text-center p-4">
        //                 <img src="https://restaurant.scrollmonkey.com/files/powered by.png" alt="" />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}