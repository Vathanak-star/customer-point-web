import { BookUser, Eye, EyeIcon, RefreshCcw, ShoppingCart, Trash, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import customerService from '../../services/customer';
import {DataGrid} from '@mui/x-data-grid'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Stack, TextField } from "@mui/material";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import dayjs from "dayjs";

export default function CustomerScreen() {
    const [customers,setCustomers] = useState([])
    const [search,setSearch] = useState('')
    const [openAdd,setOpenAdd] = useState(false)
    const [openUp,setOpenUp] = useState(false)
    const [openDel,setOpenDel] = useState(false)
    const [openInfo,setOpenInfo] = useState(false)

    const [name,setName] = useState('')
    const [date,setDate] = useState(null)
    const [point,setPoint] = useState(0)
    const [id,setId] = useState(0)

    const [searchClick,setSearchClick] = useState(false)
    const [filterCustomer,setFilterCustomer] = useState([])

    const [nameInfo,setNameInfo] = useState('')
    const [dateInfo,setDateInfo] = useState(null)
    const [pointInfo,setPointInfo] = useState()

    const resetField = () => {
      setId('')
      setName('')
      setDate('')
      setPoint('')
    }

    const resetField2 = () => {
      setNameInfo('')
      setDateInfo(null)
      setPointInfo()
    }

    const handleSearchCustomer = () => {
      const normalizedSearch = search
        .normalize('NFC')                  
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '') 
        .toLowerCase();                     

      const filtered = customers.filter((item) => {
        const normalizedName = item.name
          .normalize('NFC')
          .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
          .toLowerCase();

        return normalizedName.startsWith(normalizedSearch);
      });

      console.log(filtered);
      setFilterCustomer(filtered);
      setSearchClick(true);
    }

    const handleOnCloseInfo = () => {
      resetField2()
      setOpenInfo(false)
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
        field: 'view',
        headerName: 'View',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} color="info" variant="contained" onClick={() => {
            setNameInfo(params.row.name)
            setPointInfo(params.row.point)
            setDateInfo(params.row.date)
            setOpenInfo(true)
          }}>
            <EyeIcon className="w-5 h-5"/>
          </Button>
        ),
        width: 90
      },
      {
        field: 'update',
        headerName: 'Update',
        renderCell: (params) => (
          <Button sx={{width: 60, height: 30}} color="success" variant="contained" onClick={() => {
            setOpenUp(true)
            setId(params.id)
            setName(params.row.name)
            setPoint(params.row.point)
            setDate(dayjs(params.row.date,'DD-MMMM-YYYY'))
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
            setId(params.id)
            setName(params.row.name)
            setOpenDel(true)
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

    const onAddNewCustomer = () => {
      if(!name || !point || !date){
        return toast.error('Missing Field!', {
                                        position: "top-right",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        transition: Bounce,
          });
      }

      const customerObj = {
        name: name,
        point: point,
        date: date?.format('DD-MMMM-YYYY')
      }

      customerService.createCustomer(customerObj).then(customer => {
        console.log(customer.data)
        setCustomers([...customers,customer.data])
        resetField()
        toast.success('Add Customer Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }).catch(error => {
        console.log(error.message)
      })
    }

    const handleUpdateCustomer = async () => {
      const customerObj = {
        name: name,
        point: point,
        date: date?.format('DD-MMMM-YYYY')
      }

      try {
        const result = await customerService.updateCustomer(customerObj,id)
        console.log(result)
        const customer = customers.find(cus => cus.id == id)
        const newCustomer = {
          ...customer,
          name: name,
          point: point,
          date: date?.format('DD-MMMM-YYYY')
        }

        const customerIndex = customers.findIndex(obj => obj.id == id)
        const newData = [...customers]
        newData[customerIndex] = newCustomer
        setCustomers(newData)
        resetField()
        toast.success('Update Customer Success!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
        setOpenUp(false)
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeleteCustomer = async () => {
      try {
        customerService.deleteCustomer(id).then(result => {
          console.log(result)
          const customerIndex = customers.findIndex(obj => obj.id == id)
          const newData = [...customers]
          newData.splice(customerIndex,1)
          setCustomers(newData)
          setOpenDel(false)
          resetField()
          toast.success('Delete Customer Success!', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
        })
      } catch (error) {
        console.log(error)
      }
    }

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
                <BookUser className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">Manage Customer</h1>
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
                                placeholder="Search Customers..." 
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

                    <div>
                        <button onClick={() => {
                           setOpenAdd(true)
                        }} className="py-2 px-4 bg-indigo-400 text-white hover:bg-indigo-700 rounded-lg text-sm shadow-md hover:shadow-lg">Add Customer</button>
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

            <Dialog open={openDel}>
              <DialogTitle>Do you want to delete customer {name}?</DialogTitle>
              <DialogActions>
                  <Button onClick={handleDeleteCustomer} color="success">Yes</Button>
                  <Button onClick={() => {
                    setOpenDel(false)
                    resetField()
                  }} color="error">No</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAdd} fullWidth>
                          <DialogTitle>Add New Customer</DialogTitle>
                          <DialogContent>
                            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" ></TextField>
                            <form className="w-full mx-auto my-3">
                              <input value={point} onChange={(e) => setPoint(e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" className="block w-full px-3 py-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Point: 0.." required />
                            </form>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker value={dayjs(date)} onChange={(e) => {
                                if(e){
                                  setDate(e)
                                }
                              }}/>
                            </LocalizationProvider>
                          </DialogContent>
            
                          <DialogActions>
                              <Button onClick={onAddNewCustomer} color="success">Submit</Button>
                              <Button onClick={() => {
                                resetField()
                                setOpenAdd(false)
                                }} color="error">Cancel</Button>
                          </DialogActions>
            </Dialog>

s
            <Dialog open={openUp} fullWidth>
                          <DialogTitle>Update Customer</DialogTitle>
                          <DialogContent>
                            <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" ></TextField>
                            <form className="w-full mx-auto my-3">
                              <input value={point} onChange={(e) => setPoint(e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" className="block w-full px-3 py-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Point: 0.." required />
                            </form>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker value={dayjs(date)} onChange={(e) => {
                                if(e){
                                  setDate(e)
                                }
                              }}/>
                            </LocalizationProvider>
                          </DialogContent>
            
                          <DialogActions>
                              <Button onClick={handleUpdateCustomer} color="success">Submit</Button>
                              <Button onClick={() => {
                                resetField()
                                setOpenUp(false)
                                }} color="error">Cancel</Button>
                          </DialogActions>
            </Dialog>

            <Dialog
              open={openInfo}
              onClose={handleOnCloseInfo}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              role="dialog"
              sx={{
                "& .MuiBackdrop-root": {
                  backdropFilter: "blur(6px)", // Adjust blur intensity here
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: dim the background
                },
              }}  
            >
              <DialogTitle id="alert-dialog-title">
                {"Information"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <strong>Facebook Name: </strong> {nameInfo}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <strong>Total Point: </strong> {pointInfo}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <strong>Last Updated: </strong> {dateInfo}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleOnCloseInfo}>Close</Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}