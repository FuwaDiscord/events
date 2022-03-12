import { SubscriptionBuilder } from './SubscriptionBuilder.js';
export declare class Subscribeable {
    subscribers: Map<string, Array<EventSubscriber>>;
    subscribe(event: string, subscriber: EventSubscriber): number;
    event(event: string): SubscriptionBuilder;
    unsubscribe(event: string, subscriber: number): void;
    clearSubscribers(event: string): void;
    publish(event: string, ...data: any[]): number;
    clearAllSubscribers(): void;
}
export declare type EventSubscriber = (...data: any[]) => void | Promise<void>;
