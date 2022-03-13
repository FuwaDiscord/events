const Benchmark = require('benchmark');
const { Subscribeable } = require('..');
const EventEmitter = require('events'); 
const EventEmitter3 = require('eventemitter3');

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
});

const ee = new EventEmitter();
ee.on('test', () => {});

suite.add('EventEmitter#on (1)', () => {
	const sub = new EventEmitter();
	sub.on('test', () => {});
});

suite.add('EventEmitter#emit (1)', () => {
	ee.emit('test', 'test');
});

suite.add('EventEmitter#removeListener (1)', () => {
  ee.removeListener('test', () => {});
  queueMicrotask(() => ee.on('test', () => {}));
});

const ee3 = new EventEmitter3();
ee3.on('test', () => {});

suite.add('EventEmitter3#on (1)', () => {
	const sub = new EventEmitter3();
	sub.on('test', () => {});
});

suite.add('EventEmitter3#emit (1)', () => {
	ee3.emit('test', 'test');
});

suite.add('EventEmitter3#removeListener (1)', () => {
  ee3.removeListener('test', () => {});
  queueMicrotask(() => ee3.on('test', () => {}));
});

suite.on('cycle', (event) => {
	console.log(String(event.target));
});

suite.run({ async: true });

