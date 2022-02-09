export function isDevelopment(): boolean {
    return import.meta.env.DEV
}

export function getEnv(key: string): string {
    return import.meta.env[`VITE_${key}`]?.toString()
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

export function getAbsoluteUrl(path: string): string {
    return `${location.protocol}//${location.host}${path}`
}

// todo: use polyfill
export function isURLValid(input: string): boolean {
    let url: URL

    try {
        url = new URL(input)
    } catch (err) {
        return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
}

export function getExtensionId(): string {
    return document.documentElement.dataset.sakuraExtensionId
}

export function isFullscreen(): boolean {
    return (
        window.innerHeight == screen.height ||
        document.fullscreenElement !== null
    )
}

export function toggleFullscreen(): void {
    if (isFullscreen()) {
        document.exitFullscreen()
    } else {
        document.body.requestFullscreen()
    }
}

export function getViewportWidth(): number {
    return Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
    )
}

export function getViewportHeight(): number {
    return Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
    )
}

export function randFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function sleep(duration: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

export async function convertURLtoFile(url: string): Promise<File> {
    const response = await fetch(url)
    const data = await response.blob()

    const ext = url.split('.').pop()
    const filename = url.split('/').pop()
    const metadata = { type: `image/${ext}` }

    return new File([data], filename, metadata)
}

export function getHost(url: string): string {
    let host

    if (url.indexOf('//') > -1) {
        host = url.split('/')[2]
    } else {
        host = url.split('/')[0]
    }

    // find & remove "?"
    host = host.split('?')[0]

    return host
}
