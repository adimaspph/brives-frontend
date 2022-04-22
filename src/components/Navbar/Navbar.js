import React, { Component, useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {

	const [roleUser, setRoleUser] = useState("")

	useEffect(async () => {
		// checkUserRole()
	}, [])

	const checkUserRole = () => {
		const userRaw = localStorage.getItem("user")
		if (userRaw) {
			const user = JSON.parse(userRaw)
			setRoleUser(user.role)
			console.log(roleUser)
			if (user.role === 'STAF_OPERASIONAL') {

			} else {
				props.history.push('/403');
			}
		} else {
			props.history.push('/login');
		}
	}

	return (
		<nav className="navbar navbar-dark">
			<div className="navbar-menu">
				<Link className="navbar-logo" to="/">
					<img src="/logo-navbar.png" width={60} alt="" />
				</Link>
				<Link className="navbar-menu-btn" to="/home">
					<div className="navbar-text">
						Home
					</div>
				</Link>
				<Link className="navbar-menu-btn" to="/privat">
					<div className="navbar-text">
						Kelas Privat
					</div>
				</Link>
				<Link className="navbar-menu-btn" to="/riwayat-pesanan">
					<div className="navbar-text">
						Riwayat Pesanan
					</div>
				</Link>
				<Link className="navbar-menu-btn" to="/login">
					<div className="navbar-text">
						Login
					</div>
				</Link>
				<Link className="navbar-menu-btn" to="/login">
					<div className="navbar-text">
						Logout
					</div>
				</Link>
			</div>
		</nav>

		

		// <nav class="navbar navbar-expand-lg navbar-dark">
		// 	<Link className="navbar-logo navbar-brand" to="/">
		// 		<img src="/logo-navbar.png" width={60} alt="" />
		// 	</Link>
		// 	<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		// 		<span className="navbar-toggler-icon"></span>
		// 	</button>
		// 	<div className="collapse navbar-collapse" id="navbarNav">
		// 		<ul className="navbar-nav">
		// 			<li className="nav-item">
		// 				<a className="nav-link active" href="/home">Home</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link" href="/privat">Kelas Privat</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link" href="/riwayat-pesanan">Riwayat Pesanan</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link" href="/login">Login</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link" href="/logout">Logout</a>
		// 			</li>
		// 		</ul>
		// 	</div>
		// </nav>
	);
}

export const MemoizedNavbar = React.memo(Navbar);