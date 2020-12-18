import { ChakraClient } from '@sakuraapp/chakra-client'

export interface ChakraOptions {
    url: string
    token?: string
    room: string
}

export async function mountChakra(
    opts: ChakraOptions,
    video: HTMLVideoElement
): Promise<void> {
    const client = new ChakraClient(opts)

    await client.connect()
    await client.watchStream(opts.room, video)

    video.play()
}
