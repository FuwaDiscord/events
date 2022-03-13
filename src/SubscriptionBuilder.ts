import { Subscribeable } from './Subscribeable.js';

export class SubscriptionBuilder {
	/**
	 * Filters to be run before the {@link SubscriptionBuilder.handler handler} is called.
	 */
	filters: Array<(...data: any[]) => boolean> = [];
	/**
	 * The handler to be called when the event is published.
	 */
	handler: (...data: any[]) => void | Promise<void> = () => {};
	/**
	 * The amount of times this subscriber can be called before it is unsubscribed.
	 */
	handleCount: number | null = null;

	constructor(public eventName: string, private subscribeable: Subscribeable) {}

	private __handleFunc(...data: any[]): void {
		if (this.filters.length > 0) {
			for (const filter of this.filters) {
				if (!filter(...data)) {
					return;
				}
			}
		}

		if (this.handleCount !== null) {
			if (this.handleCount === 0) {
				this.unsubscribe();
				return;
			}

			this.handleCount--;
		}

		this.handler.call(this.subscribeable, ...data);
	}

	/**
	 * Adds the filter to be run before the handler.
	 *
	 * @example
	 * Subscribeable.event('ready')
	 *    .filter(data => data[0] === 'test')
	 *    .subscribe();
	 * @example
	 * Subscribeable.event('ready')
	 *   .filter(null) // removes all filters
	 *   .subscribe();
	 */
	public filter(filter: ((...data: any[]) => boolean) | null): this {
		if (filter) {
			this.filters.push(filter);
		} else {
			this.filters = [];
		}
		return this;
	}

	/**
	 * Sets the handler to be called when the event is published.
	 * @example
	 * Subscribeable.event('ready')
	 *   .handle(data => console.log(data[0]))
	 *   .subscribe();
	 */
	public handle(handler: (...data: any[]) => void | Promise<void>): this {
		this.handler = handler;

		return this;
	}

	/**
	 * Sets the number of times this subscriber can be called before it is unsubscribed.
	 * @example
	 * Subscribeable.event('ready')
	 *   .count(1) // only call once
	 *   .subscribe();
	 */
	public count(num = -1): this {
		if (num === -1) {
			this.handleCount = null;
		} else {
			this.handleCount = num;
		}

		return this;
	}

	/**
	 * Finalizes the subscription and adds it to the event emitter.
	 */
	public subscribe(): void {
		this.subscribeable.subscribe(this.eventName, this.__handleFunc.bind(this));
	}

	/**
	 * Removes the subscription from the event emitter.
	 */
	public unsubscribe(): void {
		this.subscribeable.unsubscribe(
			this.eventName,
                        this.__handleFunc.bind(this)
		);
	}
}
