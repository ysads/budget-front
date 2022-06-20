import { createApp, h } from 'vue';

export function setupHook<T>(hook: () => T) {
  let result: T;

  const app = createApp({
    setup() {
      result = hook();
      return { result };
    },
    render: () =>
      h('div', {
        ref: 'myDiv',
      }),
  });

  app.mount(document.createElement('div'));

  // @ts-expect-error TS doesn't know that result is already initialized
  // when we reach this point.
  return { result, app };
}
