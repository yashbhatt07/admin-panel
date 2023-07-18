import '../Pagination/TablePagination.css'

function TablePagination({ totelUsers }) {
    return (
        <>
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
        </>
    )
}

export default TablePagination
