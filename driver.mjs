import tree from "./tree.mjs";

const arr = [];

for (let i = 0; i < 100; i++) {
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  arr.push(randomNumber);
}

const testTree = tree(arr)

// Confirm that the tree is balanced by calling isBalanced.
console.log(`Check if the tree is balanced: ${testTree.isBalanced()}\n`)

// Print out all elements in level, pre, post, and in order.
console.log(`level order: (${testTree.levelOrder()})\n`);
console.log(`pre order: (${testTree.preOrder()})\n`);
console.log(`post order:  (${testTree.postOrder()})\n`);
console.log(`in order: (${testTree.inOrder()})\n`);

// Unbalance the tree by adding several numbers > 100.
console.log("inserted a bunch of numbers to unbalance the tree\n")
testTree.insert(101);
testTree.insert(102);
testTree.insert(103);
testTree.insert(104);
testTree.insert(105);
testTree.insert(106);
testTree.insert(107);
testTree.insert(108);
testTree.insert(109);

// Confirm that the tree is unbalanced by calling isBalanced.
console.log(`Check if the tree is balanced: ${testTree.isBalanced()}\n`);

// Balance the tree by calling rebalance.
testTree.reBalance()
console.log("rebalance the tree\n")

// Confirm that the tree is balanced by calling isBalanced.
console.log(`Check if the tree is balanced: ${testTree.isBalanced()}\n`);

// Print out all elements in level, pre, post, and in order.
console.log(`level order: (${testTree.levelOrder()})\n`);
console.log(`pre order: (${testTree.preOrder()})\n`);
console.log(`post order:  (${testTree.postOrder()})\n`);
console.log(`in order: (${testTree.inOrder()})\n`);