import './Rating.css'

interface RatingProps {
  value: number
}

export default function Rating({ value }: RatingProps) {
  return (
    <span className="rating">
      <span className="rating__star" aria-hidden="true">
        ★
      </span>{' '}
      {value.toFixed(1)} / 5
    </span>
  )
}
