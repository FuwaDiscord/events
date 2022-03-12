import { SubscriptionBuilder } from './SubscriptionBuilder.js';

export class Subscribeable {
	subscribers: Map<string, Array<EventSubscriber>> = new Map();

	public subscribe(event: string, subscriber: EventSubscriber): number {
		if (!this.subscribers.has(event)) {
			this.subscribers.set(event, []);
		}

		return this.subscribers.get(event)!.push(subscriber) - 1;
	}

	public event(event: string): SubscriptionBuilder {
		return new SubscriptionBuilder(event, this);
	}

	public unsubscribe(event: string, subscriber: number): void {
		if (!this.subscribers.has(event)) {
			return;
		}

		const subscribers = this.subscribers.get(event)!;

		this.subscribers.set(
			event,
			subscribers.filter((_, i) => i !== subscriber)
		);
	}

	public clearSubscribers(event: string): void {
		this.subscribers.delete(event);
	}

	public publish(event: string, ...data: any[]): number {
		if (!this.subscribers.has(event)) {
			return 0;
		}

		const subscribers = this.subscribers.get(event)!;

		for (const subscriber of subscribers) {
			subscriber(...data);
		}

		return subscribers.length;
	}

	public clearAllSubscribers(): void {
		this.subscribers.clear();
	}
}

export type EventSubscriber = (...data: any[]) => void | Promise<void>;
