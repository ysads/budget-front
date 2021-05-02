import { upsert } from '@/support/collection'

describe('collection', () => {
  describe('#upsert', () => {
    describe('when item is already at the collection', () => {
      it('substitutes the item and keep the rest', () => {
        const coll = [
          { id: '1', name: 'item-1' },
          { id: '2', name: 'item-2' },
        ]
        const newItem = { id: '2', name: 'new-item-2' }

        expect(upsert(coll, newItem)).toEqual([
          { id: '1', name: 'item-1' },
          { id: '2', name: 'new-item-2' },
        ])
      })
    })

    it('appends new item to the tail of collection', () => {
      const coll = [
        { id: '1', name: 'item-1' },
        { id: '2', name: 'item-2' },
      ]
      const newItem = { id: '3', name: 'item-3' }

      expect(upsert(coll, newItem)).toEqual([
        { id: '1', name: 'item-1' },
        { id: '2', name: 'item-2' },
        { id: '3', name: 'item-3' },
      ])
    })
  })
})
