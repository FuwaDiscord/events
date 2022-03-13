import { SubscriptionBuilder } from './SubscriptionBuilder.js';
export declare class Subscribeable {
    #private;
    /** @deprecated */
    get subscribers(): Map<string, EventSubscriber[]>;
    subscribe(event: string, subscriber: EventSubscriber): number;
    event(event: string): SubscriptionBuilder;
    unsubscribe(event: string, subscriber: EventSubscriber): void;
    clearSubscribers(event: string): void;
    publish(event: string, ...data: any[]): number;
    clearAllSubscribers(): void;
}
export declare type EventSubscriber = (...data: any[]) => void | Promise<void>;
