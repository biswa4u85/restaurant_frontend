import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthModeContext } from "../contexts";
import { apiGetCall } from "../services/frappe-apis";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import config from "../common/config";

export function Home() {
    const { table, deliveryType, users, group, setGroup, restaurant } = useContext(AuthModeContext);
    let navigate = useNavigate();
    let time = useRef();

    useEffect(() => {
        getData()
        if (!table) {
            // navigate('/table')
        }
    }, [])

    const searchItems = async (value) => {
        clearTimeout(time.current)
        time.current = setTimeout(() => {
            navigate(`/details?search=${value}`)
        }, 500)
    };

    const getData = async () => {
        let groups = await apiGetCall(`de_restaurant_backend.api.v_0_1.menu.get_item_group`, { token: `Basic ${users.auth_key}` })
        if (groups.status != 'error') {
            setGroup(groups?.groups)
        }
    };

    return (
        <div className="pb-3 container-lg px-0">
            <section className="border-bottom bg-white p-3">
                <div className="row justify-content-between">
                    <div className="col float-start home-logo">
                        <h5>{restaurant?.restaurant_name}</h5>
                    </div>
                    <div className="col float-end text-end profile-img text-right">
                        <NavLink to="/order-summary" className="profile-icon"><i class="fa fa-cart-plus" aria-hidden="true"></i></NavLink>
                        <NavLink to="/profile" className="profile-icon"><img src="https://restaurant.scrollmonkey.com/files/profile-icon.png" alt="" /></NavLink>
                    </div>
                </div>
            </section>
            <div className="container menu-items mt-3">
                <div className="row">
                    <div className="col-4">
                        <NavLink to="/table" className="text-dark">
                            <div className="row">
                                <div className="col-9 me-0 pe-0 mt-1" style={{ fontSize: '10px' }}>
                                    TABLE NO <b>{table}</b>
                                </div>
                                {/* <div className="col-3">
                                    <img src="https://restaurant.scrollmonkey.com/files/refresh.png" alt="" />
                                </div> */}
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
                            <img src="https://restaurant.scrollmonkey.com/files/search-icon.png" className="form-control-feedback" alt="" />
                            <input type="text" className="form-control search-input" onChange={(obj) => searchItems(obj.target.value)} placeholder="Search" />
                        </div>
                    </div>
                </div>
            </div>

            <section className="featured">
                <section>
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner rounded">
                            {restaurant?.menu_banners && ((restaurant.menu_banners).map((item, key) => <div class={"carousel-item " + (key == 0 ? 'active' : '')}>
                                <NavLink key={key} to="/">
                                    <img src={config.imageURL + item.image} width="100%" height="200px" className="logo-over" alt="logo" />
                                </NavLink>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
            </section>
            <div className="px-3">
                <div className="title mb-3 d-flex align-items-center pt-1 home-title">
                    <h6 className="mb-0" style={{
                        position: 'relative',
                        left: '50%',
                        translate: 'transform',
                        transform: 'translateX(-50%)',
                    }}>What would you like to order?</h6>
                </div>
                <div className="w-100">
                    <section className="body_rounded position-relative  food-section food-cards">
                        {group.map((item, key) =>
                            item.name !== "All Item Groups" && <NavLink key={key} to={`/details?type=${item.name}`} className="pr-2 food-card">
                                <div class="card" style={{ marginBottom: 10 }}>
                                    <img src={item.image ? config.imageURL + item.image : "https://restaurant.scrollmonkey.com/files/Rectangle 188 (2).png"} className="card-img-top" style={{ height: 150 }} />
                                    <div class="card-body p-2">
                                        <div class="card-title food-title" style={{ left: 0 }}>{item.name}</div>
                                    </div>
                                </div>
                            </NavLink>)}
                    </section>
                </div>
            </div>
        </div>
    );
}