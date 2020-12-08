import { Subscriber, Unsubscribe } from "./pubsub";
type State<T, R> = {
    getState: () => T,
    setState: (data: R | Partial<R>) => void,
    subscribe: (subscriber: Subscriber<T>) => Unsubscribe;
}

declare function state(): State<any, any>;
declare function state<T>(initialState: T): State<T, T>
declare function state<T, R>(initialState: T, transformer: (data: R) => T): State<T, R>

export default state;
