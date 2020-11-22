## @zuze/pubsub

[![npm version](https://img.shields.io/npm/v/@zuze/pubsub.svg)](https://npmjs.org/package/@zuze/pubsub)
[![Coverage Status](https://coveralls.io/repos/github/zuze-lab/pubsub/badge.svg)](https://coveralls.io/github/zuze-lab/pubsub)
[![Build Status](https://travis-ci.com/zuze-lab/pubsub.svg)](https://travis-ci.com/zuze-lab/pubsub)
[![Bundle Phobia](https://badgen.net/bundlephobia/minzip/@zuze/pubsub)](https://bundlephobia.com/result?p=@zuze/pubsub)

## What is this?

[PubSub](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) is one of the best known decoupling software architecture patterns - it allows different components to communicate with each other without knowing about each other. There are plenty of great modules, but this one aims to be [ridiculously tiny](https://bundlephobia.com/result?p=@zuze/pubsub) and come with types in it's core.

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
    const { publish, subscribe } = pubsub.default();
    subscribe('someEvent',console.log);
    publish('someEvent','it works!'); // logs it works! in the console
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

## Operators

Shamelessly stolen from the concept of [RxJS](https://rxjs-dev.firebaseapp.com/guide/operators) operators.

A PubSub operator is a higher order function that accepts some parameters and returns a function that accepts a subscriber callback. They can be used individually, but become super cool when used with [`pipe`](#pipe).

They are used to essentially modify/filter published events prior to the subscriber being called.

- **`filter`**

Useful in cases where you want to subscribe to only some events on a certain topic:

```js
import pubsub from '@zuze/pubsub';
import { filter } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub<Topics>();

const onlyPost10 = ({post_id}) => post_id === 10;
const subscriber = filter(onlyPost10)(console.log);
subscribe('post', subscriber);
publish('post', { post_id: 9 }); // no log
publish('post', { post_id: 10 }); // log!
```

- **`map`**

When you want to perform some processing on an event before call another function:

```js
import pubsub from '@zuze/pubsub';
import { map } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub<Topics>();

const addTimestamp = (post) => ({...post, received_at: Date.now() })

subscribe('post', map(addTimestamp)(console.log));
publish('post', { post_id: 9 }); // adds a received_at timestamp
```

- **`mapTo`**

When you want to map to a value independent of the one being emitted:

```js
import pubsub from '@zuze/pubsub';
import { mapTo } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub<Topics>();

subscribe('post', mapTo(Date.now())(console.log));
publish('post', { post_id: 9 }); // logs the timestamp
```

- **`take`**

When you only want to call a subscriber up to a maximum number of times:

```js
import pubsub from '@zuze/pubsub';
import { take } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub<Topics>();

subscribe('post', take(2)(console.log));
publish('post', { post_id: 8 }); // logs { post_id: 8 }
publish('post', { post_id: 9 }); // logs { post_id: 9 }
publish('post', { post_id: 10 }); // doesn't log!
```

- `**single**` - analogous to `take(1)`

- **`stack`**

Calls the subscriber with all previously published events (since the subscriber started subscribing):
```js
import pubsub from '@zuze/pubsub';
import { stack } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub<Topics>();

subscribe('post', stack()(console.log));
publish('post', { post_id: 9 }); // logs { post_id: 9 }
publish('post', { post_id: 10 }); // logs [ { post_id: 9 }, { post_id: 10 } ]
publish('post', { post_id: 11 }); // logs [ { post_id: 9 }, { post_id: 10 }, { post_id: 11} ]
```

## `pipe`

Any operator can be used in a `pipe` which simply accepts a variable number of operators:

```js
import pubsub, { pipe, pipeable } from '@zuze/pubsub';
import { stack } from '@zuze/pubsub/operators';

const { publish, subscribe } = pubsub<Topics>();

subscribe(
    post,
    pipe(
        filter(({post_id}) => post_id === 10), // only emit events where the post_id is 10
        distinctUntilChanged(), // don't emit the same event twice in a row
        stack(2), // wait until we have a minimum of two events
        pipeable(console.log) // our "real" subscriber - when used inside a pipe it must be wrapped in pipeable
    );    
);

```

## License

MIT © [akmjenkins](https://github.com/akmjenkins)