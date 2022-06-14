import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
			<nav className="navbar">
				<input type="checkbox" id="check" />

				<div className="nav-logo">
					<Link className="" to="/">
						<img src="/logo-navbar.png" width={60} alt="" />
					</Link>
				</div>

				<ul>
					<li>
						<a className="" href="/">
							Beranda
						</a>
					</li>

					<li>
						<a className="" href="/pesan-kelas">
							Pesan Kelas Privat
						</a>
					</li>

					{localStorage.getItem("user") != null &&
					JSON.parse(localStorage.getItem("user")).role ===
						"PELAJAR" ? (
						<li>
							<a className="" href="/riwayat-pesanan">
								Riwayat Pesanan
							</a>
						</li>
					) : (
						""
					)}

					{localStorage.getItem("user") != null &&
					JSON.parse(localStorage.getItem("user")).role ===
						"PELAJAR" ? (
						<li>
							<a className="" href="/akun/profil">
								Profil
							</a>
						</li>
					) : (
						""
					)}

					{localStorage.getItem("user") === null ? (
						<li>
							<a className="" href="/login">
								Login
							</a>
						</li>
					) : (
						""
					)}

					{localStorage.getItem("user") != null &&
					JSON.parse(localStorage.getItem("user")).role ===
						"PELAJAR" ? (
						<li>
							<a
								onClick={handlerLogout}
								className=""
								href="/login"
							>
								Logout
							</a>
						</li>
					) : (
						""
					)}
				</ul>

				<label className="checkbtn" for="check">
					<svg
						width="36"
						height="36"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M2.75 4.25H13.25M2.75 12.25H13.25H2.75ZM2.75 8.25H13.25H2.75Z"
							stroke="white"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</label>
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