import { Activity, ShoppingCart, } from "lucide-react";
import React, { useEffect, useState } from "react";
import customerService from '../../services/customer';
import {DataGrid} from '@mui/x-data-grid'
import { Box, Button } from "@mui/material";
import { Bounce, ToastContainer } from "react-toastify";

export default function CustomerPoint() {
    const [customers,setCustomers] = useState([])
    const [search,setSearch] = useState('')
    const [searchClick,setSearchClick] = useState(false)
    const [filterCustomer,setFilterCustomer] = useState([])


    const updatePointAdd = async (id,point) => {
              try {
                const result = await customerService.addPoint(id,point)
                console.log(result)
                const customer = customers.find(cus => cus.id == id)
                const newCustomer = {
                  ...customer,
                  point: customer.point + point,
                  date: result.date
                }
        
                const customerIndex = customers.findIndex(obj => obj.id == id)
                const newData = [...customers]
                newData[customerIndex] = newCustomer
                setCustomers(newData)
              } catch (error) {
                console.log(error)
              }
    }

    const updatePointMinus = async (id,point) => {
        try {
                const result = await customerService.minusPoint(id,point)
                console.log(result)
                const customer = customers.find(cus => cus.id == id)
                const newCustomer = {
                  ...customer,
                  point: customer.point - point,
                }
        
                const customerIndex = customers.findIndex(obj => obj.id == id)
                const newData = [...customers]
                newData[customerIndex] = newCustomer
                setCustomers(newData)
              } catch (error) {
                console.log(error)
              }
    }

    const handleSearchCustomer = () => {
      const tempCustomer = [...customers]
      const searchCustomer = tempCustomer.filter((item) => item.name.startsWith(search))
      console.log(searchCustomer)
      setFilterCustomer(searchCustomer)
      setSearchClick(true)
    }

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
            field: 'add',
            headerName: 'Add',
            renderCell: (params) => (
              <Button sx={{width: 60, height: 30}} color="success" variant="contained" onClick={() => {
                    updatePointAdd(params.id,1)
              }}>
                <h2 className="text-xl">+1</h2>
              </Button>
            ),
            width: 90
          },
          {
            field: 'add 10',
            headerName: 'Add 10',
            renderCell: (params) => (
              <Button sx={{width: 60, height: 30}} color="success" variant="contained" onClick={() => {
                    updatePointAdd(params.id,10)
              }}>
                <h2 className="text-xl">+10</h2>
              </Button>
            ),
            width: 90
          },
          {
            field: 'minus',
            headerName: 'Minus',
            renderCell: (params) => (
              <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={ () => {
                    updatePointMinus(params.id,1)
              }
              }>
                <h2 className="text-xl">-1</h2>
          
              </Button>
            ),
            width: 90
          },
          {
            field: 'minus 10',
            headerName: 'Minus 10',
            renderCell: (params) => (
              <Button sx={{width: 60, height: 30}} color="error" variant="contained" onClick={ () => {
                    updatePointMinus(params.id,10)
              }
              }>
                <h2 className="text-xl">-10</h2>
          
              </Button>
            ),
            width: 90
          },

        ];

    useEffect(() => {
            customerService.fetchAllCustomer().then(customer => {
                setCustomers(customer.data)
            }).catch((err) => {
              console.log(err)
            })
        },[])

    useEffect(() => {
      if(!search){
        setSearchClick(false)
      }
    },[search])


    return (
        
        <div className="flex flex-col h-screen bg-gray-100">
            <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            transition={Bounce}
                        />

            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <Activity className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">Manage Point</h1>
            </div>

            <div className="p-6">
                <div className="flex w-full items-center justify-between">
                    <div className="flex">
                        <div className="relative flex items-center w-60 lg:w-80 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                        
                            <input
                                value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-l-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search Customer..." 
                            />
                            
                            <button
                                className="rounded-r-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-0"
                                type="button"
                                onClick={handleSearchCustomer}
                            >
                            Search
                            </button> 
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 mt-0">
                <Box sx={{ height: 700, width: '100%'}}>
                    <DataGrid
                        rows={(searchClick) ? filterCustomer : customers}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 11,
                                },
                            },

                            sorting: {
                              sortModel: [{field: 'id', sort:'desc'}]
                            }
                        }}
                        pageSizeOptions={[8]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    
    )
}