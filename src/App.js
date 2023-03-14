import GridContainer from "./components/grid.js";
import "./App.css";
import UserInput from "./components/UserInput.js";
import { Component } from "react";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountOfSquares: 50,
      amountOfWalls: 30,
      clearWalls: false,
      clearPaths: false,
      drawWalls: false,
    };
    this.changeGrid = this.changeGrid.bind(this);
  }

  changeGrid(value) {
    this.setState({
      amountOfSquares: value,
    });
  }

  clearWalls() {
    this.setState(
      {
        clearWalls: !this.state.clearWalls,
      },
      () => console.log(this.state.clearWalls)
    );
  }

  clearPaths() {
    this.setState(
      {
        clearPaths: !this.state.clearPaths,
      },
      () => console.log(this.state.clearPaths)
    );
  }

  amountOfWalls(value) {
    this.setState({
      amountOfWalls: value,
    });
  }

  drawWalls(value) {
    this.setState({
      drawWalls: !this.state.drawWalls,
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput
          change={this.changeGrid.bind(this)}
          amountOfWalls={this.amountOfWalls.bind(this)}
          clearWalls={this.clearWalls.bind(this)}
          clearPaths={this.clearPaths.bind(this)}
          drawWalls={this.drawWalls.bind(this)}
        />
        <GridContainer
          amountOfSquares={this.state.amountOfSquares}
          clearWalls={this.state.clearWalls}
          clearPaths={this.state.clearPaths}
          amountOfWalls={this.state.amountOfWalls}
          drawWalls={this.state.drawWalls}
        />
      </div>
    );
  }
}
