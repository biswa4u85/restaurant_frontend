import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { apiGetCall } from "../services/frappe-apis";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import config from "../common/config";

export function Home() {
    const { table, deliveryType, users, group, setGroup, } = useContext(AuthModeContext);
    let navigate = useNavigate();
    console.log(users)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let groups = await apiGetCall(`de_restaurant_backend.api.v_0_1.menu.get_item_group`, {})
        if (groups.status != 'error') {
            console.log(groups?.groups)
            setGroup(groups?.groups)
        }
    };

    return (
        <div className="pb-3">
            <section className="border-bottom bg-white p-3">
                <div className="row justify-content-between">
                    <div className="col float-start home-logo">
                        <h5>Dilli32</h5>
                    </div>
                    <div className="col float-end text-end profile-img">
                        <NavLink to="/profile" className="profile-icon"><img src="http://restaurant.develop.helloapps.io/files/profile-icon.png" alt="" /></NavLink>
                    </div>
                </div>
            </section>
            <div className="container menu-items mt-3">
                <div className="row">
                    <div className="col-4 ">
                        <NavLink to="/table" className="text-dark">
                            <div className="row">
                                <div className="col-6 me-0 pe-0">
                                    <span>TABLE NO</span>
                                </div>
                                <div className="col-6 recycle-icon ">
                                    <img src="http://restaurant.develop.helloapps.io/files/refresh.png" className="mt-2" alt="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 table-no">
                                    <p>{table}</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <NavLink to="/dinein" className="col-4">
                        <select className="form-select form-control dine-in">
                            <option>⧩ {deliveryType}</option>
                        </select>
                    </NavLink>
                    <div className="col-4">
                        <div className="form-group has-search">
                            <img src="http://restaurant.develop.helloapps.io/files/search-icon.png" className="form-control-feedback" alt="" />
                            <input type="text" className="form-control search-input" placeholder="Search" />
                        </div>
                    </div>
                </div>
            </div>

            <section className="featured py-3 pl-3 bg-white body_rounded ">
                <div className="featured_slider">
                    <NavLink to="/home">
                        <div className="featured_item">
                            <img src="http://restaurant.develop.helloapps.io/files/EAT, LOVE, REPEAT.png" className="logo-over" alt="logo" />
                            <img src="http://restaurant.develop.helloapps.io/files/Rectangle 5.png" className="img-fluid box_rounded w-100" />
                        </div>
                    </NavLink>
                    <NavLink to="/home">
                        <div className="featured_item ">
                            <img src="http://restaurant.develop.helloapps.io/files/EAT, LOVE, REPEAT.png" className="logo-over" alt="logo" />
                            <img src="http://restaurant.develop.helloapps.io/files/Rectangle food7.png" className="img-fluid box_rounded w-100" />
                        </div>
                    </NavLink>
                    <NavLink to="/home">
                        <div className="featured_item ">
                            <img src="http://restaurant.develop.helloapps.io/files/EAT, LOVE, REPEAT.png" className="logo-over" alt="logo" />
                            <img src="http://restaurant.develop.helloapps.io/files/Rectangle food7.png" className="img-fluid box_rounded w-100" />
                        </div>
                    </NavLink>
                </div>
            </section>
            <div className="px-3">

                <div className="title mb-3 d-flex align-items-center">
                    <h6 className="mb-0 fw-bold">What would you like to order?</h6>
                </div>
                <section className=" body_rounded position-relative row food-section">
                    {group.map((item, key) => <NavLink key={key} to={`/details/${item.name}`} className="col-6 pr-2">
                        <div className="bg-white box_rounded overflow-hidden mb-3 shadow-sm food-items">
                            <img src={item.image ? config.imageURL + item.image : "http://restaurant.develop.helloapps.io/files/Rectangle 188 (2).png"} className="img-fluid" />
                            <p className="text-white fw-bold ">{item.name}</p>
                        </div>
                    </NavLink>)}
                </section>
            </div>
        </div>
    );
}