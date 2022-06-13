import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIConfig from "../../api/APIConfig";
import "./Sidebar.css";

export default function Sidebar(props) {
	const [username, setUsername] = useState("");
	const handlerLogout = () => {
		localStorage.removeItem("user");
	};

	const getUser = () => {
		APIConfig.get("/api/v1/user/auth")
			.then((response) => {
				// console.log(response.data.result);
				setUsername(response.data.result.username);
			})
			.catch((error) => {
				console.log(error);
			});
		// console.log(username);
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div>
			{localStorage.getItem("user") != null &&
			JSON.parse(localStorage.getItem("user")).role != "PELAJAR" ? (
				<nav
					className={
						props.active ? "sidebar sidebar-active" : "sidebar"
					}
				>
					<div>
						<a className="sidebar-logo" href="/beranda">
							<img src="/logo-bta.png" width={132} alt="" />
						</a>
						<div className="sidebar-menu">
							{JSON.parse(localStorage.getItem("user")).role ===
							"ADMIN" ? (
								<a
									className="sidebar-menu-btn"
									href="/pengguna"
								>
									<img src="/assets/account.svg" alt="" />
									Pengguna
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"MANAJEMEN" ? (
								<a
									className="sidebar-menu-btn"
									href="/dashboard"
								>
									<img src="/assets/dashboard.svg" alt="" />
									Dashboard
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"STAF_OPERASIONAL" ? (
								<a
									className="sidebar-menu-btn"
									href="/pesanan"
								>
									<img src="/assets/checkout.svg" alt="" />
									Pesanan
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"STAF_KEUANGAN" ? (
								<a
									className="sidebar-menu-btn"
									href="/daftar-pembayaran"
								>
									<img src="/assets/checkout.svg" alt="" />
									Pembayaran
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"STAF_OPERASIONAL" ? (
								<a
									className="sidebar-menu-btn"
									href="/atur-mapel"
								>
									<img src="/assets/book.svg" alt="" />
									Mata Pelajaran
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"PENGAJAR" ? (
								<a
									className="sidebar-menu-btn"
									href={"/atur-jadwal/" + username}
								>
									<img src="/assets/schedule.svg" alt="" />
									Atur Jadwal
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"STAF_OPERASIONAL" ? (
								<a
									className="sidebar-menu-btn"
									href="/jadwal-pengajar"
								>
									<img src="/assets/schedule.svg" alt="" />
									Jadwal Pengajar
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"STAF_OPERASIONAL" ? (
								<a
									className="sidebar-menu-btn"
									href="/log-pengajar"
								>
									<img src="/assets/log.svg" alt="" />
									Log Pengajar
								</a>
							) : (
								""
							)}

							{JSON.parse(localStorage.getItem("user")).role ===
							"PENGAJAR" ? (
								<a className="sidebar-menu-btn" href="/log">
									<img src="/assets/log.svg" alt="" />
									Log
								</a>
							) : (
								""
							)}

							{/* <a className="sidebar-menu-btn" href="/kelas-pengajar">
								<img src="/assets/plus.svg" alt="" />
								Kelas Pengajar
							</a> */}

							<a
								className="sidebar-menu-btn"
								href="/profil-saya"
							>
								<img src="/assets/profil-saya.svg" alt="" />
								Profil Saya
							</a>
							<a
								onClick={handlerLogout}
								className="sidebar-menu-btn"
								href="/login"
							>
								<img src="/assets/logout.svg" alt="" />
								Logout
							</a>
							<div>
								<br />
							</div>
						</div>
					</div>
				</nav>
			) : (
				""
			)}
		</div>
	);
}

export const MemoizedSidebar = React.memo(Sidebar);
