'use strict';

const map = (array, process) => new Promise((resolve, reject) => {
  const items = [];
  let index = 0;
  let finished = false;
  for (const item of array) {
    const itemsIndex = index++;
    process(item).then((processed) => {
      if (finished) return;
      items.push({ index: itemsIndex, item: processed });
      if (items.length === array.length) {
        const sorted = items.sort((a, b) => a.index - b.index);
        const result = sorted.map((value) => value.item);
        resolve(result);
      }
    }).catch((error) => {
      if (finished) return;
      finished = true;
      reject(error);
    });
  }
});

const processArray = (item) => Promise.reject(item * 2);

map([1, 2, 3, 4], processArray).then(console.log, console.error);
