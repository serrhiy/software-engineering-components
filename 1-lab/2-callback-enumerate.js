'use strict';

const once = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    return fn(...args);
  };
};

const enumerate = (array) => ({
  [Symbol.iterator]: () => ({
    index: 0,
    next() {
      return {
        done: this.index >= array.length,
        value: [this.index, array[this.index++]],
      };
    },
  }),
});

const map = (array, process, onFinish) => {
  const items = [];
  let finished = false;
  for (const [index, item] of enumerate(array)) {
    process(item, once((error, processed) => {
      if (finished) return;
      if (error) {
        finished = true;
        return void onFinish(error, null);
      }
      items.push({ index, item: processed });
      if (items.length === array.length) {
        const sorted = items.sort((a, b) => a.index - b.index);
        const result = sorted.map((value) => value.item);
        onFinish(null, result);
      }
    }));
  }
};

const processArray = (item, callback) => {
  setTimeout(callback, 1000 - 100 * item, null, item * 2);
};

map([1, 2, 3, 4], processArray, (error, result) => {
  console.log({ error, result });
});
