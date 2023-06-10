export default function createQueryString(searchParams: any, name: string, value: string) {
  const params = new URLSearchParams(searchParams as any)
  params.set(name, value)

  return params.toString()
}