export function formatDuration(milliseconds: number, shortForm?: boolean): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (shortForm) return `${days}d`;
    return `${days} ngày trước`;
  }

  if (hours > 0) {
    if (shortForm) return `${hours}h`;
    return `${hours} giờ trước`;
  }

  if (minutes > 0) {
    if (shortForm) return `${minutes}m`;
    return `${minutes} phút trước`;
  }

  if (shortForm) return `1m`;
  return 'ngay bây giờ';
}