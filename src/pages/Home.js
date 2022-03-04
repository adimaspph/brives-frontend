import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
	render() {
		return (
			<h1>
				Ini home page
				<Link className="btn btn-primary" to="/design">
					Design System
				</Link>
			</h1>
		);
	}
}

export default Home;
