import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";

import { serverUrl } from "../../utils/serverUrl"
import axios from "axios";
import nodp from "../../assests/nodp.png"

import Loader from "../../components/loader/Loader"


export default function WidgetSm() {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["sellers"],
    queryFn: () =>
      axios.get(`${serverUrl}/api/users/get/sellers`, {
        withCredentials: true,
      }).then((res) => {
        return res.data.users
      })
  })

 

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Sellers</span>
     {isLoading? <Loader /> : error ?"Something Went Wrong": data.map((user)=>{
      return  <ul className="widgetSmList" key={user?._id}>
        <li className="widgetSmListItem">
          <img
            src={user?.img || nodp}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user?.username}</span>
            <span className="widgetSmUserTitle">{user?.email}</span>
          </div>
        </li>
       
      </ul>
     })}
    </div>
  
  );
}
