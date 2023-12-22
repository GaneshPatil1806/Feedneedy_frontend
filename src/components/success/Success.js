import React from "react";
import './Success.css'
import { useNavigate} from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();

    function redirect(){
        navigate("/donate");
    }
    return (
        <div className="successful">
            <div className="heading_succ">
            <h1 className="head">Donation Successful</h1>
            </div>
            <div className="success_image">
            <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="ok" />
            </div>
            {setTimeout(redirect,3500)}
        </div>
    )

}
