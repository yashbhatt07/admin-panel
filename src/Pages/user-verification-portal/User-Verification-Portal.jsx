import { useEffect, useState, useMemo } from 'react'
import moment from 'moment'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    getPaginationRowModel,
} from '@tanstack/react-table'
import '../user-verification-portal/User-Verification-Portel.css'
import { getAllUser } from '../../API/Users'

function UserVerificationPortal() {
    const navigate = useNavigate()
    const columnHelper = createColumnHelper()

    const [usersData, setUsersData] = useState([])
    // const [show, setShow] = useState(false)

    // const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)

    let date = moment().format('MMMM Do YYYY')

    const filteredUsersData = useMemo(
        () => usersData.filter((user) => user.email !== 'superadmin@gmail.com'),
        [usersData]
    )

    const data = useMemo(() => filteredUsersData, [filteredUsersData])

    const columns = [
        {
            header: 'FIRST NAME',
            accessorKey: 'firstName',
        },
        {
            header: 'LAST NAME',
            accessorKey: 'lastName',
        },
        {
            header: 'EMAIL',
            accessorKey: 'email',
        },

        {
            header: 'IS VERIFIED',
            accessorKey: 'isVerified',
            ...columnHelper.accessor((row) => row.isVerified, {
                id: 'isVerified',
                cell: (row) => {
                    const [show, setShow] = useState(false)

                    const handleToggle = async (isChecked) => {
                        try {
                            const updateData = {
                                ...row.row.original,
                                isVerified: isChecked,
                                updatedAt: date,
                            }
                            await axios.put(`users/${row.row.original.id}`, updateData)
                            setUsersData((prevData) => {
                                const newData = [...prevData]
                                const index = newData.findIndex((user) => user.id === row.row.original.id)
                                if (index !== -1) {
                                    newData[index] = updateData
                                }
                                return newData
                            })
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    const handleClose = () => setShow(false)
                    const handleShow = () => setShow(true)
                    return (
                        <span>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    checked={row.row.original.isVerified}
                                    onChange={handleShow}
                                />
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update isVerified Status</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Want to change isVerified status?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancle
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleToggle(!row.row.original.isVerified)}
                                    >
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </span>
                    )
                },
            }),
        },
        {
            header: 'IS DELETED',
            accessorKey: 'isDeleted',
            ...columnHelper.accessor((row) => row.isDeleted, {
                id: 'isDeleted',
                cell: (row) => {
                    const [show, setShow] = useState(false)

                    const handleToggle = async (isChecked) => {
                        const updateData = { ...row.row.original, isDeleted: isChecked, updatedAt: date }

                        await axios.put(`users/${row.row.original.id}`, updateData)
                        setUsersData((prevData) => {
                            const newData = [...prevData]
                            const index = newData.findIndex((user) => user.id === row.row.original.id)
                            if (index !== -1) {
                                newData[index] = updateData
                            }
                            return newData
                        })
                    }

                    const handleClose = () => setShow(false)
                    const handleShow = () => setShow(true)
                    return (
                        <span>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    checked={row.row.original.isDeleted}
                                    onChange={handleShow}
                                />
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update isDeleted Status</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Want to change isDeleted status?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Cancle
                                    </Button>
                                    <Button variant="primary" onClick={() => handleToggle(!row.row.original.isDeleted)}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </span>
                    )
                },
            }),
        },
        {
            header: 'CREATED AT',
            accessorKey: 'createdAt',
            // cell: (row) => (row.row.original.createdAt !== null ? date : 'hshdbhb '),
        },
        {
            header: 'UPDATED AT',
            accessorKey: 'updatedAt',
        },
    ]

    useEffect(() => {
        const getUsers = async () => {
            const getAll = await getAllUser()
            setUsersData(getAll)
        }
        getUsers()
    }, [])

    const totelUsers = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const logOut = () => {
        navigate('/login')
    }

    return (
        <>
            <div>
                <h3 className="text-center my-3">
                    <b>USERS DATA</b>
                </h3>
                <Button
                    type="button"
                    variant="btn btn-outline-primary"
                    className=" float-end mb-2 me-4 "
                    onClick={logOut}
                >
                    LogOut
                </Button>
            </div>
            <div className="container">
                <Table striped bordered hover className="mx-auto overflow-auto">
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
            </div>
            <div className="h-2" />
            <div className="container">
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => totelUsers.setPageIndex(0)}
                        disabled={!totelUsers.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => totelUsers.previousPage()}
                        disabled={!totelUsers.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => totelUsers.nextPage()}
                        disabled={!totelUsers.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => totelUsers.setPageIndex(totelUsers.getPageCount() - 1)}
                        disabled={!totelUsers.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {totelUsers.getState().pagination.pageIndex + 1} of {totelUsers.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={totelUsers.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                totelUsers.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        style={{ margin: '0 0 0 10px' }}
                        value={totelUsers.getState().pagination.pageSize}
                        onChange={(e) => {
                            totelUsers.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div>{totelUsers.getRowModel().rows.length} Rows</div>
            </div>
        </>
    )
}

export default UserVerificationPortal
