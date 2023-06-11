export default function formatAddress({ number, ward, district, city }: { number?: string, ward?: string, district?: string, city?: string }) {
  if (!number || !ward || !district || !city) return ""
  
  return number + ", " + ward + ", " + district + ", " + city
}