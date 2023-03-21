import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import config from "../common/config";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { apiGetCall } from "../services/frappe-apis";

export function Details() {
    let navigate = useNavigate();
    const { cart, setCart } = useContext(AuthModeContext);
    const [items, setitems] = useState([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let menus = await apiGetCall(`de_restaurant_backend.api.v_0_1.menu.get_items?start=0`, {})
        if (menus.status != 'error') {
            setitems(menus.menu)
        }
    };

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

    return (
        <div className="bg-white">
            <div className="pt-3 gurdeep-osahan-inner-header border-bottom w-100">
                <div className="left mr-auto">
                    <NavLink to="/home" className="text-dark fw-bold"><i className="btn_detail fa fa-chevron-left"></i>Dilli Ki Jaan</NavLink>
                </div>
            </div>
            <div className="mb-5">
                <section className=" position-relative py-3 pl-3">
                    <div className=" tab-content pr-3" id="pills-tabContent">
                        <div className="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            {items.map((item, key) => <div key={key} className="row border-bottom mx-1 my-2 align-items-center">
                                <div className="col-8 ">
                                    <img src="http://restaurant.develop.helloapps.io/files/veg.png" className="float-start mt-1" alt="" />
                                    <p className="mb-1 fw-bold text-dark display-inline ms-3">Bestseller</p>
                                    <h5 className="my-2  fw-bold">{item.item_name}</h5><br />
                                    <h6 className="my-3  fw-bold">{item.currency} {item.rate}</h6>
                                </div>
                                <div className="col-4 food-cart">
                                    <img src={item.image ? config.imageURL + item.image : "http://restaurant.develop.helloapps.io/files/Rectangle 188 (1).png"} className="img-fluid box_rounded " />
                                    {(cart['items'] && cart['items'][item.item_name]) ?
                                        <div className="showme_1 input-group inline-group">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-outline-secondary btn-minus" onClick={() => updateCart(item, 'minus')}>
                                                    <img src="http://restaurant.develop.helloapps.io/files/Vector (1).png" className="text-white" alt="" />
                                                </button>
                                            </div>
                                            <input className="form-control quantity" readOnly min="0" name="quantity" value={cart['items'][item.item_name].count} type="number" />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary btn-plus" onClick={() => updateCart(item, 'add')}>
                                                    <img src="http://restaurant.develop.helloapps.io/files/Vector.png" alt="" />
                                                </button>
                                            </div>
                                        </div> : <button className="btn add-btn " data-id="1" onClick={() => updateCart(item, 'add')}>Add</button>}
                                </div>
                            </div>)}

                        </div>
                    </div>
                </section>
            </div>
            {cart?.total > 0 && (<footer className="text-white view-cart body_rounded fixed-bottom" style={{ padding: '0 10px' }}>
                <div className="row mb-3 ms-2 align-items-center">
                    <div className="col float-start ">
                        <p className=" mt-3  mb-1">{cart.total} ITEM</p>
                        <h4 className=" mt-0  float-left d-inline">₹{cart.price}</h4>
                        <span className="ms-2 " style={{ display: 'inline-block', padding: '5px 0 0 5px' }}>plus taxes</span>
                    </div>
                    <div className="col float-end ">
                        <NavLink to="/cart" className="text-white text-center ">
                            <h6 className="mt-4">View Cart</h6>
                        </NavLink>
                    </div>
                </div>
            </footer>)}
        </div>
    );
}