import { eventBus, SHOW_ALERT } from '@/events'

export default {
  error (message) {
    eventBus.emit(SHOW_ALERT, {
      message: message,
      variant: 'error',
    })
  },

  success (message) {
    eventBus.emit(SHOW_ALERT, {
      message: message,
      variant: 'success',
    })
  },

  warning (message) {
    eventBus.emit(SHOW_ALERT, {
      message: message,
      variant: 'warning',
    })
  },
}
