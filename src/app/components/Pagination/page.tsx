import Link from "next/link";

interface PaginationProps {
  page: number,
  total: number,
  size: number,
}

// typing props leads to build error
export default async function Pagination({ page, total, size }: any) {
  const totalPages = Math.floor(total / size)
  const hasNextPage = (page + 1) > totalPages

  return (
    <div className="mt-4 text-end">

      <span className="text-sm font-medium mr-4 ">Page {page} of {totalPages}</span>
      <Link
        href={`/?page=${page > 1 ? Number(page) - 1 : 1}`}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 mr-2"
        aria-label="Go to next page"
      >
        Previous
      </Link>
      <Link
        href={`/?page=${page + 1}`}
        className={`${hasNextPage && 'pointer-events-none cursor-not-allowed bg-gray-100 '} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2`}
        aria-label="Go to next page"
      >
        Next
      </Link>
    </div>
  )
}