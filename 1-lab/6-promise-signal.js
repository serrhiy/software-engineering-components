'use strict';

const map = (array, process, signal) => new Promise((resolve, reject )=> {
  signal.addEventListener('abort', () => reject(signal.reason));
  const promises = array.map(process);
  Promise.all(promises).then(resolve, reject);
});

const processArray = (item) => new Promise((resolve) => setTimeout(resolve, 1000, item * 2));

const signal = AbortSignal.timeout(5000);
map([1, 2, 3, 4], processArray, signal).then(console.log, console.error)
