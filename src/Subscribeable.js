const SubscriptionBuilder = require('./SubscriptionBuilder.js');

class Subscribeable {
  /**
   * @type {Map<string, Array<EventSubscriber>>}
   */
  _subscribers = new Map();

  /**
   * Subscribes to an event.
   * @param {string} eventName The event name to subscribe to.
   * @param {EventSubscriber['handler']} handler
   * @param {any} [thisArg] Context to bind to the handler.
   */
  subscribe(eventName, handler, thisArg) {
    const subscribers = this._subscribers.get(eventName) || [];
    subscribers.push({ handler, context: thisArg });

    this._subscribers.set(eventName, subscribers);
  }

  /** Unsubscribes from an event.
   * @param {string} eventName The event name to unsubscribe from.
   * @param {number} index The index of the subscriber to unsubscribe.
   */
  unsubscribe(eventName, index) {
    const subscribers = this._subscribers.get(eventName);
    if (!subscribers) return;

    void subscribers.splice(index, 1);
  }

  /**
   * Publishes data to all subscribers.
   * @param {string} eventName The event name to publish to.
   * @param {any[]} data The data to publish.
   * @returns {number} The number of subscribers that were notified.
   */
  publish(eventName, ...data) {
    const subscribers = this._subscribers.get(eventName);
    if (!subscribers) return 0;

    for (const subscriber of subscribers) {
      subscriber.handler.call(subscriber.context, ...data);
    }

    return subscribers.length;
  }

  /**
   * Gets the subscribers for an event.
   * @param {string} [eventName] The event name to get the subscribers for. If left empty, all subscribers are returned.
   * @returns {EventSubscriber[] | undefined} The subscribers for the event.
   */
  subscribers(eventName) {
    return eventName
      ? this._subscribers.get(eventName)
      : [...this._subscribers.values()].reduce((a, b) => a.concat(b), []);
  }

  /**
   * Gets the number of subscribers for an event.
   * @param {string} [eventName] The event name to get the number of subscribers for. If left empty, the total number of events is returned.
   * @returns {number} The number of subscribers for the event.
   */
  subscriberCount(eventName) {
    if (!eventName) return this._subscribers.size;

    const subscribers = this._subscribers.get(eventName);
    return subscribers ? subscribers.length : 0;
  }

  /**
   * Clears subscribers for an event.
   * @param {string} [eventName] The event name to clear the subscribers for. If left empty, all subscribers are cleared.
   */
  clearSubscribers(eventName) {
    if (!eventName) return this._subscribers.clear();

    this._subscribers.delete(eventName);
  }

  /**
   * Returns a {@link SubscriptionBuilder} for the event.
   * @param {string} eventName The event name to build a subscription for.
   * @returns {SubscriptionBuilder}
   */
  event(eventName) {
    return new SubscriptionBuilder(eventName, this);
  }

  /**
   * Only for compatibility. Do not use.
   * @deprecated
   */
  addListener(eventName, handler, thisArg) {
    this.subscribe(eventName, handler, thisArg);
  }

  /**
   * Only for compatibility. Do not use.
   * @deprecated
   */
  removeListener(eventName, handler) {
    this.unsubscribe(eventName, handler);
  }
}

module.exports = Subscribeable;

/**
 * @typedef {{ handler: (...data: any[]) => void | Promise<void>; context: any; }} EventSubscriber
 */
