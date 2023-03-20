import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiGetCall } from "../services/frappe-apis";

export function Cart() {
    let navigate = useNavigate();
    const { users, setUsers, cart, setCart } = useContext(AuthModeContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        // console.log(users.customer_id)
        let orders = await apiGetCall(`de_restaurant_backend.api.v_0_1.order.get_current_order?customer_id=${'Customer One'}`, { token: `Basic ${users.auth_key}` })
        if (orders.status_code == 200) {
            setOrders(orders.current_order)
        }
    };

    const placeOrder = () => {
        let element = document.getElementById('orderSummary')
        element.classList.remove('d-none')
    }

    console.log(cart)

    return (
        <>
            <div className="pt-3 gurdeep-osahan-inner-header border-bottom w-100">
                <div className="left mr-auto">
                    <NavLink to="/home" className="text-dark fw-bold"><i className="btn_detail  mdi mdi-chevron-left "></i>Review Order</NavLink>
                </div>
            </div>

            {orders.map((item, key) => <div key={key}>
                <div className="order-details  shadow-sm box_rounded  p-3 m-3 pb-0">
                    <div className="row order-summary border-bottom">
                        <div className="col-6">
                            <h6 className="fw-bold">Order #{item.order_id}</h6>
                        </div>
                        <div className="col-6 ">
                            <div className="row float-end">
                                <div className="col-7">
                                    <p className="p-0 m-0">TABLE NO.</p>
                                    <p className="fw-bolder text-dark">{item.table_no}</p>
                                </div>
                                <div className="col-5">
                                    <p className="p-0 m-0">GUESTS</p>
                                    <p className="fw-bolder text-dark">{users.full_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center unbilled">
                        <div className="col me-0 pe-0 ">
                            <h4 className="fw-bolder">₹{item.payment[0].grand_total}</h4>
                        </div>
                        <div className="col mt-3 ms-0 ps-0 ">
                            <p className=" float-start">GRAND TOTAL <br />1 item(s)  served </p>
                        </div>
                        <div className="col ">
                            <NavLink to="/home">
                                <h6 className="float-end fw-bolder mt-3 "> {item.status}
                                    <img src="http://restaurant.develop.helloapps.io/files/Vector (3).png" alt="" />
                                </h6>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {(item.menu).map((menu, k) => <section key={k} className=" border-bottom">
                    <div className="rounds m-3 mt-4">
                        <h6 className="round-no">Round #2</h6>
                        <div className="row mt-3">
                            <div className="col">
                                <img src="http://restaurant.develop.helloapps.io/files/veg.png" alt="" />
                                <h6 className="fw-bolder d-inline food-name">{menu.item_name}</h6>
                            </div>
                            <div className="col">
                                <div className=" input-group inline-group shadow-sm float-end ">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary btn-minus">
                                            <img src="http://restaurant.develop.helloapps.io/files/minus-dark.png" className="text-white" alt="" />
                                        </button>
                                    </div>
                                    <input className="form-control quantity" min="0" name="quantity" value={menu.qty} type="number" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary btn-plus">
                                            <img src="http://restaurant.develop.helloapps.io/files/plus-dark.png" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <h6 className="fw-bolder ms-3">₹{menu.rate}</h6>
                            </div>
                            <div className="col">
                                <h6 className="fw-bolder float-end">₹{Number(menu.rate) * Number(menu.qty)}</h6>
                            </div>
                        </div>
                    </div>
                </section>)}
            </div>)}



            <section className="border-bottom add-more p-3">
                <NavLink to="/home">
                    <img src="http://restaurant.develop.helloapps.io/files/plus-dark.png" alt="" />
                    <p className="d-inline ms-2 text-dark">Add more item(s)</p>

                    <img src="http://restaurant.develop.helloapps.io/files/Vector (4).png" alt="" className="float-end me-2" />
                </NavLink>
            </section>
            <section className="border-bottom cooking-requests p-3">
                <NavLink to="/home">
                    <img src="http://restaurant.develop.helloapps.io/files/Vector (12).png" alt="" />
                    <p className="d-inline ms-2 text-dark">Add cooking requests</p>
                </NavLink>
            </section>
            <div className="place-order  p-3 m-3 mb-5 shadow-sm ">
                <div className="row mt-4">
                    <div className="col">
                        <h6 className="fw-bolder">SUB TOTAL</h6>
                    </div>
                    <div className="col">
                        <h6 className="fw-bolder float-end">₹{orders[0]?.payment[0]?.grand_total - orders[0]?.payment[0]?.total_tax}</h6>
                    </div>
                </div>
                <div className="row border-bottom pb-3 mt-2">
                    <div className="col">
                        <h6 className="fw-bolder">TAXES</h6>
                    </div>
                    <div className="col">
                        <h6 className="fw-bolder float-end">₹{orders[0]?.payment[0]?.total_tax}</h6>
                    </div>
                </div>
                <div className="row pb-3 mt-3">
                    <div className="col">
                        <h4 className="fw-bolder">TOTAL</h4>
                    </div>
                    <div className="col">
                        <h4 className="fw-bolder float-end">₹{orders[0]?.payment[0]?.grand_total}</h4>
                    </div>
                </div>
                <div className="mt-2">
                    <button onClick={() => placeOrder()} className="btn save-btn place-order-btn btn-block box_rounded w-100 py-3">Place Order</button>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <p className="fw-bolder">GRAND TOTAL</p>
                    </div>
                    <div className="col">
                        <p className="fw-bolder float-end">₹{orders[0]?.payment[0]?.grand_total}</p>
                    </div>
                </div>
            </div>

            <footer id="orderSummary" className="d-none text-dark success-box text-center body_rounded fixed-bottom p-3">
                <h6 className="fw-bold d-inline">Success</h6>
                <img src="http://restaurant.develop.helloapps.io/files/Vector (5).png" className="float-end me-2 success-close-btn" alt="" />

                <div className="succes-img">
                    <img src="" alt="" />
                </div>
                <div className="text-center p-4">
                    <h3 className="fw-bolder">Your order is confirmed!</h3>
                    <p>Please wait upto 20mins for your order to be served fresh. Thank you for your patience.</p>
                    <NavLink to="/order-summary" className="btn save-btn btn-block box_rounded w-100 py-3 mt-3">View Order Summary</NavLink>
                </div>
            </footer>
        </>
    );
}