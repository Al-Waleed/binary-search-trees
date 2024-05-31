import buildTree from "./buildTree.mjs";
import mergeSort from "./mergeSort.mjs";
import node from "./node.mjs";

export default function tree(array) {
  // to sort and remove duplicates
  const sortedArray = mergeSort(array);
  // to build the tree using the buildTree function
  const root = buildTree(sortedArray);

  const insert = (value) => {
    let pointer = root;
    while (pointer.data !== value) {
      //if the current node value is bigger than the given value and the next left node is empty we stop the loop and insert a new node with the new value
      if (pointer.data > value && pointer.left === null) {
        pointer.left = node(value);
        return;
        //if the current node value is smaller than the given value and the next right node is empty we stop the loop and insert a new node with the new value
      } else if (pointer.data < value && pointer.right === null) {
        pointer.right = node(value);
        return;
      }
      // to go to the next node based on the given value, either left if its smaller or right if its bigger
      if (value < pointer.data) {
        pointer = pointer.left;
      } else if (value > pointer.data) {
        pointer = pointer.right;
      }
    }
  };

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return { root, insert, prettyPrint };
}
