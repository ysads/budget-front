import mitt, { Emitter } from 'mitt';

export const eventBus: Emitter = mitt();

export const Events = {
  SHOW_ALERT: 'show-alert',
  CLOSE_DRAWER: 'close-drawer',
};
