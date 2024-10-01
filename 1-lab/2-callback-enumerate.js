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
  const result = new Array(array.length);
  let finished = false;
  let count = 0;
  for (const [index, item] of enumerate(array)) {
    process(item, once((error, processed) => {
      if (finished) return;
      if (error) {
        finished = true;
        return void onFinish(error, null);
      }
      result[index] = processed;
      count++;
      if (count === array.length) onFinish(null, result);
    }));
  }
};

const processArray = (item, callback) => {
  setTimeout(callback, 1000 - 100 * item, null, item * 2);
};

map([1, 2, 3, 4], processArray, (error, result) => {
  console.log({ error, result });
});
