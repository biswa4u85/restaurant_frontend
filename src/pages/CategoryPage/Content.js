import React from 'react';
import { itemTypes } from '../../common/consts';
import { useState } from 'react';
import { AuthModeContext } from '../../contexts';

//external styles
// .item-group-fonts-1 {
//     font-size: 18px;
//     line-height: 20px;
//     font-weight: 600;
//     color: #000000;
// }

// .item-group-fonts-2 {
//     font-size: 9px;
//     line-height: 20px;
//     font-weight: 600;
//     color: #000000;
// }

// .food-cart {
//     position: relative;
// }

// .food-cart .add-btn {
//     position: absolute;
//     bottom: -15px;
//     width: 80px;
//     font-size: 10px;
//     left: 22px;
//     background: var(--orange);
//     color: var(--white);
//     font-weight: 700;
//     height: 25px;
//     padding: 4px;
// }

// .food-cart .add-btn.add-btn.details-add-btn {
//     left: unset;
// }

// .food-cart .input-group {
//     background: var(--dark);
//     height: 25px;
//     width: 80px;
//     left: 10px;
//     bottom: 10px;
//     align-items: center;
//     border-radius: 4px;

// }

// .food-cart .input-group button {
//     height: 25px;
//     border: none;
//     outline: none;
//     color: var(--white);
//     padding: revert;

// }

// .food-cart .input-group input {
//     height: 25px;
//     background: var(--dark);
//     color: var(--white);
//     border: none;
//     outline: none;
//     text-align: center;
//     font-size: 12px;
// }

// .food-cart .input-group .btn-plus:focus,
// .food-cart .input-group .btn-minus:focus {
//     outline: none;
//     box-shadow: none;
//     background: var(--dark);
// }


// @media only screen and (max-width: 320px) and (min-width:280px) {
//     .food-cart .input-group {
//         left: 0;

//     }

//     .food-cart .add-btn {
//         left: 17px;
//         width: 70px;
//     }
// }

export function Main({
    items
}) {
    const { itemType: itemCategory } = useState(AuthModeContext);
    return (
        <>
            <div className="mb-5">
                <section className=" position-relative py-3 pl-3">
                    <div className=" tab-content pr-3" id="pills-tabContent">
                        <div className="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            {items.length > 0 && items.map((item, key) => <div key={key} className="d-flex border-bottom mx-1 mt-2 mb-4 align-items-start" style={{ position: 'relative' }}>
                                <div className="h-100 flex-grow-1">
                                    <div className="d-flex w-100 flex-row align-items-start h-25">
                                        {/* TO DO: w-75 */}
                                        {item.item_type === itemTypes.veg ? <img src={(itemCategory && itemCategory[itemTypes.veg]) || "https://restaurant.scrollmonkey.com/files/veg.png"} className="float-start mt-1" alt="" /> : <img style={{ verticalAlign: 'baseline', width: 13, height: 14 }} src={(itemCategory && itemCategory[itemTypes.nonveg]) || "https://restaurant.scrollmonkey.com/files/Non Veg.png"} className="float-start mt-1" alt="" />}
                                        {/* {key === 0 && <p className="mb-1  ml-1 fw-bold text-dark display-inline ms-3 mt-1" style={{ fontSize: '9px' }}>Bestseller</p>}
                                        {key === 1 && <p className="mb-1  ml-1 fw-bold text-dark display-inline ms-3 mt-1" style={{ fontSize: '9px' }}>Chefs Favorite</p>} */}
                                        {<p className="mb-1  ml-2 item-group-fonts-1 display-inline ms-3">{item.item_name}</p>}
                                    </div>
                                    {item.tags?.map(tag => <p className="mb-1  item-group-fonts-2 display-inline ms-3 mt-1">{tag}</p>)}
                                    {/* {key === 1 && <p className="mb-1  item-group-fonts-2 display-inline ms-3 mt-1">Chefs Favorite</p>}
                                    {key > 1 && <h5 className="my-2  fw-bold h-50" style={{ fontSize: '16px', lineHeight: '20px', visibility: 'hidden' }}>{item.item_name}</h5>} */}
                                    {/* <h6 className="mt-3  fw-bold h-25">{item.currency} {item.rate}</h6> TO DO: revert later once be changes for currency are done */}
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
        </>
    );
}