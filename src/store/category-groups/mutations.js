export default {
  INSERT_CATEGORY_GROUP: (state, categoryGroup) => {
    state.categoryGroups = [...state.categoryGroups, categoryGroup]
  },
}
