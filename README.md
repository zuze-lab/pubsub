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

## Utilities

- **`filter`**

Useful in cases where you want to subscribe to only some events on a certain topic:

```js
import pubsub, { filter } from '@zuze/pubsub';

const { publish, subscribe } = pubsub<Topics>();

const onlyPost10 = ({post_id}) => post_id === 10;
subscribe('post', filter(onlyPost10)(console.log));
publish('post', { post_id: 9 }); // no log
publish('post', { post_id: 10 }); // log!
```

- **`map`**

When you want to perform some processing on an event before call another function:

```js
import pubsub, { map } from '@zuze/pubsub';

const { publish, subscribe } = pubsub<Topics>();

const addTimestamp = (post) => ({...post, received_at: Date.now() })

subscribe('post', map(addTimestamp)(console.log));
publish('post', { post_id: 9 }); // adds a received_at timestamp
```

- **`onlyOnce`**

When you only want to call a subscriber once:

```js
import pubsub, { onlyOnce } from '@zuze/pubsub';

const { publish, subscribe } = pubsub<Topics>();

subscribe('post', onlyOnce(console.log));
publish('post', { post_id: 9 }); // logs { post_id: 9 }
publish('post', { post_id: 10 }); // doesn't log!
```

- **`stack`**

Calls the subscriber with all previously published events (since the subscriber started subscribing):
```js
import pubsub, { stack } from '@zuze/pubsub';

const { publish, subscribe } = pubsub<Topics>();

const addTimestamp = (post) => ({...post, received_at: Date.now() })

subscribe('post', stack(console.log));
publish('post', { post_id: 9 }); // logs { post_id: 9 }
publish('post', { post_id: 10 }); // logs [ { post_id: 9 }, { post_id: 10 } ]
publish('post', { post_id: 11 }); // logs [ { post_id: 9 }, { post_id: 10 }, { post_id: 11} ]
```

## License

MIT © [akmjenkins](https://github.com/akmjenkins)