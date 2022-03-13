import { SubscriptionBuilder } from './SubscriptionBuilder.js';
import EventEmitter from "eventemitter3";

export class Subscribeable {
        #ee: EventEmitter & { _events: Record<string, EventSubscriber[]> } = new EventEmitter() as unknown as any;

        /** @deprecated */
        get subscribers() {
          return new Map(Object.entries(this.#ee._events));
        }

	public subscribe(event: string, subscriber: EventSubscriber): number {
          this.#ee.addListener(event, subscriber);

          return this.#ee.listenerCount(event) - 1;
	}

	public event(event: string): SubscriptionBuilder {
		return new SubscriptionBuilder(event, this);
	}

	public unsubscribe(event: string, subscriber: EventSubscriber): void {
          this.#ee.removeListener(event, subscriber);
	}

	public clearSubscribers(event: string): void {
          this.#ee.removeAllListeners(event)
	}

	public publish(event: string, ...data: any[]): number {
          this.#ee.emit(event, ...data);

          return this.#ee.listenerCount(event);
	}

	public clearAllSubscribers(): void {
          this.#ee.removeAllListeners();
	}
}

export type EventSubscriber = (...data: any[]) => void | Promise<void>;
