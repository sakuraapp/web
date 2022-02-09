const colors = [
    '#f45b5b', // red
    '#1f59f5', // blue
    '#841ff5', // purple
    '#c91fc4', // pink
    '#19a543', // green
]

const colorCount = colors.length
const defaultColor = '#3c3c3c'

export function getAvatarColor(index: number): string {
    return colors[index] || defaultColor
}

export function getAvatarColorIndex(discriminator: string): number {
    return Number(discriminator) % colorCount
}
