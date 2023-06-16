import "./orders.css";
import { serverUrl } from "../../utils/serverUrl";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from "../loader/Loader";

export default function Order() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios.get(`${serverUrl}/api/orders/get/all`).then((res) => {
        return res.data;
      })
  });


  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Seller</th>
          <th className="widgetLgTh">Buyer</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Gig Category</th>
        </tr>
        {
          isLoading ? <Loader /> : data.orders.map((order) => {
            return <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
              <span className="widgetLgName">{order?.sellerId?.username}</span>
              </td>
              <td className="widgetLgDate">{order?.buyerId?.username}</td>
              <td className="widgetLgAmount">{order?.price}</td>
              <td className="widgetLgStatus">
                {order?.gigId?.category}
              </td>
            </tr>


          })
        }
      </table>
    </div>
  );
}
