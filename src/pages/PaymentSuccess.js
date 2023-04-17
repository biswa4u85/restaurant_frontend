import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import config from "../common/config";
import { apiGetCall } from "../services/frappe-apis";

const images = {
    "Google": 'https://restaurant.scrollmonkey.com/files/Google logo.png',
    "Facebook": 'https://restaurant.scrollmonkey.com/files/Facebook logo.png',
    "Instagram": 'https://restaurant.scrollmonkey.com/files/Instagram logo.png',
}

export function PaymentSuccess() {
    const { restaurant } = useContext(AuthModeContext);
    let navigate = useNavigate();
    const [data, setData] = useState({})


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        let data = await apiGetCall(`de_restaurant_backend.api.v_0_1.restaurant.thank_you_page`, {})
        if (data.status_code == '200') {
            setData(data)
        }
    };

    return (
        <div className="pb-3">
            <div className="border-bottom text-center pt-3 pb-2">
                <div className="row">
                    <div className="col-2">
                        <NavLink to="/home" className="text-dark fw-bold"><i className="btn_detail fa fa-chevron-left"></i></NavLink>
                    </div>
                    <div className="col-8">
                        <h4 className="fw-bold">Payment Successful</h4>
                    </div>
                    <div className="col-2">
                        <NavLink to="/home" className="text-dark fw-bold"><i className="btn_detail fa fa-close"></i></NavLink>
                    </div>
                </div>
            </div>
            <div className="container dine-in my-5">
                <div className="main-logo text-center">
                    <img src={config.imageURL + restaurant?.restaurant_logo} style={{ width: "75%" }} alt="" />
                </div>
                <div className="heading-text text-center mt-4">
                    <h3 className="fw-bolder">{data.ending_message}</h3>
                    <p>We hope you come back soon! We’d love to hear feedback on your experience. </p>
                </div>
                <section>
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            {data?.thank_you_banners && ((data.thank_you_banners).map((item, key) => <div class={"carousel-item " + (key == 0 ? 'active' : '')}>
                                <NavLink key={key} to="/">
                                    <img src={config.imageURL + item.image} width="100%" height="350" className="logo-over" alt="logo" />
                                </NavLink>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row mt-5 check-buttons">
                        {data?.review_links ? data.review_links.map((item, key) => <a key={key} target="_blank" href={item.review_link} className="btn form-control text-center py-3">
                            <img src={images[item.platform]} alt="" className="mr-2" /> Review us on {item.platform}
                        </a>) : null}
                    </div>
                </div>

            </div>


        </div>
    );
}