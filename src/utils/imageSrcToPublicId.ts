export default function imageSrcToPublicId(src: string): string {
  const publicId = src.split('/').at(-1)?.split('.')[0] || '';
  return publicId;
}