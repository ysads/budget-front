export const upsert = (collection, newItem) => {
  let found = false

  const updatedColl = collection.map((item) => {
    if (item.id !== newItem.id) return item

    found = true
    return newItem
  })

  return found ? updatedColl : [...updatedColl, newItem]
}
