const EventEmitter = require('node:events');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();
const sub = new EventEmitter();
sub.on('test', () => {});

suite.add('EventEmitter#on (1)', () => {
	const sub = new EventEmitter();
	sub.on('test', () => {});
});

suite.add('EventEmitter#emit (1)', () => {
	sub.emit('test', 'test');
});

suite.on('cycle', (event) => {
	console.log(String(event.target));
});

suite.run({ async: true });
