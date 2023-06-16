import "./widgetLg.css";
import { Visibility } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serverUrl } from "../../../../fivrr-front/src/utils/serverUrl";
import axios from "axios";
import nodp from "../../assests/nodp.png"

import Loader from "../../components/loader/Loader"


export default function WidgetLg() {
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["buyers"],
    queryFn: () =>
      axios.get(`${serverUrl}/api/users/get/buyers`, {
        withCredentials: true,
      }).then((res) => {
        return res.data.users
      })
  })

 

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Buyers</span>
     {isLoading? <Loader /> : error ?"Something Went Wrong": data.map((user)=>{
      return  <ul className="widgetSmList" key={user._id}>
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
