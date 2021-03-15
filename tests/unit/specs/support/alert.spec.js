import eventBus, { SHOW_ALERT } from '@/events'
import alert from '@/support/alert'

jest.mock('@/events', () => ({
  emit: jest.fn(),
  SHOW_ALERT: 'mock-event',
}))

describe('alert', () => {
  describe('#error', () => {
    it('dispatches a SHOW_ALERT to event bus', () => {
      alert.error('message')

      expect(eventBus.emit).toHaveBeenCalledWith(SHOW_ALERT, {
        message: 'message',
        variant: 'error',
      })
    })
  })

  describe('#success', () => {
    it('dispatches a SHOW_ALERT to event bus', () => {
      alert.success('message')

      expect(eventBus.emit).toHaveBeenCalledWith(SHOW_ALERT, {
        message: 'message',
        variant: 'success',
      })
    })
  })

  describe('#warning', () => {
    it('dispatches a SHOW_ALERT to event bus', () => {
      alert.warning('message')

      expect(eventBus.emit).toHaveBeenCalledWith(SHOW_ALERT, {
        message: 'message',
        variant: 'warning',
      })
    })
  })
})
