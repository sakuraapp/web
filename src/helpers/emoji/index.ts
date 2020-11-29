import emojis from './emojis.json'
import emoji from 'node-emoji'
import twemoji, { ParseObject } from 'twemoji'
import { getScopeId } from '../util'

emoji.emoji = emojis

export function emojify(
    el: HTMLElement,
    opts?: Partial<ParseObject>,
    scopeId?: string
): string | void {
    if (!opts) {
        opts = {}
    }

    if (!opts.size) {
        opts.folder = 'svg'
        opts.ext = '.svg'
    }

    if (!opts.attributes) {
        if (!scopeId) {
            scopeId = getScopeId(el)
        }

        opts.attributes = () => {
            return { [`data-${scopeId}`]: '' }
        }
    }

    return twemoji.parse(el, {
        ...opts,
        className: `icon`,
    })
}

/*export function emojify(
    el: HTMLElement,
    opts?: Partial<ParseObject>
): string | void {
    el.innerText = emoji.emojify(el.innerText)

    return twemojify(el, opts)
}*/

export default emoji
