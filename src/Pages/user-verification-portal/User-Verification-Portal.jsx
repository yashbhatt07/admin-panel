import { useEffect, useState, useMemo } from 'react'
import moment from 'moment'
import axios from 'axios'
// import { Table } from 'react-bootstrap'
import { Button, Modal } from 'react-bootstrap'
import {
    createColumnHelper,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'

import '../user-verification-portal/User-Verification-Portel.css'
import { getAllUser } from '../../API/Users'
import TablePagination from '../../Components/Pagination/Table-Pagination'
import Table from '../../Components/Table/Table'

function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank,
    })
    return itemRank.passed
}
function UserVerificationPortal() {
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
            header: 'CREATED AT',
            accessorKey: 'createdAt',
            // cell: (row) => (row.row.original.createdAt !== null ? date : 'hshdbhb '),
            enableSorting: false,
        },
        {
            header: 'UPDATED AT',
            accessorKey: 'updatedAt',
            enableSorting: false,
        },
        {
            header: 'IS VERIFIED',
            accessorKey: 'isVerified',
            enableSorting: false,
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
                                    className="form-check-input mx-5"
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
                                        Cancel
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
            enableSorting: false,
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
                                    className="form-check-input mx-5"
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
                                        Cancel
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
    ]

    useEffect(() => {
        const getUsers = async () => {
            const getAll = await getAllUser()
            setUsersData(getAll)
        }
        getUsers()
    }, [])
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')

    const totelUsers = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
        debugTable: true,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
            sorting,
        },
    })

    return (
        <>
            <Table totelUsers={totelUsers} data={data} />
            <TablePagination totelUsers={totelUsers} />
        </>
    )
}

export default UserVerificationPortal
