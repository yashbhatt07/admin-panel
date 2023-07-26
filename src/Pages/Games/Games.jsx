// import { Button } from 'bootstrap'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DummyProfile from '../../assets/DummyProfile.webp'
import SelectItems from '../../Components/SelectItems/SelectItems'
import { useForm } from 'react-hook-form'

// import { Icon } from '@iconify/react'

import '../Games/Games.css'
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
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign, faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import ListingPagePagibnation from '../../Components/Pagination/ListingPagePagination'
import { Spinner } from 'react-bootstrap'
// import { getAllGames } from '../../API/Games'
function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank,
    })
    return itemRank.passed
}

const DefaultFilters1 = [
    { value: 'Farming', label: 'Farming' },
    { value: 'Racing', label: 'Racing' },
    { value: 'WingsTechSolution', label: 'WingsTechSolution' },
    { value: 'Studio', lable: 'Studio' },
]
const DefaultFilters2 = [
    { value: 'Farming', label: 'Farming' },
    { value: 'Racing', label: 'Racing' },
    { value: 'WingsTechSolution', label: 'WingsTechSolution' },
    { value: 'Studio', lable: 'Studio' },
]
const DefaultFilters3 = [
    { value: 'Farming', label: 'Farming' },
    { value: 'Racing', label: 'Racing' },
    { value: 'WingsTechSolution', label: 'WingsTechSolution' },
    { value: 'Studio', lable: 'Studio' },
]

const Games = () => {
    const [totelGames, setTotelGames] = useState([])

    const { control } = useForm({
        mode: 'onChange',
    })

    useEffect(() => {
        const getUsers = async () => {
            // try {
            //     const displayGameData = await getAllGames()
            //     console.log(displayGameData)
            //     if (displayGameData) {
            //         setTotelGames(displayGameData)
            //     }
            //     setLoading(false)
            // } catch (error) {
            //     console.error(error)
            //     setLoading(false)
            // }
            // console.log(totelGames)

            await axios
                .get('games')
                .then((res) => {
                    setTotelGames(res.data)
                })
                .catch((err) => {
                    console.log(err)
                    setTotelGames('')
                })
            setLoading(false)
        }
        getUsers()
    }, [])

    const data = useMemo(() => totelGames, [totelGames])
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor((row) => row.profile, {
            id: 'profile',
            enableSorting: false,
            cell: (row) => (
                <span>
                    {row.row.original.profile ? (
                        <img src={row.row.original.profile} width={45} alt="Profile" />
                    ) : (
                        <img src={DummyProfile} width={45} alt="Dummy Profile" />
                    )}
                </span>
            ),
        }),
        columnHelper.accessor((row) => row.id, {
            id: 'id',
            header: 'ID',
            cell: (row) => <span>#{row.row.original.id || '-'}</span>,
        }),

        columnHelper.accessor((row) => row.name, {
            id: 'name',
            header: 'NAME',
            cell: (row) => <span>{row.row.original.name || '-'}</span>,
        }),
        columnHelper.accessor((row) => row.genre, {
            id: 'genre',
            header: 'GENRE',
            cell: (row) => <span>{row.row.original.genre?.value || '-'}</span>,
        }),
        columnHelper.accessor((row) => row.developedBy, {
            id: 'developedBy',
            header: 'DEVELOPED BY',
            cell: (row) => <span>{row.row.original.developedBy?.value || '-'}</span>,
        }),
        columnHelper.accessor((row) => row.users, {
            id: '#USERS',
            enableSorting: false,
            cell: () => <span>{Number(Math.floor(Math.random() * 100000)).toLocaleString()}</span>,
        }),
        columnHelper.accessor((row) => row.gamePlayes, {
            id: '#GAMEPlAYES',
            enableSorting: false,
            cell: () => <span>{Number(Math.floor(Math.random() * 100000)).toLocaleString()}</span>,
        }),
        columnHelper.accessor((row) => row.rewards, {
            id: 'REWARDS',
            enableSorting: false,
            cell: () => (
                <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                    {Number(Math.floor(Math.random() * 100000)).toLocaleString()}
                </span>
            ),
        }),
        columnHelper.accessor((row) => row.rewards, {
            header: 'FEATURED GAME',
            id: 'FEATURED GAME',

            enableSorting: false,
            cell: (row) => (
                <span style={{ color: row.row.original.isFeatured ? 'green' : 'red' }}>
                    {row.row.original.isFeatured ? 'Yes' : 'No'}
                </span>
            ),
        }),

        columnHelper.accessor((row) => row.priority, {
            id: 'PRIORITY',
            enableSorting: false,
            cell: (row) => <span>{Number(row.row.original.priority).toLocaleString() || 0}</span>,
        }),
        columnHelper.accessor((row) => row.status, {
            id: 'Status',
            enableSorting: false,
            cell: (row) => (
                <div
                    className="btn-warning btn-sm p-1"
                    style={{
                        color: 'white',
                        fontSize: '11px',
                        backgroundColor:
                            row.row.original.status === 'IN DRAFT'
                                ? '#d9b169fa'
                                : row.row.original.status === 'ACTIVE'
                                ? '#4aa74a'
                                : '#cb5c5c',
                    }}
                >
                    {row.row.original?.status}
                </div>
            ),
        }),
    ]
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [loading, setLoading] = useState(false)

    const gameTable = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
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
            sorting,
        },
    })
    const navigate = useNavigate()

    const goToGames = () => {
        navigate('new', { relative: true })
    }

    const editHandler = (id) => {
        navigate(`edit/${id}`, { relative: true })
    }

    return (
        <>
            <div className="d-flex gap-2 mb-4">
                <div>
                    <h6 style={{ color: 'gray', fontWeight: '400' }}>FILTER BY</h6>
                    <div className="d-flex gap-2 ">
                        <SelectItems
                            style={{
                                width: '200px',
                            }}
                            control={control}
                            options={DefaultFilters1}
                            name="fdjksf"
                            searchable={false}
                            className="fixed-w"
                        />
                        <SelectItems
                            style={{
                                width: '200px',
                            }}
                            control={control}
                            options={DefaultFilters2}
                            name="gefdfdnre"
                            isPlaceholder="Game Category"
                        />
                        <SelectItems
                            style={{
                                width: '200px',
                            }}
                            control={control}
                            options={DefaultFilters3}
                            name="genre"
                            className="px-5"
                        />
                    </div>
                </div>
                <div>
                    <button onClick={goToGames} className="btn btn-primary pb-2 mt-4 " style={{ marginLeft: '430px' }}>
                        {' '}
                        + New Game
                    </button>
                </div>
            </div>

            <div>
                <b style={{ fontSize: '20px', fontWeight: '500' }} className="mx-2">
                    Games ({data.length})
                </b>
            </div>

            <table className=" overflow-auto  table-css mb-5" cellSpacing={0}>
                <thead>
                    {gameTable.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers?.map((header) => (
                                <th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{ fontWeight: '400', fontSize: '10px' }}
                                    className={header.column.columnDef.headerClassName}
                                >
                                    {console.log('🚀 ~ file: Games.jsx:320 ~ Games ~ header:', header)}
                                    {header.isPlaceholder ? null : (
                                        <div
                                            style={{ display: 'flex', gap: '3' }}
                                            className={`${
                                                header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                                            }`}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    {/* <Filter column={header.column} reactTable={reactTable} /> */}
                                                </div>
                                            ) : null}
                                            {(totelGames.length > 0 && header.id === 'id') ||
                                            header.id === 'name' ||
                                            header.id === 'genre' ||
                                            header.id === 'developedBy'
                                                ? {
                                                      asc: (
                                                          <>
                                                              <FontAwesomeIcon
                                                                  icon={faSortUp}
                                                                  style={{ marginTop: '3px', marginLeft: '3px' }}
                                                              />
                                                          </>
                                                      ),
                                                      desc: (
                                                          <>
                                                              <FontAwesomeIcon
                                                                  icon={faSortDown}
                                                                  style={{ marginLeft: '3px' }}
                                                              />
                                                          </>
                                                      ),
                                                  }[header.column.getIsSorted() ?? ''] || (
                                                      <FontAwesomeIcon
                                                          icon={faSort}
                                                          style={{ marginLeft: '5px', marginTop: '3px' }}
                                                      />
                                                  )
                                                : ''}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={12} className="text-center">
                                <Spinner />
                            </td>
                        </tr>
                    ) : totelGames.length > 0 ? (
                        gameTable.getRowModel().rows?.map((row) => (
                            <tr key={row.id} onClick={() => editHandler(row.original.id)}>
                                {row.getVisibleCells()?.map((cell) => (
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={11} className="text-center">
                                <span style={{ textAlign: 'center' }}>No Data Found</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ListingPagePagibnation gameTable={gameTable} />
        </>
    )
}

export default Games
