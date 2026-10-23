interface ProductStockProps {
  status: string
  stock: number
}

// Couleur du point de stock selon la valeur exacte renvoyée par l'API (en anglais)
function getStockColor(status: string) {
  if (status === 'Low Stock') {
    return 'text-warning'
  }
  if (status === 'Out of Stock') {
    return 'text-error'
  }
  return 'text-success'
}

export default function ProductStock({ status, stock }: ProductStockProps) {
  // before: dessine le point coloré devant le texte, bg-current lui donne la couleur du texte
  return (
    <p
      className={`flex items-center gap-sm font-semibold before:content-[''] before:size-sm before:bg-current before:rounded-full ${getStockColor(status)}`}
    >
      {status} ({stock} en stock)
    </p>
  )
}
