import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import moment from 'moment';
import { apiGetCall } from "../services/frappe-apis";

export function Profile() {
    let navigate = useNavigate();
    const { users, setUsers } = useContext(AuthModeContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let orders = await apiGetCall(`de_restaurant_backend.api.v_0_1.order.get_past_orders?customer_id=${users?.customer_id}`, { token: `Basic ${users?.auth_key}` })
        if (orders.status_code == 200) {
            setOrders(orders.past_orders)
        }
    };

    const logOut = async () => {
        setUsers(null)
    };

    return (
        <>
            <div className="pt-3 gurdeep-osahan-inner-header border-bottom w-100">
                <div className="row">
                    <div className="col-9">
                        <NavLink to="/home" className="text-dark fw-bolder"><i className="btn_detail fa fa-chevron-left"></i>My Profile</NavLink>
                    </div>
                    <div className="col-3">
                        {/* <NavLink onClick={() => logOut()} to="/auth" className="profile-icon"><i class="fa fa-sign-out" aria-hidden="true"></i></NavLink> */}
                        <NavLink onClick={() => logOut()} to="/auth" className="profile-icon">Log Out</NavLink>
                    </div>
                </div>
            </div>
            <div className="order-details  shadow-sm box_rounded  p-3 m-3 pb-0">
                <div className="row align-items-center">
                    <div className="col">
                        <h6 className="fw-bolder">{users?.full_name}</h6>
                        <p>+91 {users?.mobile_no}</p>
                    </div>
                    {/* <div className="col ">
                        <NavLink to="/home" className="text-orange">
                            <h6 className="float-end fw-bold"> Edit Profile
                                <img src="https://restaurant.scrollmonkey.com/files/Vector (3).png" alt="" />
                            </h6>
                        </NavLink>
                    </div> */}
                </div>
            </div>

            <section className=" border-bottom">
                <div className=" m-3 mt-4">
                    <h6 className="text-orange">Past Orders</h6>
                </div>
            </section>
            {orders.map((item, key) => <div key={key} className="border-bottom">
                <NavLink to="/home" className="row mt-3 m-2 text-dark" href="#">
                    <div className="col-9">
                        <p>{item.order_id}-({item.table_no}), {moment(item.posting_date).format('DD MMM YYYY')}</p>
                        {(item.menu).map((menu, k) => <p key={k} className="fw-bolder food-name">{menu.item_name}-({menu.qty})  ₹{menu.rate}</p>)}
                    </div>
                    <div className="col-3">
                        <h6 className="fw-bolder float-end">₹{item.payment[0].grand_total}</h6>
                    </div>
                </NavLink>
            </div>)}
        </>
    );
}