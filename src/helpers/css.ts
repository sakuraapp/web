function formatString(val: number | string, suffix: string): string {
    if (!isNaN(Number(val))) {
        return `${val}${suffix}`
    }

    return String(val)
}

export function formatSize(val: number | string): string {
    return formatString(val, 'px')
}

export function formatTime(val: number | string): string {
    return formatString(val, 's')
}
