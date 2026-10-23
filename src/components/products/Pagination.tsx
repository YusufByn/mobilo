import Button from '../ui/Button'

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  page,
  pageCount,
  onPageChange,
}: PaginationProps) {
  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-x-md gap-y-sm mt-lg"
      aria-label="Pagination"
    >
      <Button
        variant="secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Précédent
      </Button>
      {/* aria-live : le changement de page est annoncé par les lecteurs d'écran */}
      <p
        className="tabular-nums whitespace-nowrap text-muted"
        aria-live="polite"
      >
        Page {page} / {pageCount}
      </p>
      <Button
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
      >
        Suivant
      </Button>
    </nav>
  )
}
