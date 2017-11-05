//http://cslibrary.stanford.edu/110/BinaryTrees.html

console.log("starting");

function Node() {
  this.value = undefined;
  this.left = undefined;
  this.right = undefined;
}

Node.prototype.insert = function(val) {
  if (this.value === undefined) {
    this.value = val;
  } else if (val <= this.value) {
    this.left = this.left === undefined ? new Node() : this.left;
    this.left = this.left.insert(val);
  } else {
    this.right = this.right === undefined ? new Node() : this.right;
    this.right = this.right.insert(val);
  }

  return this;
};

function build(values) {
  let rootNode = new Node();

  values.forEach(function(val) {
    rootNode = rootNode.insert(val);
  }, this);

  return rootNode;
}

function distanceBetween(tree, firstVal, secondVal) {
  let pathFirstVal = pathFromRoot(tree, firstVal);
  let pathSecondVal = pathFromRoot(tree, secondVal);
  let sameCount = 0;
  if (pathFirstVal === undefined || pathSecondVal === undefined) {
    return 0;
  }

  for (let x = 0; x < pathFirstVal.length && x < pathSecondVal.length; x++) {
    if (pathFirstVal[x] === pathSecondVal[x]) {
      sameCount++;
    } else {
      break;
    }
  }

  return pathFirstVal.length - sameCount + pathSecondVal.length - sameCount;
}

function pathFromRoot(tree, val) {
  let currentNode = tree;
  let isSearching = true;

  let path = [];
  while (isSearching) {
    if (currentNode === undefined) {
      isSearching = false;
      path = undefined;
    } else {
      path.push(currentNode.value);
      if (currentNode.value === val) {
        isSearching = false;
      } else {
        currentNode =
          currentNode.value < val ? currentNode.right : currentNode.left;
      }
    }
  }
  return path;
}

function size(treeNode) {
  var sizeCount = 0;
  if (treeNode !== undefined) {
    sizeCount++;
    sizeCount += size(treeNode.left);
    sizeCount += size(treeNode.right);
  }
  return sizeCount;
}

function maxDepth(treeNode, curDepthCount = 0, maxDepthCount = 0) {
  if (treeNode !== undefined) {
    curDepthCount++;
    if (maxDepthCount < curDepthCount) {
      maxDepthCount = curDepthCount;
    }
    maxDepthCount = maxDepth(treeNode.left, curDepthCount, maxDepthCount);
    maxDepthCount = maxDepth(treeNode.right, curDepthCount, maxDepthCount);
  }
  return maxDepthCount;
}

function minValue(treeNode) {
  let val = Number.MAX_SAFE_INTEGER;
  while (treeNode != undefined) {
    val = treeNode.value;
    treeNode = treeNode.left;
  }
  return val;
}

function maxValue(treeNode) {
  let val = Number.MIN_SAFE_INTEGER;
  while (treeNode != undefined) {
    val = treeNode.value;
    treeNode = treeNode.right;
  }
  return val;
}

function printInOrder(treeNode) {
  if (treeNode !== undefined) {
    printInOrder(treeNode.left);
    console.log(treeNode.value);
    printInOrder(treeNode.right);
  }
}

//bottom to top
function printPostOrder(treeNode) {
  if (treeNode !== undefined) {
    printPostOrder(treeNode.left);

    printPostOrder(treeNode.right);
    console.log(treeNode.value);
  }
}

function hasPathSum(treeNode, expectedSum, runningSum = 0) {
  if (treeNode !== undefined) {
    runningSum += treeNode.value;
    if (treeNode.left === undefined && treeNode.right === undefined) {
      return expectedSum === runningSum;
    } else {
      var v =
        hasPathSum(treeNode.left, expectedSum, runningSum) ||
        hasPathSum(treeNode.right, expectedSum, runningSum);
      return v;
    }
  }
}

function printPaths(treeNode, pathVals = []) {
  if (treeNode !== undefined) {
    pathVals.push(treeNode.value);
    printPaths(treeNode.left, pathVals.slice(0));
    printPaths(treeNode.right, pathVals.slice(0));
    if (treeNode.left === undefined && treeNode.right === undefined) {
      console.log(pathVals);
    }
  }
}

function mirror(treeNode) {
  let tempNode = undefined;
  if (treeNode != undefined) {
    tempNode = treeNode.right;
    treeNode.right = treeNode.left;
    treeNode.left = tempNode;
    treeNode.left = mirror(treeNode.left);
    treeNode.right = mirror(treeNode.right);
  }

  return treeNode;
}

function doubleTree(treeNode) {
  if (treeNode !== undefined) {
    var tempNode = Object.assign({}, treeNode);
    tempNode.left = doubleTree(treeNode.left);
    treeNode.right = doubleTree(treeNode.right);
    treeNode.left = tempNode;
    tempNode.right = undefined;

    var x = 0;
  }
  return treeNode;
}

function isSameTree(treeNodeOne, treeNodeTwo){
  let isSame = true;
  isSame = (treeNodeOne !== undefined) === (treeNodeTwo !== undefined);
  if(isSame && treeNodeOne !== undefined){
    isSame = isSame 
    && treeNodeOne.value === treeNodeTwo.value
    && isSameTree(treeNodeOne.left, treeNodeTwo.left)
    && isSameTree(treeNodeOne.right, treeNodeTwo.right);    
  }
  return isSame;
}

//let tree = build([5, 8, 3, 1, 2, 4]);
let tree = build([3, 2, 4, 1]);
let tree2 = build([3, 2, 4, 1]);
// let pathFirstVal = pathFromRoot(tree, 6);
// let pathSecondVal = pathFromRoot(tree, 4);
// let pathNoVal = pathFromRoot(tree, 9);
//console.log(distanceBetween(tree, 5, 2));
//console.log(size(tree));
//console.log(maxDepth(tree));
//console.log(maxValue(tree));
//printInOrder(tree);
//printPostOrder(tree);
//console.log(hasPathSum(tree, 14));
//printPaths(tree);
//console.log(tree);
//console.log(mirror(tree));

//console.log(doubleTree(tree));
console.log(isSameTree(tree, tree2));
console.log("done");
process.exit();
