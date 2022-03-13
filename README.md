# events

A fast and lightweight local pub/sub library designed for [fuwa].

## Quick Start

Simply create a class that extends `Subscribeable` (or just instantiate it), and you're good to go! Then you can simply `.subscribe()` and `.unsubscribe()` to your heart's desire!

```js
import { Subscribeable } from "@fuwa/events";

const sub = new Subscribeable();

sub.subscribe("hello", () => {
  console.log("world");
});

sub.publish("hello");
```

## Documentation

### `Subscribeable`

Subscribeable is the class where all the fun happens. It stores the subscribers and handles publishing of events.

#### `.subscribe(event: string, handler: (...data: any[]) => void | Promise<void>): number`

Adds the `handler` to subscribers and returns the numerical ID of the new subscriber.

```js
Subscribeable.subscribe("test", console.log);
```

#### `.unsubscribe(subscriberId: number): void`

Removes the subscriber with the ID `subscriberId`.

```js
const id = Subscribeable.subscribe(...);

Subscribeable.unsubscribe(id);
```

#### `.publish(event: string, ...data: any[]): number`

Publishes the given `data` to all handlers of `event`. Returns the number of handlers this event was published to.

```js
Subscribeable.publish("test", 0);
```

#### `.clearSubscribers(event: string): void` 

Clears the subscribers for the given `event`.

```js
Subscribeable.clearSubscribers("test");
```

#### `.clearAllSubscribers(): void`

Clears all subscribers.

```js
Subscribeable.clearAllSubscribers();
```

#### `.event(name: string): SubscriptionBuilder`

Returns a [`SubscriptionBuilder`](#subscriptionbuilder) for the given `name`.

### `SubscriptionBuilder`

This utility class provides an easy and simple way to set filters and limits to a subscription.

Invoke it through `Subscribeable.event(name)`, and finalize the subscription with `SubscriptionBuilder.subscribe()`.

```js
Subscribeable.event("test")
  .filter(d => d === "test")
  .count(1)
  .handle(console.log)
  .subscribe();
```

[fuwa]: https://github.com/FuwaDiscord/fuwa
