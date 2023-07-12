export function createQueryString(searchParams: any, name: string, value: any) {
  const params = new URLSearchParams(searchParams as any)
  params.set(name, value)

  return params.toString()
}

export function deleteQueryString(searchParams: any, name: string) {
  const params = new URLSearchParams(searchParams as any)
  params.delete(name)

  return params.toString()
}