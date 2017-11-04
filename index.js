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

function distanceBetween(tree, firstVal, secondVal){
  let pathFirstVal = pathFromRoot(tree, firstVal);
  let pathSecondVal = pathFromRoot(tree, secondVal);
  let sameCount = 0;
  if(pathFirstVal === undefined || pathSecondVal === undefined){
    return 0;
  }

  for(let x = 0; x < pathFirstVal.length && x < pathSecondVal.length; x++){
    if(pathFirstVal[x] === pathSecondVal[x]){
      sameCount++;
    } else{
      break;
    }
  }

  return pathFirstVal.length - sameCount + pathSecondVal.length - sameCount;

}

function pathFromRoot(tree, val){
  let currentNode = tree;
  let isSearching = true;
  
  let path = [];
  while(isSearching){
    if(currentNode === undefined){
      isSearching = false;
      path = undefined;
    } else{
      path.push(currentNode.value);
      if(currentNode.value === val){
        isSearching = false;
        
      } else{
        currentNode = currentNode.value < val ? currentNode.right : currentNode.left;
      }
    }
  }
  return path;
}

let tree = build([5, 6, 3, 1, 2, 4]);
// let pathFirstVal = pathFromRoot(tree, 6);
// let pathSecondVal = pathFromRoot(tree, 4);
// let pathNoVal = pathFromRoot(tree, 9);
console.log(distanceBetween(tree, 5, 2));
console.log("done");
process.exit();
