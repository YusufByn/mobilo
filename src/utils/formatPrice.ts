// Format français (espace pour les milliers, virgule pour les décimales) : 1099.99 devient « 1 099,99 $ »
export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} $`
}
