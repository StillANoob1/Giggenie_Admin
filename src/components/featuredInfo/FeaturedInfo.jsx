import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from "axios"
import Loader from "../loader/Loader"
import {serverUrl} from "../../utils/serverUrl"

export default function FeaturedInfo() {

  const { data, isLoading, error }= useQuery({
    queryKey:["messages"],
    queryFn:()=>
    axios.get(`${serverUrl}/api/orders/get/all`).then((res)=>{
      return res.data;
    })
  });
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{ isLoading ? "Loading...": `$${data?.totalRevenue}` }</span>
          <span className="featuredMoneyRate">
           
          </span>
        </div>
        <span className="featuredSub">Admin receives a 10% commission for every sale</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{ isLoading ? "Loading...": `${data?.orders?.length}` }</span>
          <span className="featuredMoneyRate">
            <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last year</span>
      </div>
    
    </div>
  );
}
