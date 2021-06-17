type Model = {
  id: string;
};

export const upsert = <T extends Model>(collection: T[], newItem: T): T[] => {
  let found = false;

  const updatedColl = collection.map((item: T) => {
    if (item.id !== newItem.id) return item;

    found = true;
    return newItem;
  });

  return found ? updatedColl : [...updatedColl, newItem];
};

export const sample = <T>(collection: T[]): T => {
  const length = collection.length;
  return collection[Math.floor(Math.random() * length)];
};
