import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./HomePage";

export default class App extends Component {
	constructor(props) {
		super(props);
		// States of components (?)
		//this.state {
		//	
		//}
	}

	render() {
		// return <h1> Watashino neko namae wa {this.props.name}</h1>
		return (
			<div className="center">
				<HomePage />
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App name="Nadir"/>
  </React.StrictMode>
);
