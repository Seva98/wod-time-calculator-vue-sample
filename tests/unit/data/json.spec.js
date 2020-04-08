import data from '@/data/movements'

describe('Data JSON', () => {
    it('exists', () => {
        expect(data).toBeDefined();
    })

    it('has valid objects', () => {
        const requiredKeys = ['name', 'categories', 'repsInMinute', 'units', 'tags',  'priority', 'difficulty']
        expect(Array.isArray(data)).toEqual(true);
        data.forEach((dataPoint) => {
          expect(typeof dataPoint).toEqual('object');
          const dataKeys = Object.keys(dataPoint)
          const allKeysIncluded = requiredKeys.every(key => dataKeys.includes(key))
          expect(allKeysIncluded).toBe(true);
        });
      });
})
