export default function formatBigNumber(numb: number) {
  if (!numb) return ""
  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}