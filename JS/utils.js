function collision(x0, y0, x1, y1, radius) {
  var dx = x1 - x0,
    dy = y1 - y0;
  var distance = Math.sqrt(dx * dx + dy * dy);
  return distance < radius;
}
