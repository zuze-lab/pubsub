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

You could stop here and have an great, incredibly small PubSub utility. But subscribing with `pipe` and operators takes your functional PubSub system to the next level.

```js
import pubsub from '@zuze/pubsub';
import { pipe, filter, subscriber } from '@zuze/pubsub/operators';

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
<script src="https://unpkg.com/@zuze/pubsub/operators"></script>
<script>
    const { publish, subscribe } = pubsub();
    const { map, subscriber, pipe } = pubsubOperators;    
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

`pipe` and `operators` are ~~stolen from~~ inspired by the [RxJS](https://rxjs-dev.firebaseapp.com/guide/operators) operator API.

### Using Operators

-**`pipe(...operators)`**

### Creating Reusable Operators

Creating operators is acheived using `createOperator` function.

`createOperator` accepts a function that accepts any number of user-supplied arguments and returns a function that accepts a next callback, followed by a function that accepts the published event.

That sounds a bit complicated, but in reality, it's just a bunch of fat-arrows:

```js
import { createOperator, log } from '@zuze/pubsub/operators';

// call next with the published event if it's greater than the user supplied number
const greaterThan = createOperator(num => next => event => event > num && next(event));

// use like
const { subscribe, publish } = pubsub<Topics>();

subscribe( 'nums', pipe( greaterThan(5), log() ));

publish('nums', 4); // no log
publish('nums', 8); // log's 8

const multiplyBy = createOperator(num => next => event => next(event*num));

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
import { createOperator, pipe, log } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub();

// call next with the published event IF it's greater than the user supplied number
const callApiOperator = createOperator(apiCall => next => async event => next(await apiCall(event)));

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


You can easily create operators that are simply a common reuse of other operators using `pipe` using `createPipeOperator`. 
`createPipeOperator` accepts a callback that is called with the same user-supplied arguments (like `createOperator`) but it returns an array of operator functions. This is handy if you find yourself consistently reusing operators together and is used internally to create operators as well:

The below code is taken directly from `bufferCount`:

```js
import { createPipeOperator, stack, filter, map } from '@zuze/pubsub/operators';

const bufferCount = createPipeOperator((size, every) => [
  stack(),
  filter(
    e => (!size || e.length >= size) && (!every || e.length % every === 0),
  ),
  map(e => e.slice(size * -1)),
]);
```

Just for fun, creating buffer count using `createOperator` instead of `createPipeOperator` would look like this:

```js
const bufferCount = createOperator((size,every) => next => pipe(
  stack(),
  filter(
    e => (!size || e.length >= size) && (!every || e.length % every === 0),
  ),
  map(e => e.slice(size * -1)),
  () => next    
))
```

### List of Operators

We tried to stay as close as possible to RxJS operating naming, considering we're not in an observable environment.
With that in mind, here's the list:

- **`map<T,R>(mapper: (e: T) => R): R`**

Transforms the emitted event into a new value using a function before passing it to the next function:

```js
const fn = pipe( map(e => e*2), log() ) )
fn(3); // logs 6
```

- **`mapTo<R>(mapper: () => R): R`**

Transforms the emitted event into a new value before passing it to the next function

```js
const fn = pipe( map('joe'), log() ) )
fn(3); // logs 'joe'
```

- **`take<T>(num: number): T`**

Stops calling the next function after `num`

```js
const fn = pipe( take(2), log() ) )
fn(3); // logs 3
fn(3); // logs 3
fn(3); // no log
```

- **`single<T>():T`** 

Alias of `take(1)`

- **`skip<T>(num: number): T`**

Only starts calling the next function after `num` calls

```js
const fn = pipe( skip(2), log() ) )
fn(3); // no log
fn(3); // no log
fn(3); // logs 3
```

- **`tap<T>(fn: (e: T) => void): T`**

Calls it's function argument with the emitted event and continues calling the next function in the pipe:

```js
const fn = pipe( tap(e => console.log(e*2)), log() ) )
fn(3); // logs 6, then logs 3
```

- **`every<T>(num: number): T`**

Only calls the subsequent function in the pipe when a modulo of `num` has been admitted.

```js
const fn = pipe( every(2), log() ); // only proceed after every second event
fn(3); // no log
fn(3); // logs 3
fn(3); // no log
fn(3); // logs 3
```

- **`stack<T>(minSize?: number, maxSize?: number): T[]`**

Calls the next operator with an array of all previously emitted events. Will not call the next operator until the stack reaches `minSize` (defaults to 1). Will call the next operator with a maximum array length of `maxSize` (defaults to all).

- **`filter<T>(filterFn: (e: T) => boolean): T`**

The provided filter function controls whether to calling the next operator in the pipe depending on if it returns true or false

```js
const fn = pipe( filter(e => e > 2), log() )
fn(1); // no log
fn(3); // logs 3
```


## Contributing

PRs are welcome! Ideas include:

1. **TYPES FOR OPERATORS!**
2. Make the operators fully tree-shakeable. Right now they aren't.
3. Include any RxJS operators that make sense in a non-observable environment

## License

MIT © [akmjenkins](https://github.com/akmjenkins)