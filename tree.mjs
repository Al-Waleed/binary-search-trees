import buildTree from "./buildTree.mjs";
import mergeSort from "./mergeSort.mjs";

export default function tree(array) {
  // to sort and remove duplicates
  const sortedArray = mergeSort(array);
  // to build the tree using the buildTree function
  const root = buildTree(sortedArray);

  return root;
}
