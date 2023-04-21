import React, { useState, useRef, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiPostCall } from "../services/frappe-apis";

export function Cart() {
    let navigate = useNavigate();
    const { users, table, cart, setCart } = useContext(AuthModeContext);
    const [isnote, setIsnote] = useState(false)
    const [note, setNote] = useState('')
    let time = useRef();

    const updateCart = async (item, type) => {
        let tempCart = JSON.parse(JSON.stringify(cart))
        let total = tempCart?.total ? tempCart?.total : 0
        let price = tempCart?.price ? tempCart?.price : 0
        let items = tempCart?.items ? tempCart?.items : {}
        if (type == 'add') {
            if (item.item_name in items) {
                items[item.item_name] = { item_name: item.item_name, item_code: item.item_code, count: Number((items[item.item_name]).count) + 1, rate: item.rate }
            } else {
                items[item.item_name] = { item_name: item.item_name, item_code: item.item_code, count: 1, rate: item.rate }
            }
            total = total + 1
            price = price + Number(item.rate)
        } else {
            if (Number((items[item.item_name]).count) == 1) {
                delete items[item.item_name]
            } else {
                items[item.item_name] = { item_name: item.item_name, item_code: item.item_code, count: Number((items[item.item_name]).count) - 1, rate: item.rate }
            }
            if (total > 0) {
                total = total - 1
            } else {
                total = 0
            }
            if (price > 0) {
                price = price - Number(item.rate)
            } else {
                price = 0
            }

        }
        tempCart['items'] = items
        tempCart['total'] = total
        tempCart['price'] = price
        setCart(tempCart)
    };

    const addingNotes = (value) => {
        clearTimeout(time.current)
        time.current = setTimeout(() => {
            setNote(value)
            // setIsnote(false)
        }, 500)
    }

    const placeOrder = async () => {
        if (cart.items) {
            let params = {
                "order": {
                    "customer_id": users?.customer_id,
                    "table_no": table,
                    order_items: []
                }
            }
            for (let key in cart.items) {
                params.order.order_items.push({
                    "item_code": cart.items[key].item_code,
                    "qty": cart.items[key].count,
                    "rate": cart.items[key].rate,
                    "instructions": note
                })
            }
            let orders = await apiPostCall(`de_restaurant_backend.api.v_0_1.order.place_order`, { ...params, token: `Basic ${users.auth_key}` })
            if (orders.status_code == 200) {
                let confirmOrder = await apiPostCall(`de_restaurant_backend.api.v_0_1.cart.confirm_order`, { order_id: orders.order_id, token: `Basic ${users.auth_key}` })
                if (confirmOrder.status_code == 200) {
                    setCart({})
                    navigate('/order-summary')
                }
            }
        }
    }

    return (
        <>
            <div className="pt-3 gurdeep-osahan-inner-header border-bottom w-100">
                <div className="row">
                    <div className="col-10">
                        <NavLink to="/details" className="text-dark fw-bold"><i className="btn_detail fa fa-chevron-left"></i>Review Order</NavLink>
                    </div>

                    <div className="col-2">
                        <NavLink to="/order-summary" className="profile-icon"><i class="fa fa-cart-plus" aria-hidden="true"></i></NavLink>
                    </div>
                </div>
            </div>

            <div>
                <div className="order-details  shadow-sm box_rounded  p-3 m-3 pb-0">
                    <div className="row order-summary border-bottom">
                        <div className="col-6">
                            <h6 className="fw-bold">TABLE NO. #{table}</h6>
                        </div>
                        <div className="col-6 text-right">
                            <p className="p-0 m-0">GUEST</p>
                            <p className="fw-bolder text-dark">{users?.full_name}</p>
                        </div>
                    </div>
                    <div className="row align-items-center unbilled">
                        <div className="col me-0 pe-0 ">
                            <h4 className="fw-bolder">₹{cart?.price}</h4>
                        </div>
                        <div className="col mt-3 ms-0 ps-0 ">
                            <p className=" float-start">GRAND TOTAL <br />{cart?.total} {cart.total < 2 ? 'item' : 'items'}  served </p>
                        </div>
                        <div className="col ">
                            <NavLink to="/home">
                                <h6 className="float-end fw-bolder mt-3 "> {'Pending'}
                                    <img src="https://restaurant.scrollmonkey.com/files/Vector (3).png" alt="" />
                                </h6>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {cart?.items && (Object.keys(cart.items)).map((menu, k) => <section key={k} className=" border-bottom">
                    <div className="rounds m-3 mt-4">
                        <h6 className="round-no">Item #{Number(k) + 1}</h6>
                        <div className="row mt-3">
                            <div className="col-8">
                                <img src="https://restaurant.scrollmonkey.com/files/veg.png" alt="" />
                                <h6 className="fw-bolder d-inline food-name"> {menu}</h6>
                            </div>
                            <div className="col-4">
                                <div className=" input-group inline-group shadow-sm float-end ">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary btn-minus" onClick={() => updateCart(cart.items[menu], 'minus')}>
                                            <img src="https://restaurant.scrollmonkey.com/files/minus-dark.png" className="text-white" alt="" />
                                        </button>
                                    </div>
                                    <input className="form-control quantity" value={Number(cart.items[menu].count)} />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary btn-plus" onClick={() => updateCart(cart.items[menu], 'add')}>
                                            <img src="https://restaurant.scrollmonkey.com/files/plus-dark.png" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-8">
                                <h6 className="fw-bolder ms-3">₹{cart.items[menu].rate}</h6>
                            </div>
                            <div className="col-4">
                                <h6 className="fw-bolder float-end">₹{Number(cart.items[menu].rate) * Number(cart.items[menu].count)}</h6>
                            </div>
                        </div>
                    </div>
                </section>)}
            </div>



            <section className="border-bottom add-more p-3">
                <NavLink to="/home">
                    <img src="https://restaurant.scrollmonkey.com/files/plus-dark.png" alt="" />
                    <p className="d-inline ms-2 text-dark">Add more item(s)</p>
                    <img src="https://restaurant.scrollmonkey.com/files/Vector (4).png" alt="" className="float-end me-2" />
                </NavLink>
            </section>
            <section className="border-bottom cooking-requests p-3">
                {isnote ? <>
                    <textarea placeholder="add note" onChange={(obj) => addingNotes(obj.target.value)} style={{ width: "100%" }} />
                </>
                    :
                    <span onClick={() => setIsnote(true)}>
                        <img src="https://restaurant.scrollmonkey.com/files/Vector (12).png" alt="" />
                        <p className="d-inline ms-2 text-dark">Add cooking requests</p>
                    </span>}
            </section>
            <div className="place-order  p-3 m-3 mb-5 shadow-sm ">
                {/* <div className="row mt-4">
                    <div className="col">
                        <h6 className="fw-bolder">SUB TOTAL</h6>
                    </div>
                    <div className="col">
                        <h6 className="fw-bolder float-end">₹{cart?.price}</h6>
                    </div>
                </div> */}
                {/* <div className="row border-bottom pb-3 mt-2">
                    <div className="col">
                        <h6 className="fw-bolder">TAXES</h6>
                    </div>
                    <div className="col">
                        <h6 className="fw-bolder float-end">₹{"0"}</h6>
                    </div>
                </div> */}
                <div className="row pb-3 mt-3">
                    <div className="col-8">
                        <h4 className="fw-bolder">TOTAL</h4>
                    </div>
                    <div className="col-4">
                        <h4 className="fw-bolder float-end">₹{cart?.price}</h4>
                    </div>
                </div>
                <div className="mt-2">
                    <button onClick={() => placeOrder()} className="btn save-btn place-order-btn btn-block box_rounded w-100 py-3">Place Order</button>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <p className="fw-bolder">TOTAL COUNT</p>
                    </div>
                    <div className="col-4">
                        <p className="fw-bolder float-end">{cart?.total}</p>
                    </div>
                </div>
            </div>

            <footer id="orderSummary" className="d-none text-dark success-box text-center body_rounded fixed-bottom p-3">
                <h6 className="fw-bold d-inline">Success</h6>
                <img src="https://restaurant.scrollmonkey.com/files/Vector (5).png" className="float-end me-2 success-close-btn" alt="" />

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