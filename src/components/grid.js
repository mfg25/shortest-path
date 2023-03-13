import React, { Component } from "react";
import "./grid.css";
import { generateGraph, findPath } from "../graph/graph";
export default class gridContainer extends Component {
  constructor(props) {
    super(props);
    this.squareElement = React.createRef();
    this.state = {
      graph: generateGraph(this.props.amountOfSquares),
      selectedSquares: [],
    };
  }

  increaseSelectedSquares(square) {
    this.setState(
      {
        selectedSquares: [...this.state.selectedSquares, square],
      },
      () => {
        if (this.checkSelectedAmount()) {
          this.updateGraph();
        }
      }
    );
  }

  updateGraph() {
    let moves = findPath(this.state.graph, this.state.selectedSquares);
    let newGraph = [];
    this.state.graph.forEach((sq) => {
      moves.forEach((move) => {
        if (move === sq.value) {
          sq.path = true;
        }
      });
      newGraph.push(sq);
    });
    this.setState({
      graph: newGraph,
    });
  }

  checkSelectedAmount() {
    if (this.state.selectedSquares.length === 2) {
      this.setState({
        selectedSquares: [],
      });
    }
    return true;
  }

  render() {
    let squares = [];
    let sides = Math.sqrt((700 * 700) / this.state.graph.length);
    let style = {
      width: sides,
      height: sides,
    };
    for (let i = 0; i < this.state.graph.length; i++) {
      squares.push(
        <Square
          ref={this.squareElement}
          node={this.state.graph[i]}
          increase={this.increaseSelectedSquares.bind(this)}
          style={style}
          sides={sides}
          key={i}
        />
      );
    }
    return <div id="grid-container">{squares}</div>;
  }
}

export class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.selectSquare = this.selectSquare.bind(this);
  }

  selectSquare(e) {
    if (e.target.id !== "selected") {
      this.props.increase(this.props.node);
      this.setState({
        selected: true,
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.node.wall ? (
          <div className="square" id={"wall"} style={this.props.style}></div>
        ) : this.state.selected || this.props.node.path ? (
          <div
            className="square"
            id="selected"
            style={this.props.style}
            onClick={this.selectSquare}
          ></div>
        ) : (
          <div
            className="square"
            id="free"
            style={this.props.style}
            onClick={this.selectSquare}
          ></div>
        )}
      </div>
    );
  }
}
