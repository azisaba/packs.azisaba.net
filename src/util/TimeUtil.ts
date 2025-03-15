export function timeAgo(date: Date): string {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat('ja', { numeric: 'auto' });

    const units: [number, Intl.RelativeTimeFormatUnit][] = [
        [60, 'second'],
        [60, 'minute'],
        [24, 'hour'],
        [30, 'day'],
        [12, 'month'],
        [Infinity, 'year'],
    ];

    let value = secondsAgo;
    for (const [divider, unit] of units) {
        if (Math.abs(value) < divider) {
            return rtf.format(-value, unit);
        }
        value = Math.floor(value / divider);
    }

    return ''; // 必要ない場合は、この行を除去できます。
}