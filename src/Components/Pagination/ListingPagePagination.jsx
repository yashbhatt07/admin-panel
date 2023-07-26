import '../Pagination/TablePagination.css'
import Pagination from 'react-bootstrap/Pagination'

function ListingPagePagibnation({ gameTable }) {
    const currentPageIndex = gameTable.getState().pagination.pageIndex
    const pageCount = gameTable.getPageCount()
    const isSecondToLastPage = currentPageIndex === pageCount - 1
    return (
        <>
            <div className="flex align-items-center gap-2 d-flex gap-5 justify-content-between">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {currentPageIndex + 1} of {pageCount}
                    </strong>
                </span>
                <button
                    className="border rounded p-1"
                    onClick={() => gameTable.setPageIndex(0)}
                    disabled={!gameTable.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => gameTable.previousPage()}
                    disabled={!gameTable.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => gameTable.nextPage()}
                    disabled={!gameTable.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => gameTable.setPageIndex(pageCount - 1)}
                    disabled={!gameTable.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={gameTable.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const inputBox = e.target.value ? Number(e.target.value) - 1 : 0
                            const lastPageIndex = pageCount - 1
                            if (inputBox >= 0 && inputBox <= lastPageIndex) {
                                if (inputBox !== currentPageIndex) {
                                    gameTable.setPageIndex(inputBox)
                                }
                            }
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    style={{ margin: '0 0 0 10px' }}
                    value={gameTable.getState().pagination.pageSize}
                    onChange={(e) => {
                        gameTable.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default ListingPagePagibnation
