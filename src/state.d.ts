import { Subscriber, Unsubscribe } from "./pubsub";

type Updater<T> = (initial: T) => T;

type State<T, R> = {
    getState: () => T,
    setState: (data: R | Updater<T>) => void,
    subscribe: (subscriber: Subscriber<T>) => Unsubscribe;
}

declare function state(): State<any, any>;
declare function state<T>(initialState: T): State<T, T>
declare function state<T, R>(initialState: T): State<T, R>

export function patch<T, R>(patch: R): (initial: T) => T;

export default state;
