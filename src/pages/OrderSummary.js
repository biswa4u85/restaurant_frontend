import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiGetCall, apiPostCall } from "../services/frappe-apis";
import { toast } from 'react-toastify';

const tipsList = ['10', '30', '50']

export function OrderSummary() {
    let navigate = useNavigate();
    const { users, setUsers } = useContext(AuthModeContext);
    const [orders, setOrders] = useState([])
    const [tips, setTips] = useState(0)
    const [coupons, setCoupon] = useState({})
    let timer = useRef(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let orders = await apiGetCall(`de_restaurant_backend.api.v_0_1.order.get_current_order?customer_id=${users?.customer_id}`, { token: `Basic ${users.auth_key}` })
        if (orders.status_code == 200) {
            setOrders(orders.current_order)
        }
    };

    const getCoupon = async (value) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(async () => {
            if (value && value.length > 0) {
                let coupons = await apiPostCall(`de_restaurant_backend.api.v_0_1.cart.apply_coupon`, { token: `Basic ${users.auth_key}`, order_id: orders[0]?.order_id, coupon_code: value })
                if (coupons.status_code == 200) {
                    toast.success(coupons.message)
                    setCoupon(coupons)
                }
            } else {
                setCoupon({});
            }
        }, 500)

    };

    const placePayment = async () => {
        if (orders && orders[0] && orders[0].order_id) {
            let payment = await apiPostCall(`de_restaurant_backend.api.v_0_1.payment.checkout`, { token: `Basic ${users.auth_key}`, order_id: orders[0]?.order_id })
            if (payment.status_code == 200) {
                toast.success(payment.message)
                navigate('/payment-success')
            } else {
                toast.error(payment.message)
            }
        }
    }

    return (
        <>
            <div className="pt-3 gurdeep-osahan-inner-header border-bottom w-100">
                <div className="left mr-auto">
                    <NavLink to="/home" className="text-dark fw-bold"><i className="btn_detail fa fa-chevron-left"></i>Order Summary</NavLink>
                </div>
            </div>
            <div className="order-details  shadow-sm box_rounded  p-3 m-3 pb-0">
                <div className="row order-summary">
                    <div className="col-6">
                        <h6 className="fw-bold">Order #{orders[0]?.order_id}</h6>
                    </div>
                    <div className="col-6 ">
                        <div className="row float-end">
                            <div className="col-7">
                                <p className="p-0 m-0">TABLE NO.</p>
                                <p className="fw-bolder text-dark">{orders[0]?.table_no}</p>
                            </div>
                            <div className="col-5">
                                <p className="p-0 m-0">GUEST</p>
                                <p className="fw-bolder text-dark">{users.full_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {orders.map((item, key) => {
                const grouped = (item.menu).reduce((acc, obj) => {
                    const key = obj.round;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(obj);
                    return acc;
                }, {});
                return <section key={key} className=" border-bottom">
                    {Object.keys(grouped).map((menu, k) => <div key={k} className="rounds m-3 mt-4">
                        <h6 className="round-no">Round #{menu}</h6>
                        {grouped[menu].map((it, y) => <div key={y}>
                            <div className="row mt-3">
                                <div className="col-8">
                                    <img src="https://restaurant.scrollmonkey.com/files/veg.png" alt="" />
                                    <h6 className="fw-bolder d-inline food-name">{it.qty} x {it.item_name}</h6>
                                </div>
                                <div className="col-4">
                                    <h6 className="fw-bolder float-end">₹{(it.rate * Number(it.qty).toFixed(2))}</h6>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <h6 className="fw-bolder ms-3">₹{Number(it.rate).toFixed(2)}</h6>
                                </div>
                            </div>
                        </div>)}
                    </div>)}
                </section>
            })}
            <section className="border-bottom add-more p-3">
                <NavLink to="/home">
                    <img src="https://restaurant.scrollmonkey.com/files/plus-dark.png" alt="" />
                    <p className="d-inline ms-2 text-dark">Order more item(s)</p>
                    <img src="https://restaurant.scrollmonkey.com/files/Vector (4).png" alt="" className="float-end me-2" />
                </NavLink>
            </section>
            <section className=" border-bottom">
                <div className="add-tip m-3 mt-4">
                    <h6 className="tip ">Add Tip (Optional)</h6>
                    <div className="row">
                        {tipsList.map((item, key) => <div key={key} className="col-3 position-relative">
                            <button className="btn border pe-4 fw-bold tip-btn" id="1" onClick={() => setTips(item)}>
                                ₹{Number(item).toFixed(2)}
                                <img src="https://restaurant.scrollmonkey.com/files/orange-x.png" className="d-none rounded-pill position-absolute close1 close-btn" alt="" />
                            </button>
                        </div>)}
                        <div className="col-3 position-relative ">
                            <button className="btn border pe-4 fw-bold tip-btn" id="4">
                                <input style={{ border: 'none', width: 45 }} type="number" placeholder="Other" onChange={(val) => setTips(val.target.value)} />
                                <img src="https://restaurant.scrollmonkey.com/files/orange-x.png" className="d-none rounded-pill position-absolute close4 close-btn" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="rounds border-bottom">
                <div className="round-no m-3 mt-4">
                    <h6 className="round-no ">Promo-code</h6>
                    <input type="search" className="form-control fw-bold" name="Promo-code" onChange={(val) => { console.log('>>', val.target.value); getCoupon(val.target.value); }} />
                </div>
            </section>
            <div className="place-order  p-3 m-3 mb-5 shadow-sm ">
                <div className="row mt-4">
                    <div className="col-8">
                        <h6 className="fw-bolder">SUB TOTAL</h6>
                    </div>
                    <div className="col-4">
                        <h6 className="fw-bolder float-end">₹{((orders[0]?.payment[0]?.grand_total ? orders[0]?.payment[0]?.grand_total : 0) - (orders[0]?.payment[0]?.total_tax ? orders[0]?.payment[0]?.total_tax : 0)).toFixed(2)}</h6>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-8">
                        <h6 className="fw-bolder">TAXES</h6>
                    </div>
                    <div className="col-4">
                        <h6 className="fw-bolder float-end">₹{coupons?.tax ? Number(coupons.tax).toFixed(2) : Number(orders[0]?.payment[0]?.total_tax).toFixed(2)}</h6>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-8">
                        <h6 className="fw-bolder">TIP</h6>
                    </div>
                    <div className="col-4">
                        <h6 className="fw-bolder float-end">₹{tips}</h6>
                    </div>
                </div>
                <div className="row border-bottom pb-3 mt-2">
                    <div className="col-8">
                        <h6 className="fw-bolder text-orange">COUPON</h6>
                    </div>
                    <div className="col-4">
                        <h6 className="fw-bolder float-end text-orange">-₹{coupons?.discount_amount ? Number(coupons.discount_amount).toFixed(2) : 0.00}</h6>
                    </div>
                </div>
                <div className="row pb-3 mt-3">
                    <div className="col-8">
                        <h4 className="fw-bolder">TOTAL</h4>
                    </div>
                    <div className="col-4">
                        <h4 className="fw-bolder float-end">₹{coupons?.discount_amount ? (coupons.grand_total + coupons.tax) - coupons.discount_amount : (orders[0]?.payment[0]?.grand_total ? orders[0]?.payment[0]?.grand_total : 0) + Number(tips)}</h4>
                    </div>
                </div>

                <div className="mt-2">
                    <div onClick={() => placePayment()} className="btn save-btn place-order-btn btn-block box_rounded w-100 py-3 fw-100">Finished Dining? <b>Pay Bill</b></div>
                </div>
            </div>
        </>
    );
}