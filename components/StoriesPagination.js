import Link from '@/components/Link'

function StoriesPagination(props) {
  const { totalPages, currentPage } = props
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)
  return (
    <>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <nav className="flex justify-between">
          {!prevPage && (
            <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
              قبلی
            </button>
          )}
          {prevPage && (
            <Link href={currentPage - 1 === 1 ? `/stories/` : `/stories/page/${currentPage - 1}`}>
              <button rel="previous">قبلی</button>
            </Link>
          )}
          <span>
            {currentPage} از {totalPages}
          </span>
          {!nextPage && (
            <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
              یعدی
            </button>
          )}
          {nextPage && (
            <Link href={`/stories/page/${currentPage + 1}`}>
              <button rel="next">بعدی</button>
            </Link>
          )}
        </nav>
      </div>
    </>
  )
}

export default StoriesPagination
