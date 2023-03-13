export class Node {
  constructor(value) {
    this.value = value;
    this.edgesList = [];
    this.wall = this.getRandom();
    this.path = false;
  }

  connect(node) {
    this.edgesList.push(node);
  }

  getRandom() {
    let number = Math.floor(Math.random() * 100);
    return number < 40;
  }

  getAdjacentNodes() {
    return this.edgesList;
  }
}

export class Graph {
  constructor(nodes) {
    this.nodes = [...nodes];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  shortestPath(start, end) {
    let prev = this.bfs(start);

    return this.reconstructPath(start, end, prev);
  }

  reconstructPath(start, end, prev) {
    let path = [];
    for (let at = end; at != null; at = prev[at.value]) {
      path.push(at.value);
    }
    path.reverse();

    if (path[0] === start.value) {
      return path;
    }
    return [];
  }

  bfs(start) {
    let visited = new Set();
    let queue = [];
    let prev = {};

    visited.add(start);
    queue.push(start);

    while (queue.length > 0) {
      let node = queue.shift();
      for (let neighbor of node.getAdjacentNodes()) {
        if (!visited.has(neighbor) && !neighbor.wall) {
          visited.add(neighbor);
          queue.push(neighbor);
          prev[neighbor.value] = node;
        }
      }
    }
    return prev;
  }
}

export function generateGraph(amountOfSquares) {
  let squares = [];

  for (let x = 0; x < amountOfSquares; x++) {
    for (let y = 0; y < amountOfSquares; y++) {
      let square = new Node([x, y]);
      squares.push(square);
    }
  }

  //possible moves
  let dx;
  let dy;
  for (let square of squares) {
    for (dx of [-1, 0, 1]) {
      for (dy of [-1, 0, 1]) {
        if (!(dy === 0 && dx === 0)) {
          let x = square.value[0] + dx;
          let y = square.value[1] + dy;
          if (x >= 0 && x < amountOfSquares && y >= 0 && y < amountOfSquares) {
            for (let move of squares) {
              if (move.value[0] === x && move.value[1] === y && !move.wall)
                square.connect(move);
            }
          }
        }
      }
    }
  }

  return squares;
}

export function findPath(squares, selectedSquares) {
  let graph = new Graph([...squares]);

  return graph.shortestPath(selectedSquares[0], selectedSquares[1]);
}
