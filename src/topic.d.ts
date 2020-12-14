import { Subscriber, Unsubscribe } from "./pubsub";

type TopicSubscriber<T> = ({ data: T, topic: string }) => void;

declare type Topics = Record<string, any>;
declare type TopicMatcher = (a: string, b: string) => boolean;
type EventBus<T extends Topics> = {
    subscribe: <R extends keyof T>(
        topic: R,
        subscriber: TopicSubscriber<T[R]>,
    ) => Unsubscribe;
    publish: <R extends keyof T>(topic: R, data: T[R], retain?: boolean) => void;
}

type MqttEventBus<T extends Topics> = {
    subscribe: <R extends keyof T>(topic: string, subscriber: TopicSubscriber<T[R]>) => Unsubscribe,
    publish: <R extends keyof T>(topic: R, data: T[R], retain?: boolean) => void;
}


export const mqttMatcher: (published: string, subscribedTo: string) => boolean;
declare function topic<T extends Topics>(): EventBus<T>;
declare function topic<T extends Topics>(topicMatcher?: TopicMatcher): MqttEventBus<T>;
export default topic;
