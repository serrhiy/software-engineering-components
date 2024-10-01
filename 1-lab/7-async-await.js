'use strict';

const { scheduler } = require('node:timers/promises');

const map = async (array, process) => {
  const promises = array.map(process);
  return await Promise.all(promises);
};

const processArray = async (item) => {
  await scheduler.wait(1000);
  return item * 2;
};

(async () => {
  try {
    const result = await map([1, 2, 3, 4], processArray);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
