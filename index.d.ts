declare type Subscriber<R> = (data: R) => void;
declare type BooleanSubscriber<R> = (data: R) => boolean;
declare type MapSubscriber<R> = <T>(data: R) => T;
declare type Topics = Record<string, any>;
type Unsubscribe = () => void;
type EventBus<T extends Topics> = {
    subscribe: <R extends keyof T>(
        topic: R,
        subscriber: Subscriber<T[R]>,
    ) => Unsubscribe;
    publish: <R extends keyof T>(topic: R, data: T[R], sync?: boolean) => void;
}
declare const pubsub: <T extends Topics>() => EventBus<T>;
export default pubsub;

export const filter: <R>(filter: BooleanSubscriber<R>) => (subscriber: Subscriber<R>) => Subscriber<R>;
export const map: <R, T> (filter: (data: R) => T) => (subscriber: Subscriber<T>) => Subscriber<R>;
export const onlyOnce: <R>(subscriber: Subscriber<R>) => Subscriber<R>;
export const stack: <R>(subscriber: Subscriber<R[]>) => Subscriber<R>;