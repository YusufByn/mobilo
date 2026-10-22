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
      {/* Virgule française : 4.2 devient « 4,2 » */}
      {value.toLocaleString('fr-FR', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}
      {/* « sur 5 » n'est pas affiché mais reste lu : sans lui, « 4,2 » ne veut rien dire à l'oral */}
      <span className="visually-hidden"> sur 5</span>
    </span>
  )
}
