export = Subscribeable;
declare class Subscribeable {
  /**
   * Subscribes to an event.
   * @param {string} eventName The event name to subscribe to.
   * @param {EventSubscriber['handler']} handler
   * @param {any} [thisArg] Context to bind to the handler.
   */
  subscribe(
    eventName: string,
    handler: EventSubscriber['handler'],
    thisArg?: any
  ): void;
  /** Unsubscribes from an event.
   * @param {string} eventName The event name to unsubscribe from.
   * @param {number} index The index of the handler to unsubscribe.
   */
  unsubscribe(eventName: string, index: number): void;
  /**
   * Publishes data to all subscribers.
   * @param {string} eventName The event name to publish to.
   * @param {any[]} data The data to publish.
   * @returns {number} The number of subscribers that were notified.
   */
  publish(eventName: string, ...data: any[]): number;
  /**
   * Gets the subscribers for an event.
   * @param {string} [eventName] The event name to get the subscribers for. If left empty, all subscribers are returned.
   * @returns {EventSubscriber[] | undefined} The subscribers for the event.
   */
  subscribers(eventName?: string | undefined): EventSubscriber[] | undefined;
  /**
   * Gets the number of subscribers for an event.
   * @param {string} [eventName] The event name to get the number of subscribers for. If left empty, the total number of events is returned.
   * @returns {number} The number of subscribers for the event.
   */
  subscriberCount(eventName?: string | undefined): number;
  /**
   * Clears subscribers for an event.
   * @param {string} [eventName] The event name to clear the subscribers for. If left empty, all subscribers are cleared.
   */
  clearSubscribers(eventName?: string | undefined): void;
  /**
   * Returns a {@link SubscriptionBuilder} for the event.
   * @param {string} eventName The event name to build a subscription for.
   * @returns {SubscriptionBuilder}
   */
  event(eventName: string): SubscriptionBuilder;
  /**
   * Only for compatibility. Do not use.
   * @deprecated
   */
  addListener(eventName: any, handler: any, thisArg: any): void;
  /**
   * Only for compatibility. Do not use.
   * @deprecated
   */
  removeListener(eventName: any, handler: any): void;
  #private;
}
declare namespace Subscribeable {
  export { EventSubscriber };
  export { SubscriptionBuilder };
}
type EventSubscriber = {
  handler: (...data: any[]) => void | Promise<void>;
  context: any;
};
import SubscriptionBuilder = require('./SubscriptionBuilder.js');
