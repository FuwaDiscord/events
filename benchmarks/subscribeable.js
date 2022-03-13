const Benchmark = require('benchmark');
const { Subscribeable } = require('..');

const suite = new Benchmark.Suite();
const sub = new Subscribeable();
sub.subscribe('test', () => {});

suite.add('Subscribeable#subscribe (1)', () => {
	const sub = new Subscribeable();
	sub.subscribe('test', () => {});
});

suite.add('Subscribeable#publish (1)', () => {
	sub.publish('test', 'test');
});

suite.add('Subscribeable#unsubscribe (1)', () => {
        sub.unsubscribe('test', 0);
        queueMicrotask(() => sub.subscribe('test', () => {}));
})!

suite.on('cycle', (event) => {
	console.log(String(event.target));
});

suite.run({ async: true });
