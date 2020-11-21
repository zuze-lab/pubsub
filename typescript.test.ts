import pubsub, { map, filter, stack } from './index';

jest.useFakeTimers();

describe('test', () => {
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

    it('should be truthy', () => {
        expect(pubsub()).toBeTruthy();
    });

    it('should publish', () => {
        const bus = pubsub<Topics>();
        expect(() =>
            bus.publish('post', {
                post_id: 10,
                content: 'test',
            }),
        ).not.toThrow();
    });

    it('should publish with a subscriber (async)', () => {
        const bus = pubsub<Topics>();
        const subscriber = jest.fn();
        bus.subscribe('comment', subscriber);
        const comment = { comment_id: 10, content: 'fred', post_id: 12 };
        bus.publish('comment', comment);
        expect(subscriber).not.toHaveBeenCalledWith(comment);
        // async
        jest.advanceTimersToNextTimer();
        expect(subscriber).toHaveBeenCalledWith(comment);
    });

    it('should publish with a subscriber (sync)', () => {
        const bus = pubsub<Topics>();
        const subscriber = jest.fn();
        bus.subscribe('comment', subscriber);
        const comment = { comment_id: 10, content: 'fred', post_id: 12 };
        bus.publish('comment', comment, true);
        expect(subscriber).toHaveBeenCalledWith(comment);
    });

    it('should unsubscribe', () => {
        const bus = pubsub<Topics>();
        const subscriber = jest.fn();
        const unsub = bus.subscribe('user_event', subscriber);
        unsub();
        const user = { first_name: 'freddie', last_name: 'mercury', user_id: 10 };
        bus.publish('user_event', user);
        expect(subscriber).not.toHaveBeenCalled();
    });

    it('should filter', () => {
        const { publish, subscribe } = pubsub<Topics>();
        const subscriber = jest.fn();
        const filterFn = ({ post_id }) => post_id === 10;
        subscribe('post', filter(filterFn)(subscriber));
        publish('post', { post_id: 9, content: 'test' }, true);
        expect(subscriber).not.toHaveBeenCalled();
        publish('post', { post_id: 10, content: 'test' }, true);
        expect(subscriber).toHaveBeenCalled();
    });

    it('should map', () => {
        const { publish, subscribe } = pubsub<Topics>();
        const subscriber = jest.fn();
        const mapFn = ({ post_id }) => post_id + 5;
        subscribe('post', map(mapFn)(subscriber));
        publish('post', { post_id: 9, content: 'test' }, true);
        expect(subscriber).toHaveBeenCalledWith(14);
        publish('post', { post_id: 10, content: 'test' }, true);
        expect(subscriber).toHaveBeenCalledWith(15);
    });

    it('should stack', () => {
        const { publish, subscribe } = pubsub();
        const subscriber = jest.fn();
        subscribe('post', stack(subscriber));
        const first = { post_id: 9, content: 'test' };
        const second = { post_id: 10, content: 'test' };
        publish('post', first, true);
        expect(subscriber).toHaveBeenCalledWith([first]);
        publish('post', second, true);
        expect(subscriber).toHaveBeenCalledWith([first, second]);
    });
});
