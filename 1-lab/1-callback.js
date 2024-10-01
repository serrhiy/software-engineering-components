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
  const items = [];
  let finished = false;
  let index = 0;
  for (const item of array) {
    const itemIndex = index++;
    process(item, once((error, processed) => {
      if (finished) return;
      if (error) {
        finished = true;
        return void onFinish(error, null);
      }
      items.push({ index: itemIndex, item: processed });
      if (items.length === array.length) {
        const sorted = items.sort((a, b) => a.index - b.index);
        const result = sorted.map((value) => value.item);
        onFinish(null, result);
      }
    }));
  }
};

const processArray = (item, callback) => {
  setTimeout(callback, 1000, null, item * 2);
};

map([1, 2, 3, 4], processArray, (error, result) => {
  console.log({ error, result });
});
