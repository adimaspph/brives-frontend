import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar(props) {
	const handlerLogout = () => {
		localStorage.removeItem("user");
	};

	return (
		<div>
			{localStorage.getItem("user") != null && JSON.parse(localStorage.getItem("user")).role != 'PELAJAR' ? (
				<nav className="sidebar">

					<div>
						<Link className="sidebar-logo" to="/beranda">
							<img src="/logo-bta.png" width={132} alt="" />
						</Link>
						<div className="sidebar-menu">

							{JSON.parse(localStorage.getItem("user")).role === 'ADMIN' ? (
								<Link className="sidebar-menu-btn" to="/pengguna">
									<img src="/assets/account.svg" alt="" />
									Pengguna
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'MANAJEMEN' ? (
								<Link className="sidebar-menu-btn" to="/dashboard">
									<img src="/assets/dashboard.svg" alt="" />
									Dashboard
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL' ? (
								<Link className="sidebar-menu-btn" to="/pesanan">
									<img src="/assets/checkout.svg" alt="" />
									Pesanan
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'STAF_KEUANGAN' ? (
								<Link className="sidebar-menu-btn" to="/daftar-pembayaran">
									<img src="/assets/checkout.svg" alt="" />
									Pembayaran
								</Link>
							) : ('')}



							{JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL' ? (
								<Link className="sidebar-menu-btn" to="/atur-mapel">
									<img src="/assets/book.svg" alt="" />
									Mata Pelajaran
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'PENGAJAR' ? (
								<Link className="sidebar-menu-btn" to="/atur-jadwal">
									<img src="/assets/schedule.svg" alt="" />
									Atur Jadwal
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL' ? (
								<Link className="sidebar-menu-btn" to="/jadwal-pengajar">
									<img src="/assets/schedule.svg" alt="" />
									Jadwal Pengajar
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'STAF_OPERASIONAL' ? (
								<Link className="sidebar-menu-btn" to="/log-pengajar">
									<img src="/assets/log.svg" alt="" />
									Log Pengajar
								</Link>
							) : ('')}

							{JSON.parse(localStorage.getItem("user")).role === 'PENGAJAR' ? (
								<Link className="sidebar-menu-btn" to="/log">
									<img src="/assets/log.svg" alt="" />
									Log
								</Link>
							) : ('')}

							{/* <Link className="sidebar-menu-btn" to="/kelas-pengajar">
								<img src="/assets/plus.svg" alt="" />
								Kelas Pengajar
							</Link> */}

							<Link className="sidebar-menu-btn" to="/profil-saya">
								<img src="/assets/profil-saya.svg" alt="" />
								Profil Saya
							</Link>
							<a onClick={handlerLogout} className="sidebar-menu-btn" href="/login">
								<img src="/assets/logout.svg" alt="" />
								Logout
							</a>
							<div>
								<br />
							</div>
						</div>
					</div>

				</nav>

			) : ("")}


		</div>

	);
}

export const MemoizedSidebar = React.memo(Sidebar);
