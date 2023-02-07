let drawoffsetx = 4;
let drawoffsety = 186;

function drawNode(node) {
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
  context.fillText(nodes.length, node.x, node.y + 6);
}

function canvas_arrow(context, fromx, fromy, tox, toy, width, color) {
  var headlen = width; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.strokeStyle = color;
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 6),
    toy - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(tox, toy);
  context.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 6),
    toy - headlen * Math.sin(angle + Math.PI / 6)
  );
}

function drawline(context, fromx, fromy, tox, toy, width, color, radius) {
  var d = Math.sqrt(
    (tox - fromx) * (tox - fromx) + (toy - fromy) * (toy - fromy)
  );
  var nx, ny;
  var dt = d - radius - 10;
  var t = dt / d;

  nx = (1 - t) * fromx + t * tox;
  ny = (1 - t) * fromy + t * toy;
  canvas_arrow(context, fromx, fromy, nx, ny, width, color);
}

function drawAll(e) {
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
    }
    context.closePath();
    if (
      collision(
        node.x,
        node.y,
        e.x - drawoffsetx,
        e.y - drawoffsety,
        node.radius
      )
    ) {
      node.fillStyle = "red";
      isColliding = true;
    } else {
      isColliding = false;
      node.fillStyle = "white";
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
document.addEventListener("mousemove", drawAll);
