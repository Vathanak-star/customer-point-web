import { User2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {DataGrid} from '@mui/x-data-grid'
import { Box, Button } from "@mui/material";
import userServcie from '../../services/users'

export default function User() {
    const [user,setUser] = useState([])


        const columns = [
              { field: 'id', headerName: 'ID', flex:1},
              {
                field: 'username',
                headerName: 'Username',
                flex: 1
              },
              {
                field: 'email',
                headerName: 'Email',
                flex: 1
              },
              {
                field: 'createdAt',
                headerName: 'Created At',
                flex: 1
              },
            ];
    useEffect(() => {
        userServcie.users().then(user => {
                        setUser(user.data)
                    }).catch((err) => {
                      console.log(err)
                    })
    },[])



    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex w-full h-16 bg-white justify-center items-center shadow shadow-indigo-100">
                <User2Icon className="mr-3 w-5 h-5"/>
                <h1 className="font-semibold text-lg">User</h1>
            </div>

            <div className="p-6 mt-0">
                            <Box sx={{ height: 700, width: '100%'}}>
                                <DataGrid
                                    rows={user}
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