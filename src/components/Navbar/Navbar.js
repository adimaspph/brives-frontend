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
			if (user.role === 'STAF_OPERASIONAL') {

			} else {
				props.history.push('/403');
			}
		} else {
			props.history.push('/login');
		}
	}

	const handlerLogout = () => {
		localStorage.removeItem("user");
	};

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark">

				<div className="navbar-menu">
					<Link className="navbar-logo" to="/">
						<img src="/logo-navbar.png" width={60} alt="" />
					</Link>

					{/* <Link className="navbar-menu-btn" to="/">
						<div className="navbar-text">
							Beranda
						</div>
					</Link> */}

					<div className='navbar-menu-btn'>
						<div className='navbar-text'>
							<a className="" href="/">
								Beranda
							</a>
						</div>
					</div>


					{/* <Link className="navbar-menu-btn" to="/privat">
						<div className="navbar-text">
							Kelas Privat
						</div>
					</Link> */}

					<div className='navbar-menu-btn'>
						<div className='navbar-text'>
							<a className="" href="/privat">
								Kelas Privat
							</a>
						</div>
					</div>

					{localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user")).role === 'PELAJAR' ? (
						// <Link className="navbar-menu-btn" to="/riwayat-pesanan">
						// 	<div className="navbar-text">
						// 		Riwayat Pesanan
						// 	</div>
						// </Link>

						<div className='navbar-menu-btn'>
							<div className='navbar-text'>
								<a className="" href="/riwayat-pesanan">
									Riwayat Pesanan
								</a>
							</div>
						</div>

					) : ("")}
					{localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user")).role === 'PELAJAR' ? (
						// <Link className="navbar-menu-btn" to="/akun/profil">
						// 	<div className="navbar-text">
						// 		Profil
						// 	</div>
						// </Link>
						<div className='navbar-menu-btn'>
							<div className='navbar-text'>
								<a className="" href="/akun/profil">
									Profil
								</a>
							</div>
						</div>

					) : ("")}

					{localStorage.getItem("user") === null ? (
						// <Link className="navbar-menu-btn" to="/login">
						// 	<div className="navbar-text">
						// 		Login
						// 	</div>
						// </Link>
						<div className='navbar-menu-btn'>
							<div className='navbar-text'>
								<a className="" href="/login">
									Login
								</a>
							</div>
						</div>
					) : ("")}

					{localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user")).role === 'PELAJAR' ? (
						<div className='navbar-menu-btn'>
							<div className='navbar-text'>
								<a onClick={handlerLogout} className="" href="/login">
									Logout
								</a>
							</div>
						</div>
					) : ("")}





				</div>
			</nav>

		</div>



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