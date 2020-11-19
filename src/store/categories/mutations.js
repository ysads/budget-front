export default {
  INSERT_CATEGORY: (state, category) => {
    state.categories = [...state.categories, category]
  },
}
