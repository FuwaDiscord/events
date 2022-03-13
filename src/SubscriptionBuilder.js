class SubscriptionBuilder {
  /**
   * Filters to be run before the {@link SubscriptionBuilder.handler handler} is called.
   * @type {((...data: any[]) => boolean)[]}
   */
  filters = [];
  /**
   * The handler to be called when the event is published.
   * @type {(...data: any[]) => void}
   */
  handler = () => {};
  /**
   * The amount of times this subscriber can be called before it is unsubscribed.
   * @type {number | null}
   */
  handleCount = null;

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
  constructor(eventName, subscribeable) {
    this.eventName = eventName;
    this.subscribeable = subscribeable;
  }

  /** @private @internal */
  __handleFunc(...data) {
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
   * @param filter {(...data: any[]) => boolean} The filter to be run before the handler.
   * @returns {this}
   */
  filter(filter) {
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
   * @param handler {(...data: any[]) => void} The handler to be called when the event is published.
   * @returns {this}
   */
  handle(handler) {
    this.handler = handler;

    return this;
  }

  /**
   * Sets the number of times this subscriber can be called before it is unsubscribed.
   * @example
   * Subscribeable.event('ready')
   *   .count(1) // only call once
   *   .subscribe();
   * @param num {number} The number of times this subscriber can be called before it is unsubscribed.
   * @returns {this}
   */
  count(num = -1) {
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
  subscribe() {
    this.subscribeable.addListener(
      this.eventName,
      this.__handleFunc.bind(this)
    );
  }

  /**
   * Removes the subscription from the event emitter.
   */
  unsubscribe() {
    this.subscribeable.removeListener(
      this.eventName,
      this.__handleFunc.bind(this)
    );
  }
}

module.exports = SubscriptionBuilder;
