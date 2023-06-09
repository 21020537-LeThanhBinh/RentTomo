export default function formatAddress({ number, street, ward, district, city }: { number?: string, street?: string, ward?: string, district?: string, city?: string }) {
  if (!number || !ward || !district || !city) return ""
  
  return number + " " + street + ", " + ward + ", " + district + ", " + city
}