import React, { Component } from "react";
import "./UserInput.css";

export class UserInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }
  update(e) {
    this.props.change(e.target.value);
  }

  clearWalls(e) {
    this.props.clearWalls();
  }

  clearPaths(e) {
    this.props.clearPaths();
  }

  amountOfWalls(e) {
    this.props.amountOfWalls(e.target.value);
  }

  render() {
    return (
      <div id="user-input-container">
        <RangeInput
          min={10}
          max={50}
          update={this.update.bind(this)}
          label={"Amount of squares per side"}
        />
        <RangeInput
          min={0}
          max={100}
          update={this.amountOfWalls.bind(this)}
          label={"Amount of random walls"}
        />
        <ButtonInput name={"Clear Walls"} event={this.clearWalls.bind(this)} />
        <ButtonInput name={"Clear Paths"} event={this.clearPaths.bind(this)} />
      </div>
    );
  }
}

export class ButtonInput extends Component {
  render() {
    return (
      <button onClick={this.props.event} id="input-button">
        {this.props.name}
      </button>
    );
  }
}

export class RangeInput extends Component {
  render() {
    return (
      <div id="input-and-label">
        <label>{this.props.label}</label>
        <div id="input-div">
          <div>{this.props.min}</div>
          <input
            type="range"
            min={this.props.min}
            max={this.props.max}
            step="10"
            onChange={this.props.update}
          ></input>
          <div>{this.props.max}</div>
        </div>
      </div>
    );
  }
}

export default UserInput;
