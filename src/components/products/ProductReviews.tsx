import type { Review } from '../../types/product'
import Rating from '../ui/Rating'

interface ProductReviewsProps {
  reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <section className="flex flex-col gap-md">
      <h2 className="text-xl sm:text-2xl">Avis clients</h2>
      {reviews.length === 0 ? (
        <p className="text-muted">Aucun avis pour ce produit.</p>
      ) : (
        // Liste simple : un fin trait entre chaque avis, pas de cartes
        <ul className="border-t border-line-soft">
          {/* Les avis n'ont pas d'id et la liste ne change jamais d'ordre : l'index suffit comme clé */}
          {reviews.map((review, index) => (
            <li
              key={index}
              className="flex flex-col gap-xs py-md border-b border-line-soft"
            >
              <div className="flex flex-wrap items-center gap-x-md gap-y-sm">
                {/* Initiale décorative : le nom complet est juste à côté */}
                <span
                  className="flex items-center justify-center size-control font-display text-lg font-stretch-(--stretch-display) font-black text-on-button bg-action-fill rounded-full"
                  aria-hidden="true"
                >
                  {review.reviewerName.charAt(0)}
                </span>
                <p className="font-semibold">{review.reviewerName}</p>
                <Rating value={review.rating} />
              </div>
              <p className="max-w-measure pl-review-text">
                « {review.comment} »
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
