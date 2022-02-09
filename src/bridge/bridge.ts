import { WebBroker } from '@sakuraapp/ext-message-broker'

export class Bridge extends WebBroker<'player'> {
    sendToPlayer<T>(event: string, data: T, time?: number): void {
        return this.send(event, data, 'player', time)
    }
}
