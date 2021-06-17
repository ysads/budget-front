import { eventBus, Events } from '@/events';

export default {
  error(message: string) {
    eventBus.emit(Events.SHOW_ALERT, {
      message: message,
      variant: 'error',
    });
  },

  success(message: string) {
    eventBus.emit(Events.SHOW_ALERT, {
      message: message,
      variant: 'success',
    });
  },

  warning(message: string) {
    eventBus.emit(Events.SHOW_ALERT, {
      message: message,
      variant: 'warning',
    });
  },
};
