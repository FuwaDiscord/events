export declare class SubscriptionBuilder {
    eventName: string;
    private subscribeable;
    /**
     * Filters to be run before the {@link SubscriptionBuilder.handler handler} is called.
     */
    filters: Array<(...data: any[]) => boolean>;
    /**
     * The handler to be called when the event is published.
     */
    handler: (...data: any[]) => void | Promise<void>;
    /**
     * The amount of times this subscriber can be called before it is unsubscribed.
     */
    handleCount: number | null;
    constructor(eventName: string, subscribeable: Subscribeable);
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
     */
    filter(filter: ((...data: any[]) => boolean) | null): this;
    /**
     * Sets the handler to be called when the event is published.
     * @example
     * Subscribeable.event('ready')
     *   .handle(data => console.log(data[0]))
     *   .subscribe();
     */
    handle(handler: (...data: any[]) => void | Promise<void>): this;
    /**
     * Sets the number of times this subscriber can be called before it is unsubscribed.
     * @example
     * Subscribeable.event('ready')
     *   .count(1) // only call once
     *   .subscribe();
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
export interface Subscribeable {
    addListener(eventName: string, handler: (...data: any[]) => void | Promise<void>): any;
    removeListener(eventName: string, handler: (...data: any[]) => void | Promise<void>): any;
}
