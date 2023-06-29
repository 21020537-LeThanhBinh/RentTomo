export default function convertPointToArrayCoordinates(point: string) {
  const coordinates = point?.match(/POINT\(([^)]+)\)/)?.[1].split(" ");
  
  if (!coordinates) return;
  return [parseFloat(coordinates[1]), parseFloat(coordinates[0])];
}