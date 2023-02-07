let startnodenumber = 1;
let queue = [];
let visited = new Array(nodes.length);
let speed = 1000;
function startbfs() {
  for (var i = 0; i < visited.length; i++) visited[i] = 0;
  document.removeEventListener("mousemove", drawAll);
  document.removeEventListener("mousedown", down);
  startnodenumber = 1;
  bfs(startnodenumber);
}

function bfsdraw() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    context.beginPath();
    for (var j = 0; j < node.connected.length; j++) {
      drawline(
        context,
        node.x,
        node.y,
        node.connected[j].connectednode.x,
        node.connected[j].connectednode.y,
        5,
        "red",
        node.radius
      );
      context.stroke();
      context.closePath();
    }
    context.beginPath();
    context.fillStyle = node.fillStyle;
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2, true);
    context.strokeStyle = node.strokeStyle;
    context.lineWidth = node.lineWidth;
    context.stroke();
    context.fill();

    context.font = "14pt Calibri";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(i + 1, node.x, node.y + 6);
    context.closePath();
  }
}

function bfsvisualize(node) {
  return new Promise((resolve) => {
    if (!visited[node.number - 1]) {
      node.fillStyle = "orange";
      node.strokeStyle = "orange";
      speed = 1000;
    } else {
      node.fillStyle = "lightgreen";
      node.strokeStyle = "lightgreen";
      speed = 1000;
    }
    bfsdraw();
    setTimeout(() => {
      resolve();
    }, speed);
  });
}

async function bfs(source) {
  queue = [];
  queue.push(nodes[source - 1]);
  visited[source - 1] = 1;

  while (queue.length > 0) {
    let cur_node = queue.shift();
    await bfsvisualize(cur_node);
    console.log(cur_node.number);
    for (var i = 0; i < cur_node.connected.length; i++) {
      if (!visited[cur_node.connected[i].number - 1]) {
        await bfsvisualize(cur_node.connected[i].connectednode);
        queue.push(cur_node.connected[i].connectednode);
        visited[cur_node.connected[i].number - 1] = 1;
      }
    }
  }
}
