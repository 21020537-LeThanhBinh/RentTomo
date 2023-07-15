export default async function revalidateListings() {
  // await Promise.all([
  //   fetch(`http://localhost:3000/api/revalidate?path=%2Flistings%2F%5Bid%5D`, {
  //     method: 'GET',
  //   }),
  //   fetch(`http://localhost:3000/api/revalidate?path=%2Fsearch`, {
  //     method: 'GET',
  //   }),
  //   fetch(`http://localhost:3000/api/revalidate?path=%2Fsearch%2Fmy-listings`, {
  //     method: 'GET',
  //   }),
  //   fetch(`http://localhost:3000/api/revalidate?path=%map`, {
  //     method: 'GET',
  //   }),
  // ])

  await fetch(`http://localhost:3000/api/revalidate?path=%2Fsearch`, {
    method: 'GET',
  })
  await fetch(`http://localhost:3000/api/revalidate?path=%2Flistings%2F%5Bid%5D`, {
    method: 'GET',
  })
}