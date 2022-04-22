import React, { useState, useEffect, useContext, Component } from "react";
import PenggunaService from '../services/PenggunaService';
import Navbar from "../components/Navbar/Navbar";


class Homepage extends Component {
	constructor(props) {
		super(props)
		this.state = {


		}

	}

	render() {
		return (
			<div>
				<Navbar></Navbar>
				
			</div>
		);
	}
}

export default Homepage;
