import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import config from "../common/config";
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { apiGetCall } from "../services/frappe-apis";
import nonVegImg from '../assets/images/nonveg.png'
import { itemTypes } from "../common/consts";
import { TopBar } from "./CategoryPage/TopBar";
import { Footer } from "./CategoryPage/Footer";

export function Details() {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const { restaurant, cart, setCart, itemType: itemCategory, setItemType } = useContext(AuthModeContext);
    const [items, setitems] = useState([]);
    const [itemType, setIemType] = useState('');
    const [noItems, setNoItems] = useState(false);

    useEffect(() => {
        getData();
        // getItemTypes();
    }, [itemType]);

    const getData = async () => {
        let menus = await apiGetCall(`de_restaurant_backend.api.v_0_1.menu.search?start=0&query=${search ? search : ''}&item_group=${type ? type : ''}&item_type=${itemType ? itemType : ''}`, {})
        if (menus.status != 'error') {
            const zeroItems = menus.menu === 'No items found';
            if (zeroItems) {
                setNoItems(true);
            } else { setNoItems(false); }
            setitems(zeroItems ? [] : menus.menu);
        }
    };

    const getItemTypes = async () => {
        let itemTypeResponse = await apiGetCall(`de_restaurant_backend.api.v_0_1.menu.get_item_type`, {})
        if (itemTypeResponse?.data.status_code === 200) {
            setIemType(itemTypeResponse.data.item_type);
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
                <div style={{
                    float: 'right', display: 'flex', marginTop: '7px', position: 'relative', left: '-20px'
                }}>
                    <div style={{ padding: '0 10px' }}>
                        <img style={{ verticalAlign: 'baseline', marginRight: 5, }} src={(itemCategory && itemCategory[itemTypes.veg]) || "https://restaurant.scrollmonkey.com/files/veg.png"} className="float-start" alt="" />
                        <input
                            type="radio"
                            name="site_name"
                            value={'VEG'}
                            checked={itemType === 'VEG'}
                            onChange={() => setIemType('VEG')}
                        />
                    </div>
                    <div style={{ padding: '0 10px' }}>
                        <img style={{ verticalAlign: 'baseline', marginRight: 5, width: '12px', height: '14px' }} src={(itemCategory && itemCategory[itemTypes.nonveg]) || "https://restaurant.scrollmonkey.com/files/Non Veg.png"} className="float-start" alt="" />
                        <input
                            type="radio"
                            name="site_name"
                            value={'Non-veg'}
                            checked={itemType === 'Non-veg'}
                            onChange={() => setIemType('Non-veg')}
                        />
                    </div>
                </div>
                <div className="left mr-auto">
                    <NavLink to="/home" className="item-group-fonts-1"><i className="btn_detail fa fa-chevron-left"></i>{type}</NavLink>
                </div>
            </div>
            {/* <TopBar type={type} itemType={itemType} setItemType={setIemType} /> */}
            <div className="mb-5">
                <section className=" position-relative py-3 pl-3">
                    <div className=" tab-content pr-3" id="pills-tabContent">
                        <div className="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            {items.length > 0 && items.map((item, key) => <div key={key} className="d-flex border-bottom mx-1 mt-2 mb-4 align-items-start" style={{ position: 'relative' }}>
                                <div className="h-100 flex-grow-1">
                                    <div className="d-flex w-100 flex-row align-items-start h-25">
                                        {item.item_type === itemTypes.veg ? <img src={(itemCategory && itemCategory[itemTypes.veg]) || "https://restaurant.scrollmonkey.com/files/veg.png"} className="float-start mt-1" alt="" /> : <img style={{ verticalAlign: 'baseline', width: 13, height: 14 }} src={(itemCategory && itemCategory[itemTypes.nonveg]) || "https://restaurant.scrollmonkey.com/files/Non Veg.png"} className="float-start mt-1" alt="" />}
                                        {<p className="mb-1  ml-2 item-group-fonts-1 display-inline">{item.item_name}</p>}
                                    </div>
                                    {item.tags?.map(tag => <p className="mb-1 item-group-fonts-2 display-inline mt-1">{tag}</p>)}
                                    <h6 className="mt-3  fw-bold h-25">₹ {item.rate}</h6>
                                </div>
                                <div className="food-cart h-100 w-25">
                                    <div class="w-100">
                                        <img src={item.image ? config.imageURL + item.image : "https://restaurant.scrollmonkey.com/files/Rectangle 188 (1).png"} className="w-100 box_rounded" style={{ height: '100px' }} />
                                        {(cart['items'] && cart['items'][item.item_name]) ?
                                            <div
                                                className="showme_1 input-group inline-group w-75 element-center"
                                            >
                                                <div className="input-group-prepend">
                                                    <button className="btn btn-outline-secondary btn-minus" onClick={() => updateCart(item, 'minus')}>
                                                        -
                                                    </button>
                                                </div>
                                                <input className="form-control quantity" readOnly min="0" name="quantity" value={cart['items'][item.item_name].count} type="number" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary btn-plus" onClick={() => updateCart(item, 'add')}>
                                                        +
                                                    </button>
                                                </div>
                                            </div> : <div
                                                className="w-100 d-flex justify-content-center element-center"
                                            ><button className="btn add-btn details-add-btn" style={{ width: '60%' }} data-id="1" onClick={() => updateCart(item, 'add')}>Add</button></div>}
                                        <br />
                                    </div>
                                </div>
                            </div>)}
                            {/* <div style={{ minHeight: '800px' }}> */}
                            {noItems && items.length === 0 && <h6 className="mb-0 my-4 ml-4" style={{
                                position: 'absolute',
                                // left: '50%',
                                // translate: 'transform',
                                // transform: 'translateX(-50%)',
                            }}>No Items to display!</h6>}
                            {/* </div> */}
                        </div>
                    </div>
                </section>
            </div>
            {/* <Footer
                cart={cart}
            /> */}
            {cart?.total > 0 && (<footer className="view-cart body_rounded fixed-bottom" style={{ padding: '0 10px' }}>
                <div className="row mb-3 ms-2 d-flex align-items-center">
                    <div className="col float-start ">
                        <p className="mt-3 mb-1">{cart.total} {cart.total < 2 ? 'ITEM' : 'ITEMS'}</p>
                        <h4 className="mt-0  float-left d-inline">₹{cart.price}</h4>
                        <span className="ms-2" style={{ display: 'inline-block', padding: '5px 0 0 5px' }}>plus taxes</span>
                    </div>
                    <div className="col float-end">
                        <NavLink to="/cart" className="view-cart text-center">
                            <p className="mt-3 mb-1" style={{ visibility: 'hidden' }}></p>
                            <h6 className="mt-4">View Cart</h6>
                        </NavLink>
                    </div>
                </div>
            </footer>)}
        </div>
    );
}
