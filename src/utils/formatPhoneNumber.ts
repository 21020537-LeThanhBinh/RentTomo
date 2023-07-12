export default function formatPhoneNumber(phone: string) {
  if (!phone) return phone
  
  if (phone.startsWith('+84')) return phone
  else if (phone.startsWith('84')) return '+' + phone
  else if (phone.startsWith('0')) return '+84' + phone.slice(1)
  else return '+84' + phone
}