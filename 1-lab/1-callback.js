'use strict';

const once = (fn) => {
  let called = false;
  return (...args) => {
    if (called) return;
    called = true;
    return fn(...args);
  };
};

const map = (array, process, onFinish) => {
  const result = new Array(array.length);
  let finished = false;
  let index = 0;
  let count = 0;
  for (const item of array) {
    const itemIndex = index++;
    process(item, once((error, processed) => {
      if (finished) return;
      if (error) {
        finished = true;
        return void onFinish(error, null);
      }
      result[itemIndex] = processed;
      count++;
      if (count === array.length) onFinish(null, result);
    }));
  }
};

const processArray = (item, callback) => {
  setTimeout(callback, 1000, null, item * 2);
};

map([1, 2, 3, 4], processArray, (error, result) => {
  console.log({ error, result });
});
