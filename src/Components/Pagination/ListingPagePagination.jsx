import '../Pagination/TablePagination.css'
import Pagination from 'react-bootstrap/Pagination'

function ListingPagePagibnation({ gameTable }) {
    return (
        <>
            <div className="flex items-center gap-2 d-flex gap-5">
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
                    onClick={() => gameTable.setPageIndex(gameTable.getPageCount() - 1)}
                    disabled={!gameTable.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {gameTable.getState().pagination.pageIndex + 1} of {gameTable.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={gameTable.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gameTable.setPageIndex(page)
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
                <div>{gameTable.getRowModel().rows.length} Rows</div>
            </div>
            {/* <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination> */}
        </>
    )
}

export default ListingPagePagibnation
