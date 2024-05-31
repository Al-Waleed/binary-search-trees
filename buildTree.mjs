import node from "./node.mjs";

export default function buildTree(array, start = 0, end = array.length - 1) {
  // base case
  if (start > end) return null;

  let middle = Math.floor((start + end) / 2);
  // make the middle item of the array the root node
  const root = node(array[middle]);

  // call the function recursively on the left and right side of the root node
  root.left = buildTree(array, start, middle - 1);
  root.right = buildTree(array, middle + 1, end);
  // return the root node that now contains all of the nodes
  return root;
}
