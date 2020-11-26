declare type Subscriber<R> = (data: R) => void;
declare type Topics = Record<string, any>;
declare type Unsubscribe = () => void;
type EventBus<T extends Topics> = {
    subscribe: <R extends keyof T>(
        topic: R,
        subscriber: Subscriber<T[R]>,
    ) => Unsubscribe;
    publish: <R extends keyof T>(topic: R, data: T[R]) => void;
}
declare const pubsub: <T extends Topics>() => EventBus<T>;
export default pubsub;
