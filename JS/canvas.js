const canvas = document.getElementById("myCanvas");
context = canvas.getContext("2d");
let isMouserOver = false;

canvas.onmouseover = function () {
  isMouserOver = true;
};

canvas.onmouseout = function () {
  isMouserOver = false;
};

var nodes = [];
var selection = undefined;
isColliding = false;

function resize() {
  canvas.width = window.innerWidth - 10;
  canvas.height = 500;
}

resize();

//Function to add new nodes(Circles)
function up(e) {
  if (isColliding || e.which == 3) {
    document.removeEventListener("mousemove", rightdown);
    return;
  }
  let node = {
    x: e.x - drawoffsetx,
    y: e.y - drawoffsety,
    connected: [],
    radius: 20,
    fillStyle: "white",
    lineWidth: 5,
    strokeStyle: "black",
    visited: false,
    number: nodes.length + 1,
  };
  nodes.push(node);
  drawNode(node);
  drawAll(e);
  document.removeEventListener("mouseup", up);
}

//Function to connect nodes(Circles) to each other
function connect(e) {
  if (nodes.length <= 1) {
    document.removeEventListener("mouseup", connect);
    selection = undefined;
    isColliding = false;
    return;
  }
  for (var i = 0; i < nodes.length; i++) {
    var alreadyconnected = false;
    node = nodes[i];
    if (
      collision(
        node.x,
        node.y,
        e.x - drawoffsetx,
        e.y - drawoffsety,
        node.radius
      ) &&
      node != selection
    ) {
      isColliding = true;
      let n = {
        connectednode: node,
        number: node.number,
      };

      for (var i = 0; i < selection.connected.length; i++) {
        if (selection.connected[i].number == n.number) {
          alreadyconnected = true;
        }
      }
      if (!alreadyconnected) selection.connected.push(n);
      document.removeEventListener("mouseup", connect);
      break;
    }
  }
  isColliding = false;
  selection = undefined;
}

function rightdown(e) {
  if (selection) {
    selection.x = e.x - drawoffsetx;
    selection.y = e.y - drawoffsety;
  }
}

//Function to perform collision check and check wheter to add new node or make connections when mouse is held down
function down(e) {
  if (!isMouserOver) return;
  if (e.which == 3) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (
        collision(
          node.x,
          node.y,
          e.x - drawoffsetx,
          e.y - drawoffsety,
          node.radius
        )
      ) {
        selection = node;
      }
    }
    if (selection != undefined) {
      document.addEventListener("mousemove", rightdown);
      document.addEventListener("mouseup", up);
    } else {
      isColliding = false;
      selection = undefined;
    }
    return;
  }
  if (nodes.length == 0) {
    isColliding = false;
    selection = undefined;
    document.addEventListener("mouseup", up);
    return;
  }

  for (var i = 0; i < nodes.length; i++) {
    node = nodes[i];
    if (
      collision(
        node.x,
        node.y,
        e.x - drawoffsetx,
        e.y - drawoffsety,
        node.radius
      )
    ) {
      isColliding = true;
      selection = node;
      document.removeEventListener("mouseup", up);
      document.addEventListener("mouseup", connect);
      break;
    } else {
      isColliding = false;
      selection = undefined;
      document.addEventListener("mouseup", up);
    }
  }
}

//Listening to Mousedown whenever user holds mouse button down it starts function named down
document.addEventListener("mousedown", down);
