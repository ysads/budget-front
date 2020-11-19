export default {
  INSERT_MONTH (state, month) {
    state.months[month.isoMonth] = month
  },
}
