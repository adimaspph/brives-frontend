import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar(props) {
	return (
		<nav className="sidebar">
			<Link className="sidebar-logo" to="/">
				<img src="/logo-bta.png" width={132} alt="" />
			</Link>
			<div className="sidebar-menu">
				<Link className="sidebar-menu-btn" to="/pengguna">
					<img src="/assets/account.svg" alt="" />
					Pengguna
				</Link>
				<Link className="sidebar-menu-btn" to="/dashboard">
					<img src="/assets/dashboard.svg" alt="" />
					Dashboard
				</Link>
				<Link className="sidebar-menu-btn" to="/pemesanan">
					<img src="/assets/checkout.svg" alt="" />
					Lihat Pemesanan
				</Link>
				<Link className="sidebar-menu-btn" to="/atur-mapel">
					<img src="/assets/book.svg" alt="" />
					Atur Mata Pelajaran
				</Link>
				<Link className="sidebar-menu-btn" to="/atur-jadwal">
					<img src="/assets/schedule.svg" alt="" />
					Atur Jadwal
				</Link>
				<Link className="sidebar-menu-btn" to="/kelas-tambahan">
					<img src="/assets/plus.svg" alt="" />
					Kelas Tambahan
				</Link>
				<Link className="sidebar-menu-btn" to="/profil-saya">
					<img src="/assets/account.svg" alt="" />
					Profil
				</Link>
				<Link className="sidebar-menu-btn" to="/logout">
					<img src="/assets/logout.svg" alt="" />
					Logout
				</Link>
				<div>
					<br />
				</div>
			</div>
		</nav>
	);
}

export const MemoizedSidebar = React.memo(Sidebar);
