export default function mergeSort(arr) {
  if (arr.length === 1) return arr;

  const middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right);
}

function merge(left, right) {
  let result = [];

  while (0 < left.length && 0 < right.length) {
    if (left[0] < right[0]) {
      result.push(left[0]);
      left.shift();
    } else {
      result.push(right[0]);
      right.shift();
    }
  }

  while (left.length > 0) {
    result.push(left[0]);
    left.shift();
  }

  while (right.length > 0) {
    result.push(right[0]);
    right.shift();
  }
  return removeDuplicates(result);
}

function removeDuplicates(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}
