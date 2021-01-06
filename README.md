## @zuze/pubsub

[![npm version](https://img.shields.io/npm/v/@zuze/pubsub/next.svg)](https://npmjs.org/package/@zuze/pubsub/v/next)
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/pubsub/badge.svg?branch=next)](https://coveralls.io/github/zuze-lab/pubsub?branch=next)
[![Build Status](https://travis-ci.com/zuze-lab/pubsub.svg?branch=next)](https://travis-ci.com/zuze-lab/pubsub)
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/@zuze/pubsub@next)](https://bundlephobia.com/result?p=@zuze/pubsub@next)

## What is this?

[PubSub](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) is one of the best known decoupling software architecture patterns - it allows different components to communicate with each other without knowing about each other.

## What's special about this one?

Well, we really like the RxJS inspired [operators](#subscribing-with-pipe-and-operators) and the [super small dependency free package size](https://bundlephobia.com/result?p=@zuze/pubsub).

### Getting Started

Install it as a dependency in your JavaScript/Typescript project

```bash
npm install @zuze/pubsub
# or
yarn add @zuze/pubsub
```

Or just pull it in from the browser:

```html
<script src="https://unpkg.com/@zuze/pubsub"></script>
<script>
    const { pubsub } = zuze;
    const { publish, subscribe } = pubsub();
    subscribe(console.log);
    publish('it works!'); // logs it works! in the console
</script>
```

The core `pubsub` is extremely tiny and, to be honest, mostly useless. But it forms a core structure that can be extended with just a few lines to create other incredibly tiny and less-useless utilities, like a pubsub with topics:

```html
<script src="https://unpkg.com/@zuze/pubsub"></script>
<script>
    const { topic } = zuze;
    const { publish, subscribe } = topic();
    subscribe('someEvent', console.log);
    publish('someEvent', 'it works!'); // logs it works! in the console
</script>
```

Or a super tiny state manager:

```html
<script src="https://unpkg.com/@zuze/pubsub"></script>
<script>
    const { state } = zuze;
    const { getState, setState, subscribe } = state('joe');
    console.log(getState()) // logs joe
    const unsubscribe = subscribe(console.log) // logs joe
    setState('jim'); // the above subscriber logs jim
    unsubscribe();
    setState('fred'); // nothing logged, we unsubscribed
</script>
```

The three utilities combined, built on top of each other, come in at a rather hefty (heh) **500 bytes**.


### API

- **`pubsub<T>(): EventBus<T>`**

Creates an `EventBus` of type `T`

```js
import { pubsub } from '@zuze/pubsub';

const { publish, subscribe } = pubsub<string>();

const unsub = subscribe(console.log);
publish('joe'); // logs joe
unsub();
publish('fred'); // no log

```

- **`topic<T extends Topics>(): EventBus<T>`**

Create an `EventBus` of type T.

```js
import { topic } from '@zuze/pubsub';

type Topics = {
    user_event: {
        first_name: string;
        last_name: string;
        user_id: number;
    };
    post: {
        post_id: number;
        content: string;
    };
    comment: {
        comment_id: number;
        content: string;
        post_id: number;
    };
    nums: number;
};

const { subscribe, publish } = topic<Topics>();

publish( 'post', { post_id: 10, content: 'My Post!' } )
```

In the case of `topic`, `publish` and `subscribe` are typechecked for safety:

- **`publish: <R extends keyof T>(topic: R, data: T[R], sync?: boolean) => void`**


```js
publish(
    'comment',
    {
        comment_id: 10,
        content: 'some comment',
        post_id: 27
    }
);
```

- **`subscribe: <R extends keyof T>(topic: R, subscriber: Subscriber<T[R]>) => Unsubscribe`**

Subscribes to a topic and returns an unsubscribe function.

e.g.
```js
import { topic } from '@zuze/pubsub';
const { subscribe, publish } = topic<Topics>();
const unsub = subscribe('comment', comment => console.log('got comment',comment));
publish(
    'comment',
    {
        comment_id: 10,
        content: 'some comment',
        post_id: 27
    }
);

/*
output:
got comment
    {
        comment_id: 10,
        content: 'some comment',
        post_id: 27
    }
*/

unsub(); // no further events will be logged
```

## Subscribing with `pipe` and Operators

You could stop here and have an great, incredibly small and flexible PubSub utility. But subscribing with a `pipe` and operators takes your functional PubSub and/or State management system to the next level. 

```js
import { topic } from '@zuze/pubsub';
import { pipe, filter, subscriber } from '@zuze/pubsub/operators';

const { subscribe, publish } = topic<Topics>();

subscribe(
    'comment', 
    pipe(
        filter(({ comment_id }) => comment_id === 10),
        subscriber(({ content }) => console.log(content))
    )
);

publish('comment', { comment_id: 9, content: 'some comment' }); // no log
publish('comment', { comment_id: 10, content: 'bye' }); // logs 'bye'
```

### In the browser

```html
<script src="https://unpkg.com/@zuze/pubsub"></script>
<script src="https://unpkg.com/@zuze/pubsub/pipe"></script>
<script>
    const { pubsub, map, subscriber, pipe } = zuze;
    const { publish, subscribe } = topic();
    subscribe(
        'someEvent', 
        pipe(
            map(r => `I said, ${r}`),
            subscriber(output => console.log(output))
        )
    );

    publish('someEvent','it works!'); // logs 'I said, it works!' in the console
</script>
```

It's worth mentioning that `pipe` and operators can be used with any of `pubsub`, `state`, or `topic` pubsub utilities.

### Using Operators

Perhaps counterintuitively, due to the way a pipe is constructed from operator functions, nothing ever "comes out" of it, then end result is always `undefined`. If you want to call some external function at any point in the pipe, use the [subscriber](#subscriber) operator (an alias of [tap](#tap))


`pipe` and `operators` are ~~stolen from~~ inspired by the [RxJS](https://rxjs-dev.firebaseapp.com/guide/operators) operator API, but without the power, size (our operators and utilities weigh less than 1/10th the size at 1100 bytes for the everything-included browser build) or complexity of things like schedulers and marble diagrams.


### `pipe<T>(...operators: OperatorFn[])`


When using typescript, if you need to create a pipe separately from a subscription and want to stay type-safe, you can use `createPipe`:

```ts
import { createPipe } from '@zuze/pubsub/operators';

// creates a pipe whose operator functions act on SomeType
const pipe = createPipe<SomeType>();
const myPipe = pipe(...operatorFunctions);

// and then later
somePubSub.subscribe(myPipe);
```

If you're creating the pipe at subscription time, you can just use `pipe` directly and you'll stay typesafe

```js
import { pipe } from '@zuze/pubsub/operators';
somePubSub.subscribe(pipe(...operatorFunctions))
```


### Creating Reusable Operators

An operator function accepts a single parameter - a [unary function](https://en.wikipedia.org/wiki/Unary_function) typically named `next` and returns a function that, after performing some operation, may or may not call `next` with a single argument.

So an operator creator is any function that returns an operator function.

While this might sound complicated, in reality it's just a bunch of fat arrows. Let's create one:

```js
import { log } from '@zuze/pubsub/operators';

// greaterThan is an operator creator - a function that returns an operator.

createOperator((...args) => event =>)

// call next with the published event if it's greater than the user supplied number
const greaterThan = num => next => event => event > num && next(event);

// use like
const { subscribe, publish } = topic<Topics>();

subscribe('nums', pipe( greaterThan(5), log() ));

publish('nums', 4); // no log
publish('nums', 8); // log's 8

const multiplyBy = num => next => event => next(event*num);

// use like
subscribe('nums', pipe( multiplyBy(4), log() ));

publish('nums',4); // logs 16

// chain your custom operators!
subscribe('nums', pipe( multiplyBy(4), greaterThan(5), log() ));

publish('nums', 1); // no log
publish('nums', 2); // logs 8


```

Async operators are trivial:

```js
import topic from '@zuze/pubsub/topic';
import { pipe, log } from '@zuze/pubsub/operators';

const { publish, subscribe } = topic();

// call next with the published event IF it's greater than the user supplied number
const callApiOperator = apiCall => next => async event => next(await apiCall(event));

subscribe(
    'user_ids',
    pipe(
        callApiOperator(
            async id => (await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)).json()
        ),
        log()
    )
);

publish('user_ids', 10);
```


You can easily create operators that are simply a common reuse of other operators using `pipe` using `pipeable`. 
This is handy if you find yourself consistently reusing operators together and is used internally to create operators as well:

The below code is taken directly from `bufferCount`:

```js
import { pipeable, stack, filter, map } from '@zuze/pubsub/operators';

const bufferCount = (size, every) => pipeable(
  stack(),
  filter(
    e => (!size || e.length >= size) && (!every || e.length % every === 0),
  ),
  map(e => e.slice(size * -1)),
);
```

Just for fun, creating bufferCount without using `pipeable` would look like this:

```js
const bufferCount = (size,every) => next => pipe(
  stack(),
  filter(
    e => (!size || e.length >= size) && (!every || e.length % every === 0),
  ),
  map(e => e.slice(size * -1)),
  () => next    
);
```

### Testing Operators

One thing I find tricky about RxJS is testing. Again, `@zuze/pubsub` operators don't contain the power that comes with RxJS, but it also doesn't come the complexity. Testing pipe's and operators is usually easily achieved using a simple mock function:

```js
import { pipe, tap, filter } from '@zuze/pubsub/operators';

describe('my pipe test',() => {

    it('should work',() => {
        const spy = jest.fn();
        const myPipe = pipe ( filter(e => e < 10), ...some more operators, tap(spy) );
        myPipe(someValue); // call your pipe
        expect(spy).toHaveBeenCalledWith(...); // check to see if your spy was called appropriately
    })

})
```

### List of Operators

You'll find these operators, where applicable, are mostly similar to [RxJS operators](https://rxjs-dev.firebaseapp.com/guide/operators)

- [bufferCount](#bufferCount)
- [count](#count)
- [debounce](#debounce)
- [delay](#api)
- [distinct](#distinct)
- [distinctKey](#distinctKey)
- [distinctUntilChanged](#distinctUntilChanged)
- [distinctUntilKeyChanged](#distinctUntilKeyChanged)
- [every](#every)
- [filter](#filter)
- [log](#log)
- [map](#map)
- [mapTo](#mapTo)
- [pairwise](#pairwise)
- [pluck](#pluck)
- [select](#select)
- [single](#single)
- [skip](#skip)
- [skipUntil](#skipUntil)
- [skipWhile](#skipWhile)
- [stack](#stack)
- [startWith](#startWith)
- [subscriber](#subscriber)
- [take](#take)
- [takeUntil](#takeUntil)
- [takeWhile](#takeWhile)
- [tap](#tap)
- [throttle](#throttle)

#### `bufferCount<T>(size?: number, every?: number): T[]`
<a name="bufferCount"></a>

Calls the next operator when at least `size` events have been emitted with an array of `size`. If `every` is provided, will only call the next operator when the current call number%every is 0.

```js
const fn = pipe( bufferCount(2,3), log() ); 

fn(1); // no log
fn(2); // no log
fn(3); // logs [2,3]
fn(4); // no log
fn(5); // no log
fn(6); // logs [5,6]
fn(7); // no log

```

#### `count<T>(startAt?: number): [number,T]`
<a name="count"></a>

Adds in the number of events that have been emitted when calling the next function in the chain:

```js
const fn = pipe( count(), log() ); 
fn(3); // logs [0,3]
fn(3); // logs [1,3]
fn(3); // logs [2,3]
fn(3); // logs [3,3]
```

#### `debounce(by?: number, leading?: boolean = false)`

Debounces calls to the subsequent operator given using `by` (milliseconds).
If *leading* is true then the function will be called immediately on first invocation and subsequent calls within `by` will be ignored.

```js
const fn = pipe( debounce(100), log() );
fn(3); // after 100ms, logs 3

fn(3);
fn(3);
fn(3);
fn(3); // after 100ms, logs 3, just one time



const fn2 = pipe( debounce(100,true), log() )
fn(3); // logs three immediately
fn(3);
fn(3);
fn(3);  // doesn't log again
```

#### `delay(by?: number)`
<a name="delay"></a>

Delays calling the next function in the pipe using `by` (milliseconds):

```js
const fn = pipe( delay(100), log() ); 
fn(3);
fn(3);
fn(3);
fn(3);

// logs "3" 4 times, 100ms after each invocation
```

#### `distinct<T>(comparator?: (a: T, b: T) => boolean): R`
<a name="distinct"></a>

Only calls subsequent operators if the value hasn't been previously emitted ever.

```js
const fn = pipe (distinct(),log());

fn(3); // logs 3
fn(4); // logs 4
fn(3); // doesn't log, 3 is not distinct
```
  
#### `distinctKey<T>(key: string, comparator?: (a: T, b: T) => boolean): R`
<a name="distinctKey"></a>

Only calls subsequent operators if the value at the given key hasn't been previously emitted ever.

```js
const fn = pipe (distinctKey('post_id'),log());

fn({ post_id: 10 }); // logs { post_id: 10 }
fn({ post_id: 9 }); // logs { post_id: 10 }
fn({ post_id: 10 }); // doesn't log, value at post_id is not distinct
```

#### `distinctUntilChanged<T>(comparator?: (a: T, b: T) => boolean): R`
<a name="distinctUntilChanged"></a>

Only calls subsequent operators if the value is different than the previous value.

```js
const fn = pipe (distinctUntilChanged(),log());

fn(3); // logs 3
fn(3); // doesn't log, 3 is same as previous
fn(4); // logs 4
```

#### `distinctUntilKeyChanged<T>(key: string, comparator?: (a: T, b: T) => boolean): R`
<a name="distinctUntilKeyChanged"></a>

Only calls subsequent operators if the value at the given key is different than the previous value.

```js
const fn = pipe (distinctUntilKeyChanged('post_id'),log());

fn({ post_id: 10 }); // logs { post_id: 10 }
fn({ post_id: 10 }); // logs { post_id: 10 }
fn({ post_id: 9 }); // logs { post_id: 9}
```

#### `every<T>(num: number): T`
<a name="every"></a>

Only calls the subsequent function in the pipe when a modulo of `num` has been admitted.

```js
const fn = pipe( every(2), log() ); // only proceed after every second event
fn(3); // no log
fn(3); // logs 3
fn(3); // no log
fn(3); // logs 3
```

#### `filter<T>(filterFn: (e: T) => boolean): T`
<a name="filter"></a>

The provided filter function controls whether to calling the next operator in the pipe depending on if it returns true or false
Note: This operator is used internally to create a lot of the other operators which provide filtering functionality

```js
const fn = pipe( filter(e => e > 2), log() )
fn(1); // no log
fn(3); // logs 3
```

#### `log<T>(): T`
<a name="log"></a>

Alias of [`tap(console.log)`](#tap)

#### `map<T,R>(mapper: (e: T) => R): R`
<a name="map"></a>

Transforms the emitted event into a new value **using a function** before passing it to the next function:

```js
const fn = pipe( map(e => e*2), log() ) )
fn(3); // logs 6
```

Note: If the function provided to `map` returns a promise it will wait for the promise to resulve return the resolved value of the promise to the next operator.

#### `mapTo<R>(value: R): R`
<a name="mapTo"></a>

Transforms the emitted event into a new value before passing it to the next function

```js
const fn = pipe( map('joe'), log() ) )
fn(3); // logs 'joe'
```

#### `pairwise<T>(): T[]`
<a name="pairwise"></a>

Calls the next operator with an array containing the most recent emitted event (last element) and the event emitted previous to this. 

Note: This operator will NOT call the subsequent operator until at least 2 events have been emitted.

```js
const fn = pipe( pairwise(), log() );
fn(3); // no log
fn(4); // logs [3,4]
```

#### `pluck<T,R>(...keys: string[]): R`
<a name="pluck"></a>

Plucks value from the object the function was called with based on the given keys:

```js
const fn = pipe ( pluck( 'comment', 'created_on' ), log() );
fn({
    comment: {
        created_on: 1606101991,
        content: 'hi'
    }
}) // logs 1606101991
```

#### `select(...selectorFunctions,resultFunc)`

Convenience operator which is just a combination of [`map`](#map) + [`distinctUntilChanged`](#distinctUntilChanged)
Inspired by [`reselect`](https://github.com/reduxjs/reselect)

```js
import state from '@zuze/pubsub/state';
import { pipe, select, tap } from '@zuze/pubsub/operators';
const { getState, setState, subscribe } = state({
    first:3,
    second:10
});

subscribe(
    pipe(
        select(
            ({ first }) => first,
            ({ second }) => second,
            ([ first, second ]) => first + second
        ),
        tap(console.log)
    )
); // logs 13

setState({third:9}); // doesn't log anything because arguments to the selector haven't changed
```

#### `single<T>():T`
<a name="take"></a>

Alias of [`take(1)`](#take)

#### `skip<T>(num: number): T`
<a name="skip"></a>

Only starts calling the next function after `num` calls

```js
const fn = pipe( skip(2), log() ) )
fn(3); // no log
fn(3); // no log
fn(3); // logs 3
```

#### `skipUntil<T>(promise: Promise<void>): T`
<a name="skipUntil"></a>

Prevents calling the next function until the provided promise resolved

```js
const when = new Promise(res => setTimeout(res,2000));
const fn = pipe( skipUntil(when), log() ) )
fn(3); // no log
fn(3); // no log
// 2 seconds pass
fn(3); // logs 3
```

#### `skipWhile<T>(getValue: () => boolean): T`
<a name="skipWhile"></a>

Prevents calling the next function if the getter returns true.

```js
let someValue = true;
const when = () => someValue;
const fn = pipe( skipWhile(when), log() ) )
fn(3); // no log
fn(3); // no log
someValue = true;
// 2 seconds pass
fn(3); // logs 3
```

#### `stack<T>(minSize?: number, maxSize?: number): T[]`
<a name="stack"></a>

Calls the next operator with an array of previously emitted events. Will not call the next operator until the stack reaches `minSize` (defaults to 1). Will call the next operator with a maximum array length of `maxSize` (defaults to all).

Related: [`bufferCount`](#bufferCount)

```js
const fn = pipe( stack(), log() ); 

fn(1); // logs [1]
fn(2); // logs [1,2]
fn(3); // logs [1,2,3]
fn(4); // logs [1,2,3,4]


const fn = pipe( stack(3), log() ); 

fn(1); // no log
fn(2); // no log
fn(3); // logs [1,2,3]
fn(4); // logs [1,2,3,4]

const fn = pipe( stack(3,2), log() ); 

fn(1); // no log
fn(2); // no log
fn(3); // logs [2,3]
fn(4); // logs [3,4]
fn(5); // logs [4,5]

```

#### `startWith<T>(T | Promise<T> | () => (T | Promise<T>)): T`
<a name="startWith"></a>

Immediately calls the next operator in the chain with the value (or resolved value, in the case of a Promise)

```js

const fn = pipe( filter(i => i > 2), startWith(7), log() ); // 7 is logged immediately
fn(1); // no log
fn(3); // logs 3


const fn = pipe ( filter(i => i > 2), startWith(() => new Promise(res => setTimeout(() => res(7))), log() );

```

#### `subscriber<T>(fn: (e: T) => void): T`
<a name="subscriber"></a>

Alias of [`tap`](#tap)


#### `take<T>(num: number): T`
<a name="take"></a>

Stops calling the next function after `num`

```js
const fn = pipe( take(2), log() ) )
fn(3); // logs 3
fn(3); // logs 3
fn(3); // no log
```

#### `takeUntil<T>(promise: Promise<void>): T`
<a name="takeUntil"></a>

Calls the next function until the provided promise resolved

```js
const when = new Promise(res => setTimeout(res,2000));
const fn = pipe( takeUntil(when), log() ) )
fn(3); // logs 3
fn(3); // logs 3
// 2 seconds pass
fn(3); // no log
```

#### `takeWhile<T>(getValue: () => boolean): T`
<a name="takeWhile"></a>

Prevents calling the next function if the getter returns false.


```js
let someValue = true;
const when = () => someValue;
const fn = pipe( skipWhile(when), log() ) )
fn(3); // no log
fn(3); // no log
someValue = true;
// 2 seconds pass
fn(3); // logs 3
```

Note: A keen observer will notice that takeWhile is an alias for [filter](#filter).

#### `tap<T>(fn: (e: T) => void): T`
<a name="tap"></a>

Calls it's function argument with the emitted event and continues calling the next function in the pipe:

```js
const fn = pipe( tap(e => console.log(e*2)), log() ) )
fn(3); // logs 6, then logs 3
```


#### `throttle(by?: number, leading?: boolean)`
<a name="throttle"></a>

Throttles calls to the subsequent operator using `by` (milliseconds)

```js
const fn = pipe( delay(100), log() ); 
fn(3); // asynchronous logs 3, 100 ms after emitted
```


## Contributing

PRs are welcome!

## License

MIT © [akmjenkins](https://github.com/akmjenkins)