import mitt from 'mitt'

const eventBus = mitt()

export const SHOW_ALERT = 'show-alert'

export default eventBus
