export function isDevelopment(): boolean {
    const env = process.env.NODE_ENV || 'development'

    return env === 'development'
}

export function pad(d: number): string {
    return d < 10 ? '0' + d.toString() : d.toString()
}

export function formatSeconds(seconds: number, showAll = false): string {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds / 60) % 60)
    const secs = Math.floor(seconds % 60)

    const res = [mins, pad(secs)]

    if (showAll || hours > 0) {
        res.unshift(hours)
    }

    return res.join(':')
}

export function isMouseNear(
    element: HTMLElement,
    distance: number,
    event: MouseEvent
): boolean {
    // credits: ThinkingStiff [https://stackoverflow.com/questions/7911604/function-for-mouse-near-an-element-in-jquery]

    const rect = element.getBoundingClientRect()
    const left = rect.left - distance,
        top = rect.top - distance,
        right = left + element.offsetWidth + 2 * distance,
        bottom = top + element.offsetHeight + 2 * distance,
        x = event.pageX,
        y = event.pageY

    return x > left && x < right && y > top && y < bottom
}

export function getScopeId(el: HTMLElement): string {
    const dataset = el.dataset

    return Object.keys(dataset)[0]
}
