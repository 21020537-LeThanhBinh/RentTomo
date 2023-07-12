export default function formatBigNumber(numb: number) {
  if (!numb) return ""
  return Math.ceil(numb).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}