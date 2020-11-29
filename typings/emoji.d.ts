// Type definitions for node-emoji 1.8
// Project: https://github.com/omnidan/node-emoji#readme
// Definitions by: Tristan Jones <https://github.com/jonestristand>
//                 styu <https://github.com/styu>
//                 rimiti <https://github.com/rimiti>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'node-emoji' {
    export interface Emojis {
        [key: string]: string
    }

    export interface Emoji {
        emoji: string
        key: string
    }

    // eslint-disable-next-line prefer-const
    export let emoji: Emojis

    export function emojify(
        str: string,
        onMissing?: (emojiName: string) => string,
        format?: (code: string, name: string) => string
    ): string
    export function get(emoji: string): string
    export function random(): Emoji
    export function search(searchTerm: string): Emoji[]
    export function which(emoji_code: string): string
    export function unemojify(str: string): string
    export function find(emoji: string): Emoji
    export function hasEmoji(str: string): boolean
    export function strip(str: string): string
    export function replace(
        str: string,
        replacement: ((emoji: Emoji) => string) | string,
        cleanSpaces?: boolean
    ): string
}
