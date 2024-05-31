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

  const deleteItem = (value, pointer = root, parentPointer = null) => {
    // let pointer = root;
    // first case: the node we want to delete is a leaf node
    if (
      pointer.left === null &&
      pointer.right === null &&
      pointer.data === value
    ) {
      // case a:the value we want to delete is to the left of the parentPointer
      if (parentPointer.data > value) {
        parentPointer.left = null;
        return;
        // case b:the value we want to delete is to the right of the parentPointer
      } else if (parentPointer.data < value) {
        parentPointer.right = null;
        return;
      }
    }
    // second case: deleting a node with one child to its right
    else if (
      pointer.left === null &&
      pointer.right !== null &&
      pointer.data === value
    ) {
      console.log("second");
      return;
    }
    // third case: deleting a node with one child to its left
    else if (
      pointer.left !== null &&
      pointer.right === null &&
      pointer.data === value
    ) {
      console.log("third");
      return;
    }
    // fourth case: deleting a node with two children
    else if (
      pointer.left !== null &&
      pointer.right !== null &&
      pointer.data === value
    ) {
      console.log("fourth");
      // return;
    }

    // if the value is smaller than the pointer's value we go left
    if (value < pointer.data) {
      // to keep track of the parent of the pointer
      parentPointer = pointer;
      pointer = pointer.left;
    } else if (value > pointer.data) {
      // to keep track of the parent of the pointer
      parentPointer = pointer;
      pointer = pointer.right;
    }

    deleteItem(value, pointer, parentPointer);
  };

  return { root, insert, prettyPrint, deleteItem };
}

const test = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

const binaryTree = tree(test);

binaryTree.prettyPrint();
console.log("########################");
binaryTree.deleteItem(2);
console.log("########################");
binaryTree.prettyPrint();
