import React from 'react'
import { Table } from 'react-bootstrap'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'

function TablePagination({ data, columns }) {
    const totelUsers = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <>
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

export default TablePagination
