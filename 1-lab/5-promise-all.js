'use strict';

const map = (array, process) => {
  const promises = array.map(process);
  return Promise.all(promises);
};

const processArray = (item) => Promise.resolve(item * 2);

map([1, 2, 3, 4], processArray).then(console.log, console.error);
