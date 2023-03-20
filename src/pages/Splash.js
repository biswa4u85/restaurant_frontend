import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCall } from "../services/frappe-apis";
import { AuthModeContext } from "../contexts";
import axios from 'axios';

export function Splash() {
    const { users } = useContext(AuthModeContext);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        var data = '';

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://restaurant.develop.helloapps.io/api/method/de_restaurant_backend.api.v_0_1.restaurant.restaurant_info',
            headers: {
                'Cookie': 'full_name=Customer%20One; sid=3ff8808ca2d4d41c4762605fd9efd1d1c135d899d8ce4ece501ef10f; system_user=yes; user_id=cusone%40gmail.com; user_image='
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

        let groups = await apiGetCall(`de_restaurant_backend.api.v_0_1.restaurant.restaurant_info`, {})
        if (groups.status != 'error') {
            console.log(groups)
        }
    };

    return (
        <div className="splash_bg">
            <div className="osahan-index">
                <div className="text-center">
                    <div className="logo-center text-center p-4">
                        <NavLink to={users?.auth_key ? "/home" : "/login"}>
                            <img src={"http://restaurant.develop.helloapps.io/files/logo-img.png"} className="" alt="logo" />
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