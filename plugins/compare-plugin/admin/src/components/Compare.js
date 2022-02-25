import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Select, Label, Button } from "@buffetjs/core";
import axios from "axios";
import strapi from "../index";

const envs = ["dev", "uat", "prod"];
const collectionNames = ["product-families", "product-types"];
class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      envFirst: "uat",
      envSecond: "prod",
      collectionName: "product-types",
      firstEnvData: "",
      secondEnvData: "",
      firstUrl: "",
      secondUrl: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    if (this.state.envFirst === this.state.envSecond) {
      console.log("Same");
      strapi.notification.warning("Both the environments cannot be same!");
    }

    let fUrl = "";
    if (this.state.envFirst === "dev" || this.state.envFirst === "uat")
      fUrl =
        "http://cms-" +
        this.state.envFirst +
        ".bajajfinservhealth.in/" +
        this.state.collectionName;
    if (this.state.envFirst === "prod")
      fUrl = "http://cms.bajajfinservhealth.in/" + this.state.collectionName;

    let sUrl = "";
    if (this.state.envFirst === "dev" || this.state.envFirst === "uat")
      sUrl =
        "http://cms-" +
        this.state.envFirst +
        ".bajajfinservhealth.in/" +
        this.state.collectionName;
    if (this.state.envFirst === "prod")
      sUrl = "http://cms.bajajfinservhealth.in/" + this.state.collectionName;

    this.setState(
      {
        ...this.state,
        firstUrl: fUrl,
        secondUrl: sUrl,
      },
      () => {
        axios.get(this.state.firstUrl).then((response) => {
          this.setState({
            ...this.state,
            firstEnvData: response,
          });
        });
      }
    );
  };

  render() {
    return (
      <>
        <div>
          <Label htmlFor="envFirstSelect">Select First Environment</Label>
          <Select
            name="envFirstSelect"
            onChange={({ target: { value } }) => {
              this.setState({
                ...this.state,
                envFirst: value,
              });
            }}
            options={envs}
            value={this.state.envFirst}
          />
        </div>
        <div>
          <Label htmlFor="envSecondSelect">Select Second Environment</Label>
          <Select
            name="envSecondSelect"
            onChange={({ target: { value } }) => {
              this.setState({
                ...this.state,
                envSecond: value,
              });
            }}
            options={envs}
            value={this.state.envSecond}
          />
        </div>
        <div>
          <Label htmlFor="collectionSelect">Select Collection</Label>
          <Select
            name="collectionSelect"
            onChange={({ target: { value } }) => {
              this.setState({
                ...this.state,
                collectionName: value,
              });
            }}
            options={collectionNames}
            value={this.state.collectionName}
          />
        </div>
        <Button
          color="primary"
          onClick={this.handleClick}
          label="Compare Data"
        />
        <h1>{this.state.envFirst}</h1>
        <h1>{this.state.envSecond}</h1>
        <h1>{this.state.firstUrl}</h1>
        <h1>{this.state.secondUrl}</h1>
      </>
    );
  }
}

export default Compare;
