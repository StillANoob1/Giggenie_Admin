import React, { useContext } from "react";
import "./topbar.css";
import nodp from "../../assests/nodp.png"
import { Context } from "../../App";
import axios from "axios";
import { serverUrl } from "../../utils/serverUrl";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  const {setUser}=useContext(Context);
  const handleLogout = async () => {
    try {
        await axios.post(`${serverUrl}/api/auth/logout`, {
            withCredentials: true
        })
        setUser("")
        localStorage.setItem("token", null);
        localStorage.setItem("currentUser", null)
        navigate("/login");
      } catch (error) {
        console.log(error);
    }
}
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">GigGenie Admin Panel</span>
        </div>
        <div className="topRight">
        <img src={storedUser?.img || nodp} alt="" className="topAvatar" />
          
         <span className="logout" onClick={handleLogout}>Logout</span>
          
        </div>
      </div>
    </div>
  );
}
