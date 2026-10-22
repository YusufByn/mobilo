import type { Review } from '../../types/product'
import Rating from '../ui/Rating'
import './ProductReviews.css'

interface ProductReviewsProps {
  reviews: Review[]
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <section className="product-reviews">
      <h2 className="product-reviews__title">Avis clients</h2>
      {reviews.length === 0 ? (
        <p className="product-reviews__empty">Aucun avis pour ce produit.</p>
      ) : (
        <ul className="product-reviews__list">
          {/* Les avis n'ont pas d'id et la liste ne change jamais d'ordre : l'index suffit comme clé */}
          {reviews.map((review, index) => (
            <li key={index} className="product-reviews__item">
              <div className="product-reviews__header">
                {/* Initiale décorative : le nom complet est juste à côté */}
                <span className="product-reviews__initial" aria-hidden="true">
                  {review.reviewerName.charAt(0)}
                </span>
                <p className="product-reviews__name">{review.reviewerName}</p>
                <Rating value={review.rating} />
              </div>
              <p className="product-reviews__comment">« {review.comment} »</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
