export default async function revalidateListings() {
  // await Promise.all([
  //   fetch(`http://localhost:3000/api/revalidate?path=%2Flistings%2F%5Bid%5D`),
  //   fetch(`http://localhost:3000/api/revalidate?path=%2Fsearch`),
  //   fetch(`http://localhost:3000/api/revalidate?path=%2Fsearch%2Fmy-listings`),
  //   fetch(`http://localhost:3000/api/revalidate?path=%map`),
  // ])

  await fetch(`http://localhost:3000/api/revalidate?path=%2Fsearch`, {
    method: 'GET',
  })
}