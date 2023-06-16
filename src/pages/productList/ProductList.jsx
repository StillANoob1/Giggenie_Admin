import "./productList.css";
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

export default function ProductList() {
  const token = localStorage.getItem("token");
  const queryClient=useQueryClient();

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["Gigs"],
    queryFn: () =>
      axios
        .get(`${serverUrl}/api/gigs`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data.allGigs;
        }),
  });
  const deleteUserMutation = useMutation({
    mutationFn: async (id) =>{
     return await axios.delete(`${serverUrl}/api/gigs/delete/${id}`,{
      headers:{
        'Authorization':token
      }
    })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries([`Gigs`])
      toast.success("Gig deleted successfully");
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
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img className="gigimg" src={params.row.cover || nodp} alt=""  />
      ),
    },
    { field: "title", headerName: "Title", width: 300 },
    { field: "owner", headerName: "Owner", width: 200, valueGetter: (params) => params.row.userId.username },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <DeleteOutline
            className="productListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];
  

  return (
    <div className="productList">
      { isLoading ? <Loader/> :(
        <DataGrid
        rows={data}
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
