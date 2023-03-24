import React, { useState, useEffect, useContext } from "react";
import { AuthModeContext } from "../contexts";
import { NavLink } from "react-router-dom";
import config from "../common/config";
import QrReader from 'react-qr-scanner'


export function Table() {
    const { restaurant, table, setTable } = useContext(AuthModeContext);
    let tables = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14"]

    const previewStyle = {
        height: 500,
        width: 500,
    }

    const handleScan = (data) => {
        // console.error(JSON.stringify(data))
    }

    const handleError = (err) => {
        console.error(err)
    }

    return (
        <>
            <QrReader
                delay={100}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <div className="container-fluid tables my-5">
                <div className="main-logo text-center">
                    <img src={config.imageURL + restaurant?.restaurant_logo} height="50" alt="" />
                </div>
                <div className="heading-text text-center mt-4">
                    <h3>Table No</h3>
                    <p>Choose your table no. written on side of your table</p>
                </div>
                <div className="row table-no mt-3">
                    {tables.map((item, key) =>
                        <div key={key} className="col-3" style={{ marginBottom: 15 }}>
                            <button onClick={() => setTable(item)} className={item == table ? "btn btn-dark" : "btn btn-light"}>{item}</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-2 my-3">
                <NavLink to="/home" className="btn save-btn btn-block box_rounded w-100 py-3">Save</NavLink>
            </div>
        </>
    );
}