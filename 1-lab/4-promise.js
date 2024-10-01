'use strict';

const map = (array, process) => new Promise((resolve, reject) => {
  if (array.length === 0) return void resolve([]);
  const result = new Array(array.length);
  let index = 0;
  let count = 0;
  let finished = false;
  for (const item of array) {
    const itemsIndex = index++;
    process(item).then((processed) => {
      if (finished) return;
      result[itemsIndex] = processed;
      count++;
      if (count === array.length) resolve(result);
    }).catch((error) => {
      if (finished) return;
      finished = true;
      reject(error);
    });
  }
});

const processArray = (item) => Promise.resolve(item * 2);

map([1, 2, 3, 4], processArray).then(console.log, console.error);
