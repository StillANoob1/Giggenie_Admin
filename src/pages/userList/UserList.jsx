import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../utils/serverUrl";
import nodp from "../../assests/nodp.png";
import { toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";

export default function UserList() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const queryClient=useQueryClient();

  const { data: userData, isError, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get(`${serverUrl}/api/users/get/users`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data.users;
        }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id) =>{
     return await axios.delete(`${serverUrl}/api/users/delete/${id}`, {
        withCredentials: true,
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([`users`])
      toast.success("User deleted successfully");
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message)
    }
   
  }
  );

  const handleDelete = (id) => {
     deleteUserMutation.mutate(id);
   
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params?.row?.img || nodp} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => {
        return params.row.isSeller ? "Seller" : "Buyer";
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      { isLoading ? <Loader/> : (
        <DataGrid
        rows={userData || []}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      ) }
    </div>
  );
}
