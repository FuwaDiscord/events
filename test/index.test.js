const { Subscribeable } = require('..');
const expect = require('chai').expect;

describe('Subscribeable', () => {
	const sub = new Subscribeable();

	describe('#subscribe', () => {
		it('should update the subscriber map', () => {
			sub.subscribe('test', () => {});

			expect(sub.subscribers.get('test')).to.be.an('array');
		});

		it('should not override existing subscribers', () => {
			sub.subscribe('test', () => {});

			expect(sub.subscribers.get('test')).to.have.lengthOf(2);
		});
	});

	describe('#unsubscribe', () => {
		it('should remove the subscriber from the subscriber map', () => {
			let num = sub.subscribe('ready', () => {});

			sub.unsubscribe('ready', num);

			expect(sub.subscribers.get('ready')).to.have.lengthOf(0);
		});

		it('should only remove one subscriber from the subscriber map', () => {
			sub.subscribe('map_test', () => undefined);
			let num = sub.subscribe('map_test', () => undefined);

			sub.unsubscribe('map_test', num);

			expect(sub.subscribers.get('map_test')).to.have.lengthOf(1);
		});
	});

	sub.clearAllSubscribers();

	describe('#publish', () => {
		it('should send the event to subscribers', () => {
			let event = null;
			sub.subscribe('test', (e) => {
				event = e;
			});

			sub.publish('test', 'test');

			expect(event).to.equal('test');
		});

		sub.clearSubscribers('test');

		it('should send the event to all subscribers', () => {
			let event = [];

			sub.subscribe('test', () => {
				event.push(null);
			});
			sub.subscribe('test', () => {
				event.push(null);
			});

			sub.publish('test');

			expect(event).to.have.lengthOf(2);
		});

		it('should send the event to all subscribers with the correct arguments', () => {
			let event = [];

			sub.subscribe('test', (e) => {
				event.push(e);
			});
			sub.subscribe('test', (e) => {
				event.push(e);
			});

			sub.publish('test', 'test');

			expect(event).to.have.lengthOf(2);
			expect(event[0]).to.equal('test');
			expect(event[1]).to.equal('test');
		});
	});

	sub.clearAllSubscribers();

	describe('#clearAllSubscribers', () => {
		it('should clear all subscribers', () => {
			sub.subscribe('test', () => {});
			sub.subscribe('test2', () => {});

			sub.clearAllSubscribers();

			expect(sub.subscribers.size).to.equal(0);
		});
	});

	describe('#clearSubscribers', () => {
		it('should clear all subscribers for a given event', () => {
			sub.subscribe('test', () => {});

			sub.clearSubscribers('test');

			expect(sub.subscribers.get('test')).to.be.undefined;
		});
		it('should not clear subscribers from another event', () => {
			sub.subscribe('test', () => {});
			sub.subscribe('test2', () => {});

			sub.clearSubscribers('test');

			expect(sub.subscribers.get('test')).to.be.undefined;
			expect(sub.subscribers.get('test2')).to.have.lengthOf(1);
		});
	});

	describe('#event', () => {
		it('should return an object', () => {
			let ev = sub.event('test');

			expect(ev).to.be.an('object');
		});
		it('should return the builder of that event name', () => {
			let ev = sub.event('test');

			expect(ev.eventName).to.equal('test');
		});
	});
});
