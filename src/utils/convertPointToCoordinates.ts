function convertPointToArrayCoordinates(point?: string) {
  const coordinates = point?.match(/POINT\(([^)]+)\)/)?.[1].split(" ");
  
  if (!coordinates) return;
  return [parseFloat(coordinates[1]), parseFloat(coordinates[0])];
}

function convertPointToCoordinates(point?: string) {
  const coordinates = point?.match(/POINT\(([^)]+)\)/)?.[1].split(" ");
  
  if (!coordinates) return;
  return {
    lat: parseFloat(coordinates[1]),
    lng: parseFloat(coordinates[0])
  };
}

export { convertPointToArrayCoordinates, convertPointToCoordinates }