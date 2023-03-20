import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCall } from "../services/frappe-apis";
import { AuthModeContext } from "../contexts";
import config from "../common/config";

export function Splash() {
    const { users, restaurant, setRestaurant  } = useContext(AuthModeContext);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let groups = await apiGetCall(`de_restaurant_backend.api.v_0_1.restaurant.restaurant_info`, {})
        if (groups.status != 'error') {
            setRestaurant(groups)
        }
    };

    return (
        <div className="splash_bg">
            <div className="osahan-index">
                <div className="text-center">
                    <div className="logo-center text-center p-4">
                        <NavLink to={users?.auth_key ? "/home" : "/login"}>
                            <img src={restaurant?.restaurant_logo ? config.imageURL + restaurant.restaurant_logo : "http://restaurant.develop.helloapps.io/files/logo-img.png"} className="img-fluid" alt="logo" />
                        </NavLink>
                    </div>
                    <div className="fixed-bottom text-center p-4">
                        <img src="http://restaurant.develop.helloapps.io/files/powered by.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}