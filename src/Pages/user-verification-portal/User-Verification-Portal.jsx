import React, { useEffect, useState, useMemo } from 'react'
import "../user-verification-portal/User-Verification-Portel.css"
import { Table } from 'react-bootstrap'
import axios from 'axios'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import moment from 'moment'
import { useReactTable, getCoreRowModel, flexRender,  createColumnHelper,
} from '@tanstack/react-table'

function Dashboard() {
    const [usersData, setUsersData] = useState([])
    const columnHelper = createColumnHelper();
    let date = moment().format('MMMM Do YYYY,h:mm:ss a')

  const filteredUsersData = useMemo(() => usersData.filter(user => user.email !== 'superadmin@gmail.com'), [usersData]);

    const data = useMemo(() => filteredUsersData, [filteredUsersData])
    const columns = [
        {
            header: 'First Name',
            accessorKey: 'firstName',
        },
        {
            header: 'Last Name',
            accessorKey: 'lastName',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Password',
            accessorKey: 'password',
        },

        {
            header: 'isVerified',
            accessorKey: 'isVerified',
            ...columnHelper.accessor((row) => row.isVerified, {
                id: "isVerified",
                cell: (row) => {
                    console.log("🚀 ~ file: User-Verification-Portal.jsx:39 ~ ...columnHelper.accessor ~ row:", row)
                   const handleToggle = async (isChecked)=>{
                    try {
                    const updateData = {...row.row.original,isVerified:isChecked,updatedAt:date}
                    console.log("🚀 ~ file: User-Verification-Portal.jsx:45 ~ handleToggle ~ date:", date)
                    console.log("🚀 ~ file: User-Verification-Portal.jsx:43 ~ handleToggle ~ updateData:", updateData)
                    await axios.put(`users/${row.row.original.id}`,updateData);
                    setUsersData((prevData)=>{
                        const newData = [...prevData]
                        const index = newData.findIndex((user) => user.id === row.row.original.id);
                        if (index!==-1) {
                            newData[index]=updateData;
                        }
                        return newData;
                    })
                }catch (error) {
                    console.log(error)
                }
                   }
                    return (
                      <span>
                        <BootstrapSwitchButton
                          size='sm'
                          checked={row.row.original.isVerified}
                          onstyle="outline-success"
                          offstyle="outline-danger"
                          onChange={handleToggle}
                        />
                      </span>
                    );
                  },
              }),
        },
        {
            header: 'isDeleted',
            accessorKey: 'isDeleted',
            ...columnHelper.accessor((row) => row.isDeleted, {
                id: "isDeleted",
                cell: (row) => {
                    console.log("🚀 ~ file: User-Verification-Portal.jsx:39 ~ ...columnHelper.accessor ~ row:", row)
                   const handleToggle = async (isChecked)=>{
                    console.log("🚀 ~ file: User-Verification-Portal.jsx:80 ~ handleToggle ~ date:", date)
                    try {
                    const updateData = {...row.row.original,isDeleted:isChecked,updatedAt:date}
                    console.log("🚀 ~ file: User-Verification-Portal.jsx:43 ~ handleToggle ~ updateData:", updateData)
                    await axios.put(`users/${row.row.original.id}`,updateData);
                    setUsersData((prevData)=>{
                        const newData = [...prevData]
                        const index = newData.findIndex((user) => user.id === row.row.original.id);
                        if (index!==-1) {
                            newData[index]=updateData;
                        }
                        return newData;
                    })
                }catch (error) {
                    console.log(error)
                }
                   }
                    return (
                      <span>
                        <BootstrapSwitchButton
                          size='sm'
                          checked={row.row.original.isDeleted}
                          onstyle="outline-success"
                          offstyle="outline-danger"
                          onChange={handleToggle}
                          className="m auto"
                        />
                      </span>
                    );
                  },
              }),
        },
        {
            header: 'createdAt',
            accessorKey: 'createdAt',
        },
        {
            header: 'updatedAt',
            accessorKey: 'updatedAt',
        },
    ]

    useEffect(() => {
        const getUsers = async () => {
            await axios
                .get('users')
                .then((res) => {
                    setUsersData(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getUsers()
    }, [])

    const totelUsers = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <>
   
            <h3 className="text-center my-3">
                <b>
                    <i>Users Data</i>
                </b>
            </h3>
            <Table striped bordered hover>
                <thead>
                    {totelUsers.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers?.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {totelUsers.getRowModel().rows?.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells()?.map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Dashboard
