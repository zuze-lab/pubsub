## @zuze/pubsub

[![npm version](https://img.shields.io/npm/v/@zuze/pubsub.svg)](https://npmjs.org/package/@zuze/pubsub)
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/pubsub/badge.svg)](https://coveralls.io/github/zuze-lab/pubsub)
[![Build Status](https://travis-ci.com/zuze-lab/pubsub.svg)](https://travis-ci.com/zuze-lab/pubsub)
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/@zuze/pubsub)](https://bundlephobia.com/result?p=@zuze/pubsub)

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
    const { publish, subscribe } = pubsub();
    subscribe('someEvent', console.log);
    publish('someEvent', 'it works!'); // logs it works! in the console
</script>
```

### API

- **`pubsub<T extends Topics>(): EventBus<T>`**

Create an `EventBus` of type T.

```js
import pubsub from '@zuze/pubsub';

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

const { subscribe, publish } = pubsub<Topics>();
```


- **`publish: <R extends keyof T>(topic: R, data: T[R], sync?: boolean) => void`**

Broadcasts an entity to all subscribers on a given topic:

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

Take note of the optional third `sync` parameter. By default `@zuze/pubsub` broadcasts to all subscribers for a given topic **asynchronously** so as to prevent a single subscriber from potentially blocking any other subscriber. If you pass the third parameter as true, events will be broadcast **synchronously**.

- **`subscribe: <R extends keyof T>(topic: R, subscriber: Subscriber<T[R]>) => Unsubscribe`**

Subscribes to a topic and returns an unsubscribe function.

```js
e.g. 
const { subscribe, publish } = pubsub<Topics>();
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

You could stop here and have an great, incredibly small PubSub utility. But subscribing with a `pipe` and operators takes your functional PubSub system to the next level.

```js
import pubsub from '@zuze/pubsub';
import { createPipe, filter, subscriber } from '@zuze/pubsub/operators';

// creates a pipe that accepts operator functions that act on Topics['comment']
const pipe = createPipe<Topics['comment']>();
const { subscribe, publish } = pubsub<Topics>();

subscribe(
    'comment', 
    pipe(
        filter(({ comment_id }) => comment_id === 10),
        subscriber(({content}) => console.log(content))
    )
);

publish('comment',{ comment_id: 9, content: 'some comment' }); // no log
publish('comment',{ comment_id: 10, content: 'bye' }); // logs 'bye'
```

### In the browser

```html
<script src="https://unpkg.com/@zuze/pubsub"></script>
<script src="https://unpkg.com/@zuze/pubsub/pipe"></script>
<script>
    const { publish, subscribe } = pubsub();
    const { map, subscriber, pipe } = pubsubPipe;    
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

Perhaps counterintuitively, due to the way a pipe is constructed from operator functions, nothing ever "comes out" of a pipe, then end result is always `undefined`. If you want to call some external function at any point in the pipe, use the [subscriber](#subscribertfn-e-t--void-t) operator (an alias of [tap](#taptfn-e-t--void-t))


`pipe` and `operators` are ~~stolen from~~ inspired by the [RxJS](https://rxjs-dev.firebaseapp.com/guide/operators) operator API, but without the power or complexity of schedulers or marble diagrams.

### Using Operators

### `pipe<T>(...operators: OperatorFn<T,any>[])`


When using typescript, you should create the pipe first using `createPipe`:

```ts
import { createPipe } from '@zuze/pubsub/operators';

// creates a pipe whose operator functions act on SomeType
const pipe = createPipe<SomeType>();
const myPipe = pipe(...operatorFunctions);
```

When using plain JavaScript, feel free to use `pipe` directly:

```js
import { pipe } from '@zuze/pubsub/operators';
const myPipe = pipe(...operatorFunctions);
```


### Creating Reusable Operators

An operator function accepts a single parameter - a [unary function](https://en.wikipedia.org/wiki/Unary_function) typically named `next` and returns a function that, after performing some operation, may or may not call `next` with a single argument.

So an operator creator is any function that returns an operator function.

While this might sound complicated, in reality it's just a bunch of fat arrows. Let's create one:

```js
import { log } from '@zuze/pubsub/operators';

// greaterThan is an operator creator - a function that returns an operator.

// call next with the published event if it's greater than the user supplied number
const greaterThan = num => next => event => event > num && next(event);

// use like
const { subscribe, publish } = pubsub<Topics>();
const pipe = createPipe<Topics['number']>();

subscribe( 'nums', pipe( greaterThan(5), log() ));

publish('nums', 4); // no log
publish('nums', 8); // log's 8

const multiplyBy = num => next => event => next(event*num);

// use like
subscribe( 'nums', pipe( multiplyBy(4), log() ));

publish('nums',4); // logs 16

// chain your custom operators!
subscribe( 'nums', pipe( multiplyBy(4), greaterThan(5), log() ));

publish('nums', 1); // no log
publish('nums', 2); // logs 8


```

Async operators are trivial:

```js
import pubsub from '@zuze/pubsub';
import { pipe, log } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub();

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

### List of Operators

We tried to stay as close as possible to RxJS operating naming, considering we're not in an observable environment.
With that in mind, here's the list:

#### `map<T,R>(mapper: (e: T) => R): R`

Transforms the emitted event into a new value using a function before passing it to the next function:

```js
const fn = pipe( map(e => e*2), log() ) )
fn(3); // logs 6
```

#### `mapTo<R>(mapper: () => R): R`

Transforms the emitted event into a new value before passing it to the next function

```js
const fn = pipe( map('joe'), log() ) )
fn(3); // logs 'joe'
```

#### `take<T>(num: number): T`

Stops calling the next function after `num`

```js
const fn = pipe( take(2), log() ) )
fn(3); // logs 3
fn(3); // logs 3
fn(3); // no log
```

#### `takeUntil<T>(promise: Promise<void>): T`

Calls the next function until the provided promise resolved

```js
const when = new Promise(res => setTimeout(res,2000));
const fn = pipe( takeUntil(when), log() ) )
fn(3); // logs 3
fn(3); // logs 3
// 2 seconds pass
fn(3); // no log
```

#### `startWith<T>(T | Promise<T> | () => (T | Promise<T>)): T`

Immediately calls the next operator in the chain with the value:

```js

const fn = pipe( filter(i => i > 2), startWith(7), log() ); // 7 is logged immediately
fn(1); // no log
fn(3); // logs 3


const fn = pipe ( filter(i => i > 2), startWith(() => new Promise(res => setTimeout(() => res(7))), log() );

```

#### `single<T>():T`

Alias of `take(1)`

#### `skip<T>(num: number): T`

Only starts calling the next function after `num` calls

```js
const fn = pipe( skip(2), log() ) )
fn(3); // no log
fn(3); // no log
fn(3); // logs 3
```

#### `skipUntil<T>(promise: Promise<void>): T`

Prevents calling the next function until the provided promise resolved

```js
const when = new Promise(res => setTimeout(res,2000));
const fn = pipe( takeUntil(when), log() ) )
fn(3); // no log
fn(3); // no log
// 2 seconds pass
fn(3); // logs 3
```

#### `tap<T>(fn: (e: T) => void): T`

Calls it's function argument with the emitted event and continues calling the next function in the pipe:

```js
const fn = pipe( tap(e => console.log(e*2)), log() ) )
fn(3); // logs 6, then logs 3
```

#### `subscriber<T>(fn: (e: T) => void): T`

Alias of `tap`

#### `log<T>(): T`

Alias of `tap(console.log)`

#### `every<T>(num: number): T`

Only calls the subsequent function in the pipe when a modulo of `num` has been admitted.

```js
const fn = pipe( every(2), log() ); // only proceed after every second event
fn(3); // no log
fn(3); // logs 3
fn(3); // no log
fn(3); // logs 3
```

#### `count<T>(startAt?: number): [number,T]`

Adds in the number of events that have been emitted when calling the next function in the chain:

```js
const fn = pipe( count(), log() ); 
fn(3); // logs [0,3]
fn(3); // logs [1,3]
fn(3); // logs [2,3]
fn(3); // logs [3,3]
```

#### `stack<T>(minSize?: number, maxSize?: number): T[]`

Calls the next operator with an array of all previously emitted events. Will not call the next operator until the stack reaches `minSize` (defaults to 1). Will call the next operator with a maximum array length of `maxSize` (defaults to all).

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

#### `bufferCount<T>(size?: number, every?: number): T[]`

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

#### `pairwise<T>(): T[]`

Calls the next operator with an array containing the most recent emitted event (last element) and the event emitted previous to this. 

Note: This operator will NOT call the subsequent operator until at least 2 events have been emitted.

#### `filter<T>(filterFn: (e: T) => boolean): T`

The provided filter function controls whether to calling the next operator in the pipe depending on if it returns true or false

```js
const fn = pipe( filter(e => e > 2), log() )
fn(1); // no log
fn(3); // logs 3
```

#### `pluck<T,R>(...keys: string[]): R`

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

#### `distinct<T>(comparator?: (a: T, b: T) => boolean): R`

Only calls subsequent operators if the value hasn't been previously emitted ever.
  
#### `distinctKey<T>(key: string, comparator?: (a: T, b: T) => boolean): R`

Only calls subsequent operators if the value at the given key hasn't been previously emitted ever.

#### `distinctUntilChanged<T>(comparator?: (a: T, b: T) => boolean): R`

Only calls subsequent operators if the value is different than the previous value.

#### `distinctUntilKeyChanged<T>(key: string, comparator?: (a: T, b: T) => boolean): R`

Only calls subsequent operators if the value at the given key is different than the previous value.

#### `delay(by?: number)`

Delays calling the next function in the pipe using `by` (milliseconds):

```js
const fn = pipe( delay(100), log() ); 
fn(3); // asynchronous logs 3, 100 ms after emitted
```

#### `debounce(by?: number, leading?: boolean = false)`

Debounces calls to the subsequent operator given using `by` (milliseconds).
If *leading* is true then the function will be called immediately on first invocation and subsequent calls within `by` will be ignored.

#### `throttle(by?: number, leading?: boolean)`

Throttles calls to the subsequent operator using `by` (milliseconds)

```js
const fn = pipe( delay(100), log() ); 
fn(3); // asynchronous logs 3, 100 ms after emitted
```


## Contributing

PRs are welcome!

## License

MIT © [akmjenkins](https://github.com/akmjenkins)