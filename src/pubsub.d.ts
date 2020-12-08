export type Subscriber<R> = (data: R) => void;
export type Unsubscribe = () => void;
type EventBus<R> = {
    subscribe: (subscriber: Subscriber<R>) => Unsubscribe;
    publish: (data: R) => void;
}
declare const pubsub: <R>() => EventBus<R>;
export default pubsub;
