import { RefreshCcw, ShoppingCart, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import customerService from '../../services/customer';
import {DataGrid} from '@mui/x-data-grid'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function CustomerScreen() {
    const [customer,setCustomer] = useState([])

    const columns = [
      { field: 'id', headerName: 'ID', flex:1},
      {
        field: 'name',
        headerName: 'Name',
        flex: 1
      },
      {
        field: 'point',
        headerName: 'Point',
        flex: 1
      },
      {
        field: 'date',
        headerName: 'Date',
        flex: 1
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} variant="contained" onClick={() => {

          }}>
            <RefreshCcw className="w-5 h-5"/>
          </Button>
        ),
        width: 90
      },
      {
        field: 'delete',
        headerName: 'Delete',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={ () => {

          }
          }>
            <Trash/>
          </Button>
        ),
        width: 90
      },
    ];

    useEffect(() => {
        customerService.fetchAllCustomer().then(customer => {
            console.log(customer.data)
            setCustomer(customer.data)
        })
    },[])

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <ShoppingCart className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">Manage Customer</h1>
            </div>

            <div className="p-6 mt-0">
                <Box sx={{ height: 540, width: '100%'}}>
                    <DataGrid
                        rows={customer}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 8,
                                },
                            },
                        }}
                        pageSizeOptions={[8]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    )
}