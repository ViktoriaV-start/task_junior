import {encoded, translations} from './data.js'

console.log("Let's rock")


const permanent = [ 'groupId', 'service', 'formatSize', 'ca'];

function getUniqueId(data) {

  let values = [];

  data.forEach((item) => {
    if(values) {
      values = [...values, ...Object.values(item)];
    } else {
      values = [...Object.values(item)];
    }
  });

  let uniqueValues = values.reduce((acc, el) => {
    if(el === null || isNaN(+el)) return acc;
    if(acc.includes(+el)) return acc;
    return [...acc, +el];
  }, []);

  return uniqueValues.sort((a, b) => a-b);
}

function getCorrectedData(initial, exclusion) {
  const result = [];
  initial.forEach((item) => {
    result.push(Object.fromEntries(Object.entries(item).filter( el => !exclusion.includes(el[0]))));
  });
  return result;
}

function decode(data) {
  const result = [];

  data.forEach((item) => {
    let decodedItem = {};

    for (let key in item) {
      decodedItem[key] = translations[item[key]] ?? 'не определено';
    }
    result.push(decodedItem);
  });
  return result;
};

const cleanedData = getCorrectedData(encoded, permanent);
const uniqueId = getUniqueId(cleanedData);
const decoded = decode(cleanedData);

console.log(decoded, uniqueId);
