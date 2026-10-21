import './Pagination.css'

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
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Précédent
      </button>
      {/* aria-live : le changement de page est annoncé par les lecteurs d'écran */}
      <p className="pagination__status" aria-live="polite">
        Page {page} / {pageCount}
      </p>
      <button
        type="button"
        className="pagination__button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount}
      >
        Suivant →
      </button>
    </nav>
  )
}
