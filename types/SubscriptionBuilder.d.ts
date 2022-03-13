export = SubscriptionBuilder;
declare class SubscriptionBuilder {
    /**
     * @typedef {{
     *   addListener: (eventName: string, handler: (...data: any[]) => void) => void,
     *   removeListener: (eventName: string, handler: (...data: any[]) => void) => void
     * }} Subscribeable
     */
    /**
     * @param eventName {string} Event name to subscribe to.
     * @param subscribeable {Subscribeable} The subscribeable to subscribe to.
     */
    constructor(eventName: string, subscribeable: {
        addListener: (eventName: string, handler: (...data: any[]) => void) => void;
        removeListener: (eventName: string, handler: (...data: any[]) => void) => void;
    });
    /**
     * Filters to be run before the {@link SubscriptionBuilder.handler handler} is called.
     * @type {((...data: any[]) => boolean)[]}
     */
    filters: ((...data: any[]) => boolean)[];
    /**
     * The handler to be called when the event is published.
     * @type {(...data: any[]) => void}
     */
    handler: (...data: any[]) => void;
    /**
     * The amount of times this subscriber can be called before it is unsubscribed.
     * @type {number | null}
     */
    handleCount: number | null;
    eventName: string;
    subscribeable: {
        addListener: (eventName: string, handler: (...data: any[]) => void) => void;
        removeListener: (eventName: string, handler: (...data: any[]) => void) => void;
    };
    /** @private @internal */
    private __handleFunc;
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
     * @param filter {(...data: any[]) => boolean} The filter to be run before the handler.
     * @returns {this}
     */
    filter(filter: (...data: any[]) => boolean): this;
    /**
     * Sets the handler to be called when the event is published.
     * @example
     * Subscribeable.event('ready')
     *   .handle(data => console.log(data[0]))
     *   .subscribe();
     * @param handler {(...data: any[]) => void} The handler to be called when the event is published.
     * @returns {this}
     */
    handle(handler: (...data: any[]) => void): this;
    /**
     * Sets the number of times this subscriber can be called before it is unsubscribed.
     * @example
     * Subscribeable.event('ready')
     *   .count(1) // only call once
     *   .subscribe();
     * @param num {number} The number of times this subscriber can be called before it is unsubscribed.
     * @returns {this}
     */
    count(num?: number): this;
    /**
     * Finalizes the subscription and adds it to the event emitter.
     */
    subscribe(): void;
    /**
     * Removes the subscription from the event emitter.
     */
    unsubscribe(): void;
}
