export function getCachedImageUrl(image_url: string, width: number = 128): string {
    return `https://images.weserv.nl/?url=${image_url}&w=${width}&output=webp`;
}