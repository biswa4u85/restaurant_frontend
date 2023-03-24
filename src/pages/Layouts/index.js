import React, { useEffect, useContext } from "react";
import { AuthModeContext } from "../../contexts";
import { useNavigate, Outlet } from "react-router-dom";

function Layouts() {
    let navigate = useNavigate();
    const { users } = useContext(AuthModeContext);

    useEffect(() => {
        if(!users?.auth_key){
            navigate('auth')
        }
    }, [users])

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Layouts;