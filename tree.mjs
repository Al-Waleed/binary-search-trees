import buildTree from "./buildTree.mjs";
import mergeSort from "./mergeSort.mjs";
import node from "./node.mjs";

export default function tree(array) {
  // to sort and remove duplicates
  const sortedArray = mergeSort(array);
  // to build the tree using the buildTree function
  let root = buildTree(sortedArray);

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
      // case a:the value we want to delete is to the left of the parentPointer
      if (parentPointer.data > value) {
        parentPointer.left = pointer.right;
        return;
        // case b:the value we want to delete is to the right of the parentPointer
      } else if (parentPointer.data < value) {
        parentPointer.right = pointer.right;
        return;
      }
    }
    // third case: deleting a node with one child to its left
    else if (
      pointer.left !== null &&
      pointer.right === null &&
      pointer.data === value
    ) {
      // case a:the value we want to delete is to the left of the parentPointer
      if (parentPointer.data > value) {
        parentPointer.left = pointer.left;
        return;
        // case b:the value we want to delete is to the right of the parentPointer
      } else if (parentPointer.data < value) {
        parentPointer.right = pointer.left;
        return;
      }
    }
    // fourth case: deleting a node with two children
    else if (
      pointer.left !== null &&
      pointer.right !== null &&
      pointer.data === value
    ) {
      // the second largest value will be the right node if it's a leaf node, otherwise it'll be the deepest left node of the current right pointer
      // we assign pointer.right to childPointer to be able to go and find the 2nd largest value after the one we want to delete
      let childPointer = pointer.right;
      // to check if childPointer "the right of the current node" has a left node
      while (childPointer.left !== null) {
        // if yes we keep going to the left
        childPointer = childPointer.left;
      }
      // we use the same function to delete the 2nd largest value after the one we're deleting
      deleteItem(childPointer.data);
      // we set the pointer's value to the value of the just deleted child node
      pointer.data = childPointer.data;
      return;
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

  const find = (value, pointer = root) => {
    // base case to return the node we're looking for
    if (pointer.data === value) return pointer;
    //to check if the value we're looking for is on the right of the pointer
    if (value > pointer.data) {
      pointer = pointer.right;
    } else {
      // if it's on the left of the pointer
      pointer = pointer.left;
    }
    return find(value, pointer);
  };

  const levelOrder = (callback) => {
    // create a queue and add the root node to it
    const queue = [root];
    // to push our results here
    const result = [];
    // to keep looping over the queue until nothing is left in it
    while (queue.length !== 0) {
      // the current node will be the first node in the queue
      let currentNode = queue[0];
      // if the currentNode has a left node we enqueue it
      if (currentNode.left) queue.push(currentNode.left);
      // if the currentNode has a right node we enqueue it
      if (currentNode.right) queue.push(currentNode.right);

      // then add the data of the current node to the results
      result.push(currentNode.data);

      // if a callback is passed we call it on the current node
      if (callback) callback(currentNode);

      // dequeue the current node
      queue.shift();
    }

    return result;
  };

  const inOrder = (callback) => {
    // to save the results here
    const result = [];

    //a self invoking function to traverse the tree in recursive
    (function traverse(currentNode = root) {
      // our base case
      if (currentNode === null) return;
      // we keep traversing to the left node
      traverse(currentNode.left);
      // to push the data in the results array
      result.push(currentNode.data);
      // call the callback function in case its passed in
      if (callback) callback();
      // we keep traversing to the right node
      traverse(currentNode.right);
    })();

    return result;
  };

  const preOrder = (callback) => {
    // to save the results here
    const result = [];

    //a self invoking function to traverse the tree in recursive
    (function traverse(currentNode = root) {
      // our base case
      if (currentNode === null) return;

      // to push the data in the results array
      result.push(currentNode.data);

      // call the callback function in case its passed in
      if (callback) callback();

      // go to the left node
      traverse(currentNode.left);
      // go to the right node
      traverse(currentNode.right);
    })();

    return result;
  };

  const postOrder = (callback) => {
    // to save the results here
    const result = [];

    //a self invoking function to traverse the tree in recursive
    (function traverse(currentNode = root) {
      // our base case
      if (currentNode === null) return;

      // we keep traversing to the left node
      traverse(currentNode.left);
      // we keep traversing to the right node
      traverse(currentNode.right);

      // to push the data in the results array
      result.push(currentNode.data);
      // call the callback function in case its passed in
      if (callback) callback();
    })();

    return result;
  };

  const height = (currentNode = root) => {
    // return -1 to balance the +1 on empty nodes
    if (currentNode === null) return -1;

    let leftHeight = height(currentNode.left);
    let rightHeight = height(currentNode.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const depth = (node, currentNode = root) => {
    // base case
    if (currentNode.data === node.data) return 0;

    // to know if we need to go to left or right of the tree
    if (node.data < currentNode.data) {
      // currentNode = currentNode.left
      return depth(node, currentNode.left) + 1;
    } else {
      return depth(node, currentNode.right) + 1;
    }
  };

  const isBalanced = () => {
    // get the height of each side using the height() function
    const leftSideHeight = height(root.left);
    const rightSideHeight = height(root.right);

    // see if the difference between them is more than 1
    return Math.abs(leftSideHeight - rightSideHeight) <= 1;
  };

  const reBalance = () => {
    // use inOrder() to get a sorted array from the tree then build the tree again to re balance it
    root = buildTree(inOrder());
  };

  return {
    insert,
    prettyPrint,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}
