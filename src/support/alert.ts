import { Events, eventBus } from '@/events';

export default {
  error(message: string): void {
    eventBus.emit(Events.SHOW_ALERT, {
      message: message,
      variant: 'error',
    });
  },

  success(message: string): void {
    eventBus.emit(Events.SHOW_ALERT, {
      message: message,
      variant: 'success',
    });
  },

  warning(message: string): void {
    eventBus.emit(Events.SHOW_ALERT, {
      message: message,
      variant: 'warning',
    });
  },
};
