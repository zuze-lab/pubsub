import { Subscriber, Unsubscribe } from "./pubsub";

declare type Topics = Record<string, any>;
declare type TopicMatcher = (a: string, b: string) => boolean;
type EventBus<T extends Topics> = {
    subscribe: <R extends keyof T>(
        topic: R,
        subscriber: Subscriber<T[R]>,
    ) => Unsubscribe;
    publish: <R extends keyof T>(topic: R, data: T[R]) => void;
}
export const mqttMatcher: TopicMatcher;
declare const topic: <T extends Topics>(topicMatcher?: TopicMatcher) => EventBus<T>;
export default topic;
